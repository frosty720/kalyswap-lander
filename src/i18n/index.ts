import en from './en.json';
import fr from './fr.json';
import es from './es.json';

export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, fr, es };

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
	return dictionaries[locale];
}

/** Path prefix for a locale — EN lives at the site root. */
export function localePath(locale: Locale): string {
	return locale === defaultLocale ? '/' : `/${locale}`;
}
