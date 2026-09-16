import { describe, expect, it } from 'vitest';
import { getDictionary, locales } from './index';

function keys(value: unknown, prefix = ''): string[] {
	if (value === null || typeof value !== 'object') return [prefix];
	return Object.entries(value).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe('dictionaries', () => {
	it('fr and es have exactly the same keys as en', () => {
		const en = keys(getDictionary('en')).sort();
		expect(keys(getDictionary('fr')).sort()).toEqual(en);
		expect(keys(getDictionary('es')).sort()).toEqual(en);
	});

	it.each(locales)('%s labels the live price as KMT', (locale) => {
		expect(getDictionary(locale).stats.kmtPrice).toMatch(/KMT/);
	});
});
