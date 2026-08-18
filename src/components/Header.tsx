'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Menu, X, Zap } from 'lucide-react';
import { LINKS } from '@/lib/links';

const NAV_LINKS = [
	{ label: 'Products', href: '#products' },
	{ label: 'Real Yield', href: '#yield' },
	{ label: 'Dashboard', href: '#app' },
	{ label: 'Security', href: '#security' },
];

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1500px] z-50 px-4">
			<nav className="mx-auto max-w-[1240px] mt-4 rounded-2xl border hairline bg-ink/70 backdrop-blur-xl px-5 py-3">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-2.5">
						<Image src="/images/logo.png" alt="KalySwap logo" width={36} height={36} priority />
						<span className="hidden min-[400px]:inline font-display font-bold text-lg tracking-tight">KalySwap</span>
					</Link>

					<div className="hidden lg:flex items-center gap-7 text-sm text-cream/70 font-display">
						{NAV_LINKS.map((link) => (
							<a key={link.href} href={link.href} className="hover:text-gold transition">
								{link.label}
							</a>
						))}
						<a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
							Docs
						</a>
					</div>

					<div className="flex items-center gap-2.5">
						<a
							href={LINKS.kalychain}
							target="_blank"
							rel="noopener noreferrer"
							className="hidden md:inline-flex items-center gap-2 rounded-lg border hairline px-3.5 py-2 text-sm font-display text-cream/80 hover:border-gold/50 hover:text-gold transition"
						>
							<Box className="w-3.5 h-3.5" /> KalyChain
						</a>
						<a
							href={LINKS.app}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-gradient-to-r from-gold-bright to-gold-dark px-4 py-2 text-sm font-display font-semibold text-ink hover:gold-glow transition"
						>
							<Zap className="w-3.5 h-3.5 shrink-0" /> Launch App
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
						{NAV_LINKS.map((link) => (
							<a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="hover:text-gold transition">
								{link.label}
							</a>
						))}
						<a href={LINKS.docs} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
							Docs
						</a>
						<a href={LINKS.kalychain} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition">
							KalyChain
						</a>
					</div>
				)}
			</nav>
		</header>
	);
}
