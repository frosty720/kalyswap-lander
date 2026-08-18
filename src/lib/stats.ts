const V2_SUBGRAPH = 'https://app.kalyswap.io/subgraphs/name/kalyswap/dex-subgraph';
const V3_SUBGRAPH = 'https://app.kalyswap.io/subgraphs/name/v3-subgraph-kalychain-mainnet';
const REVALIDATE_SECONDS = 300;

// Token identification is by ADDRESS, never by symbol — symbols are not unique.
// Addresses mirror KalySwapv3/frontend/src/config/contracts.ts (mainnet).
const WKLC = '0x069255299bb729399f3cecabdc73d15d3d10a2a3';
const STABLECOINS = [
	'0x2ca775c77b922a51fcf3097f52bffdbc0250d99a', // USDT
	'0x9cab0c396cf0f4325913f2269a0b72bd4d46e3a9', // USDC
	'0x6e92cac380f7a7b86f4163fad0df2f277b16edc6', // DAI
];

export interface CounterSpec {
	target: number;
	decimals: number;
	prefix: string;
	suffix: string;
}

export interface DexStats {
	tvl: string;
	transactions: string;
	pools: string;
	klcPrice: string;
	counters: {
		tvl: CounterSpec;
		transactions: CounterSpec;
		pools: CounterSpec;
		klcPrice: CounterSpec;
	};
}

/** Last verified snapshot (2026-08-18) — used only when the subgraphs are unreachable. */
const FALLBACK: DexStats = {
	tvl: '$61.2K',
	transactions: '1.53M+',
	pools: '36',
	klcPrice: '$0.00201',
	counters: {
		tvl: { target: 61.2, decimals: 1, prefix: '$', suffix: 'K' },
		transactions: { target: 1.53, decimals: 2, prefix: '', suffix: 'M+' },
		pools: { target: 36, decimals: 0, prefix: '', suffix: '' },
		klcPrice: { target: 0.00201, decimals: 5, prefix: '$', suffix: '' },
	},
};

interface V2Pair {
	reserve0: string;
	reserve1: string;
	token0: { id: string };
	token1: { id: string };
}

interface V2Response {
	kalyswapFactory: { pairCount: number; txCount: string } | null;
	pairs: V2Pair[];
}

interface V3Response {
	factories: { poolCount: string; txCount: string; totalValueLockedUSD: string }[];
}

async function querySubgraph<T>(url: string, query: string): Promise<T | null> {
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ query }),
			next: { revalidate: REVALIDATE_SECONDS },
		});
		if (!res.ok) return null;
		const json = (await res.json()) as { data?: T };
		return json.data ?? null;
	} catch {
		return null;
	}
}

function compact(value: number, prefix = ''): { text: string; counter: CounterSpec } {
	const spec = (target: number, decimals: number, suffix: string): { text: string; counter: CounterSpec } => ({
		text: `${prefix}${target.toFixed(decimals)}${suffix}`,
		counter: { target, decimals, prefix, suffix },
	});
	if (value >= 1_000_000_000) return spec(Number((value / 1_000_000_000).toFixed(2)), 2, 'B');
	if (value >= 1_000_000) return spec(Number((value / 1_000_000).toFixed(2)), 2, 'M+');
	if (value >= 1_000) return spec(Number((value / 1_000).toFixed(1)), 1, 'K');
	return spec(Math.round(value), 0, '');
}

/**
 * KLC price in USD from the WKLC/USDT pair reserves (address-matched), and V2 TVL
 * as the stable-or-WKLC-valued side of each pair doubled — the same approach the
 * DEX frontend uses because the V2 subgraph's own USD fields all report 0.
 */
function computeV2(pairs: V2Pair[]): { klcPrice: number; tvl: number } {
	const usdt = STABLECOINS[0];
	const priced = pairs.find((p) => {
		const a = p.token0.id.toLowerCase();
		const b = p.token1.id.toLowerCase();
		return (a === WKLC && b === usdt) || (b === WKLC && a === usdt);
	});
	let klcPrice = 0;
	if (priced) {
		const r0 = parseFloat(priced.reserve0);
		const r1 = parseFloat(priced.reserve1);
		if (r0 > 0 && r1 > 0) {
			klcPrice = priced.token0.id.toLowerCase() === WKLC ? r1 / r0 : r0 / r1;
		}
	}
	let tvl = 0;
	for (const p of pairs) {
		const r0 = parseFloat(p.reserve0 || '0');
		const r1 = parseFloat(p.reserve1 || '0');
		const a = p.token0.id.toLowerCase();
		const b = p.token1.id.toLowerCase();
		if (STABLECOINS.includes(a)) tvl += r0 * 2;
		else if (STABLECOINS.includes(b)) tvl += r1 * 2;
		else if (a === WKLC) tvl += r0 * klcPrice * 2;
		else if (b === WKLC) tvl += r1 * klcPrice * 2;
	}
	return { klcPrice, tvl };
}

/**
 * Live protocol totals across the V2 and V3 subgraphs, cached for 5 minutes.
 * Falls back to the last verified snapshot so the page never shows blanks.
 */
export async function getDexStats(): Promise<DexStats> {
	const [v2, v3] = await Promise.all([
		querySubgraph<V2Response>(
			V2_SUBGRAPH,
			`{
				kalyswapFactory(id: "0xD42Af909d323D88e0E933B6c50D3e91c279004ca") { pairCount txCount }
				pairs(first: 100, orderBy: txCount, orderDirection: desc) {
					reserve0 reserve1 token0 { id } token1 { id }
				}
			}`,
		),
		querySubgraph<V3Response>(V3_SUBGRAPH, '{ factories { poolCount txCount totalValueLockedUSD } }'),
	]);

	const factory3 = v3?.factories?.[0];
	if (!v2?.kalyswapFactory || !v2.pairs?.length || !factory3) return FALLBACK;

	const { klcPrice, tvl: v2Tvl } = computeV2(v2.pairs);
	if (klcPrice <= 0) return FALLBACK;

	const tvl = v2Tvl + parseFloat(factory3.totalValueLockedUSD || '0');
	const transactions = Number(v2.kalyswapFactory.txCount) + Number(factory3.txCount);
	const pools = Number(v2.kalyswapFactory.pairCount) + Number(factory3.poolCount);

	const tvlSpec = compact(tvl, '$');
	const txSpec = compact(transactions);
	const priceDecimals = klcPrice >= 0.01 ? 4 : 5;
	const priceTarget = Number(klcPrice.toFixed(priceDecimals));

	return {
		tvl: tvlSpec.text,
		transactions: txSpec.text,
		pools: String(pools),
		klcPrice: `$${klcPrice.toFixed(priceDecimals)}`,
		counters: {
			tvl: tvlSpec.counter,
			transactions: txSpec.counter,
			pools: { target: pools, decimals: 0, prefix: '', suffix: '' },
			klcPrice: { target: priceTarget, decimals: priceDecimals, prefix: '$', suffix: '' },
		},
	};
}
