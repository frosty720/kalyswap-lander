'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, Menu, X, Zap } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { locales, localePath } from '@/i18n';
import { LINKS, kalychainUrl } from '@/lib/links';

interface HeaderProps {
	nav: Dictionary['nav'];
	locale: Locale;
}

const navAnchors = [
	{ key: 'products', href: '#products' },
	{ key: 'yield', href: '#yield' },
	{ key: 'dashboard', href: '#app' },
	{ key: 'security', href: '#security' },
] as const;

function LangSwitcher({ locale, className }: { locale: Locale; className?: string }) {
	return (
		<div className={className}>
			{locales.map((l, i) => (
				<span key={l} className="inline-flex items-center">
					{i > 0 && <span className="mx-1 text-cream/30">·</span>}
					{l === locale ? (
						<span className="text-gold uppercase">{l}</span>
					) : (
						<a href={localePath(l)} className="uppercase hover:text-cream transition">
							{l}
						</a>
					)}
				</span>
			))}
		</div>
	);
}

export default function Header({ nav, locale }: HeaderProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1500px] z-50 px-4">
			<nav className="mx-auto max-w-[1240px] mt-4 rounded-2xl border hairline bg-ink/70 backdrop-blur-xl px-5 py-3">
				<div className="flex items-center justify-between">
					<a href={localePath(locale)} className="flex items-center gap-2.5">
						<Image src="/images/logo.png" alt="KalySwap logo" width={36} height={36} priority />
						<span className="hidden min-[400px]:inline font-display font-bold text-lg tracking-tight">KalySwap</span>
					</a>

					<div className="hidden lg:flex items-center gap-7 text-sm text-cream/70 font-display">
						{navAnchors.map(({ key, href }) => (
							<a key={key} href={href} className="hover:text-gold transition">
								{nav[key]}
							</a>
						))}
						<a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
							{nav.docs}
						</a>
					</div>

					<div className="flex items-center gap-2.5">
						<LangSwitcher locale={locale} className="hidden sm:flex items-center text-xs text-cream/50 font-display" />
						<a
							href={kalychainUrl(locale)}
							target="_blank"
							rel="noopener noreferrer"
							className="hidden md:inline-flex items-center gap-2 rounded-lg border hairline px-3.5 py-2 text-sm font-display text-cream/80 hover:border-gold/50 hover:text-gold transition"
						>
							<Box className="w-3.5 h-3.5" /> {nav.kalychain}
						</a>
						<a
							href={LINKS.app}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-gold-gradient px-4 py-2 text-sm font-display font-semibold text-on-gold hover:gold-glow transition"
						>
							<Zap className="w-3.5 h-3.5 shrink-0" /> {nav.launchApp}
						</a>
						<button
							onClick={() => setMenuOpen(!menuOpen)}
							className="lg:hidden grid place-items-center w-9 h-9 rounded-lg border hairline text-cream/80"
							aria-label="Menu"
						>
							{menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
						</button>
					</div>
				</div>

				{menuOpen && (
					<div className="lg:hidden mt-3 pt-3 border-t hairline flex flex-col gap-3 text-sm text-cream/70 font-display">
						{navAnchors.map(({ key, href }) => (
							<a key={key} href={href} onClick={() => setMenuOpen(false)} className="hover:text-gold transition">
								{nav[key]}
							</a>
						))}
						<a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
							{nav.docs}
						</a>
						<a href={kalychainUrl(locale)} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
							{nav.kalychain}
						</a>
						<LangSwitcher locale={locale} className="sm:hidden flex items-center text-xs text-cream/50 pt-2" />
					</div>
				)}
			</nav>
		</header>
	);
}
