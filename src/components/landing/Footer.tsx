import Image from 'next/image';
import type { Dictionary, Locale } from '@/i18n';
import { localePath } from '@/i18n';
import { LINKS, kalychainUrl, vaultsUrl } from '@/lib/links';

interface FooterProps {
	t: Dictionary['footer'];
	products: Dictionary['products'];
	locale: Locale;
}

export default function Footer({ t, products, locale }: FooterProps) {
	const columns = [
		{
			title: t.products,
			links: [
				{ label: products.swap.title, href: LINKS.swap },
				{ label: products.pools.title, href: LINKS.pools },
				{ label: products.farm.title, href: LINKS.farm },
				{ label: products.stake.title, href: LINKS.stake },
				{ label: products.vaults.title, href: vaultsUrl(locale) },
				{ label: products.bridge.title, href: LINKS.bridge },
				{ label: products.launchpad.title, href: LINKS.launchpad },
			],
		},
		{
			title: t.resources,
			links: [
				{ label: t.linkDocs, href: LINKS.docs },
				{ label: t.linkExplorer, href: LINKS.explorer },
				{ label: t.linkApi, href: LINKS.apiDocs },
				{ label: t.linkGovernance, href: LINKS.dao },
				{ label: t.linkL1, href: kalychainUrl(locale) },
			],
		},
		{
			title: t.connect,
			links: [
				{ label: 'Twitter', href: LINKS.twitter },
				{ label: 'Discord', href: LINKS.discord },
				{ label: 'Telegram', href: LINKS.telegram },
				{ label: 'GitHub', href: LINKS.github },
			],
		},
	];

	return (
		<footer className="relative w-full border-t hairline bg-ink pt-16 pb-8">
			<div className="mx-auto max-w-[1240px] px-6">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
					<div className="lg:col-span-1">
						<a href={localePath(locale)} className="flex items-center gap-2.5">
							<Image src="/images/logo.png" alt="KalySwap logo" width={36} height={36} />
							<span className="font-display font-bold text-lg">KalySwap</span>
						</a>
						<p className="text-cream/50 text-sm mt-5 max-w-xs leading-relaxed">{t.tagline}</p>
					</div>
					{columns.map((column) => (
						<div key={column.title}>
							<p className="font-display font-semibold tracking-wide text-sm mb-4">{column.title}</p>
							<ul className="space-y-2.5 text-sm text-cream/55">
								{column.links.map((link) => (
									<li key={link.label}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-gold transition"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="mt-14 pt-6 border-t hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream/40 font-display">
					<p>
						© {new Date().getFullYear()} {t.copyright}
					</p>
					<p className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-green-400" /> {t.operational}
					</p>
				</div>
			</div>
		</footer>
	);
}
