import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const nonDefaultLocales = ['fr', 'es'];

/**
 * EN is served at the site root; /fr and /es are prefixed.
 * /en/* redirects to the unprefixed canonical URL, everything else is
 * internally rewritten to the /en tree.
 */
export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	if (pathname === '/en' || pathname.startsWith('/en/')) {
		const url = request.nextUrl.clone();
		url.pathname = pathname.replace(/^\/en/, '') || '/';
		return NextResponse.redirect(url, 308);
	}

	const isLocalePrefixed = nonDefaultLocales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	);
	if (isLocalePrefixed) {
		return NextResponse.next();
	}

	const url = request.nextUrl.clone();
	url.pathname = `/en${pathname}`;
	return NextResponse.rewrite(url);
}

export const config = {
	// Skip Next internals, API routes and any file with an extension (images, icons…)
	matcher: ['/((?!api|_next|.*\\..*).*)'],
};
