import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDexStats } from './stats';

const KMT_SUBGRAPH = 'https://app.kalyswap.io/subgraphs/name/v3-subgraph-kmt';

function jsonResponse(body: unknown) {
	return { ok: true, json: async () => body } as Response;
}

/** Answers only the 3890 KMT subgraph with a query for factory totals and the bundle price. */
function subgraphMock(data: unknown) {
	return vi.fn(async (url: unknown, init?: RequestInit) => {
		const { query } = JSON.parse(String(init?.body)) as { query: string };
		if (String(url) === KMT_SUBGRAPH && query.includes('factories') && query.includes('ethPriceUSD')) {
			return jsonResponse({ data });
		}
		return jsonResponse({ errors: [{ message: 'unexpected request' }] });
	});
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('getDexStats', () => {
	it('reads TVL, tx count, pool count and the KMT price from the 3890 V3 subgraph', async () => {
		// all values differ from the fallback snapshot so a silent fallback cannot pass
		const fetchMock = subgraphMock({
			factories: [{ poolCount: '3', txCount: '1234', totalValueLockedUSD: '61234.5' }],
			bundles: [{ ethPriceUSD: '0.2123456' }],
		});
		vi.stubGlobal('fetch', fetchMock);

		const stats = await getDexStats();
		expect(fetchMock).toHaveBeenCalledTimes(1);
		expect(stats.tvl).toBe('$61.2K');
		expect(stats.transactions).toBe('1.2K');
		expect(stats.pools).toBe('3');
		expect(stats.kmtPrice).toBe('$0.2123');
		expect(stats.counters.tvl).toEqual({ target: 61.2, decimals: 1, prefix: '$', suffix: 'K' });
		expect(stats.counters.pools).toEqual({ target: 3, decimals: 0, prefix: '', suffix: '' });
		expect(stats.counters.kmtPrice).toEqual({ target: 0.2123, decimals: 4, prefix: '$', suffix: '' });
	});

	it('falls back to the 3890 snapshot when the subgraph is unreachable', async () => {
		vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
		const stats = await getDexStats();
		expect(stats.kmtPrice).toBe('$0.2009');
		expect(stats.pools).toBe('2');
	});

	it('falls back instead of showing $0 when the bundle price is 0 (pool never swapped)', async () => {
		vi.stubGlobal(
			'fetch',
			subgraphMock({
				factories: [{ poolCount: '3', txCount: '1', totalValueLockedUSD: '0' }],
				bundles: [{ ethPriceUSD: '0' }],
			}),
		);
		const stats = await getDexStats();
		expect(stats.kmtPrice).toBe('$0.2009');
		expect(stats.tvl).toBe('$50.5K');
	});
});
