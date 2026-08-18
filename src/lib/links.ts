import type { Locale } from '@/i18n';

export const APP_URL = 'https://app.kalyswap.io';

export const LINKS = {
	app: APP_URL,
	swap: `${APP_URL}/swaps`,
	pools: `${APP_URL}/pools`,
	farm: `${APP_URL}/farm`,
	stake: `${APP_URL}/stake`,
	bridge: `${APP_URL}/bridge`,
	launchpad: `${APP_URL}/launchpad`,
	vaults: 'https://vaults.kalychain.io/en/app',
	kalychain: 'https://kalychain.io',
	dao: 'https://dao.kalychain.io',
	docs: 'https://docs.kalychain.io',
	explorer: 'https://kalyscan.io',
	apiDocs: 'https://kalyscan.io/api-docs',
	twitter: 'https://twitter.com/KalyChain',
	discord: 'https://discord.gg/4fDuS3cBJw',
	telegram: 'https://t.me/+yj8Ae9lNXmg1Yzkx',
	github: 'https://github.com/KalyCoinProject',
} as const;

/** Vaults dApp per locale — the vaults site ships EN and FR only. */
export function vaultsUrl(locale: Locale): string {
	return locale === 'fr' ? 'https://vaults.kalychain.io/fr/app' : 'https://vaults.kalychain.io/en/app';
}

/** kalychain.io serves EN at the root and /fr, /es prefixed. */
export function kalychainUrl(locale: Locale): string {
	return locale === 'en' ? LINKS.kalychain : `${LINKS.kalychain}/${locale}`;
}
