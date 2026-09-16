import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const SRC = path.resolve(__dirname);

function sourceFiles(dir: string): string[] {
	return readdirSync(dir).flatMap((name) => {
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) return sourceFiles(full);
		return /\.(ts|tsx|json)$/.test(name) && !/\.test\.ts$/.test(name) ? [full] : [];
	});
}

describe('KalyChain 3890 only', () => {
	it('no source file or copy mentions the old KLC / KSWAP tokens or the 3888 subgraphs', () => {
		const offenders = sourceFiles(SRC).filter((file) =>
			/\bW?KLC\b|\bKSWAP\b|dex-subgraph|v3-subgraph-kalychain-mainnet|\bV2\b/.test(readFileSync(file, 'utf8')),
		);
		expect(offenders.map((f) => path.relative(SRC, f))).toEqual([]);
	});
});
