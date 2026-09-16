const V3_SUBGRAPH = 'https://app.kalyswap.io/subgraphs/name/v3-subgraph-kmt';
const REVALIDATE_SECONDS = 300;

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
	kmtPrice: string;
	counters: {
		tvl: CounterSpec;
		transactions: CounterSpec;
		pools: CounterSpec;
		kmtPrice: CounterSpec;
	};
}

/** Last verified KalyChain 3890 snapshot (2026-09-16) — used only when the subgraph is unreachable. */
const FALLBACK: DexStats = {
	tvl: '$50.5K',
	transactions: '42',
	pools: '2',
	kmtPrice: '$0.2009',
	counters: {
		tvl: { target: 50.5, decimals: 1, prefix: '$', suffix: 'K' },
		transactions: { target: 42, decimals: 0, prefix: '', suffix: '' },
		pools: { target: 2, decimals: 0, prefix: '', suffix: '' },
		kmtPrice: { target: 0.2009, decimals: 4, prefix: '$', suffix: '' },
	},
};

interface V3Response {
	factories: { poolCount: string; txCount: string; totalValueLockedUSD: string }[];
	bundles: { ethPriceUSD: string }[];
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
 * Live protocol totals from the KalyChain 3890 V3 subgraph, cached for 5 minutes.
 * KMT price is the bundle's ethPriceUSD (WKMT is the subgraph's reference token).
 * Falls back to the last verified snapshot so the page never shows blanks.
 */
export async function getDexStats(): Promise<DexStats> {
	const v3 = await querySubgraph<V3Response>(
		V3_SUBGRAPH,
		'{ factories(first: 1) { poolCount txCount totalValueLockedUSD } bundles(first: 1) { ethPriceUSD } }',
	);

	const factory = v3?.factories?.[0];
	const kmtPrice = parseFloat(v3?.bundles?.[0]?.ethPriceUSD ?? '0');
	if (!factory || !(kmtPrice > 0)) return FALLBACK;

	const tvl = parseFloat(factory.totalValueLockedUSD || '0');
	const transactions = Number(factory.txCount);
	const pools = Number(factory.poolCount);

	const tvlSpec = compact(tvl, '$');
	const txSpec = compact(transactions);
	const priceDecimals = kmtPrice >= 0.01 ? 4 : 5;
	const priceTarget = Number(kmtPrice.toFixed(priceDecimals));

	return {
		tvl: tvlSpec.text,
		transactions: txSpec.text,
		pools: String(pools),
		kmtPrice: `$${kmtPrice.toFixed(priceDecimals)}`,
		counters: {
			tvl: tvlSpec.counter,
			transactions: txSpec.counter,
			pools: { target: pools, decimals: 0, prefix: '', suffix: '' },
			kmtPrice: { target: priceTarget, decimals: priceDecimals, prefix: '$', suffix: '' },
		},
	};
}
