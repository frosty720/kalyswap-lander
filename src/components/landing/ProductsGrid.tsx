import {
	ArrowLeftRight,
	CreditCard,
	Gem,
	HandCoins,
	Lock,
	Network,
	Rocket,
	Sprout,
	Waves,
	type LucideIcon,
} from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import type { Dictionary, Locale } from '@/i18n';
import { LINKS, vaultsUrl } from '@/lib/links';

interface ProductsGridProps {
	t: Dictionary['products'];
	locale: Locale;
}

type ProductKey = 'swap' | 'pools' | 'farm' | 'stake' | 'vaults' | 'bridge' | 'launchpad' | 'lend' | 'card';

const PRODUCT_DEFS: { key: ProductKey; icon: LucideIcon; href?: string; localizedVaults?: boolean }[] = [
	{ key: 'swap', icon: ArrowLeftRight, href: LINKS.swap },
	{ key: 'pools', icon: Waves, href: LINKS.pools },
	{ key: 'farm', icon: Sprout, href: LINKS.farm },
	{ key: 'stake', icon: Lock, href: LINKS.stake },
	{ key: 'vaults', icon: Gem, localizedVaults: true },
	{ key: 'bridge', icon: Network, href: LINKS.bridge },
	{ key: 'launchpad', icon: Rocket, href: LINKS.launchpad },
	{ key: 'lend', icon: HandCoins },
	{ key: 'card', icon: CreditCard },
];

function ProductCard({
	icon: Icon,
	title,
	description,
	href,
	badge,
}: {
	icon: LucideIcon;
	title: string;
	description: string;
	href?: string;
	badge?: string;
}) {
	const card = (
		<div className="card-hover group relative h-full rounded-2xl border hairline bg-surface/50 p-6 overflow-hidden">
			<div className="flex items-start justify-between">
				<span className="grid place-items-center w-12 h-12 rounded-xl bg-gold-soft border border-gold/25 text-gold">
					<Icon className="w-5 h-5" />
				</span>
				{badge && (
					<span className="text-[10px] font-display font-bold tracking-widest text-violet bg-violet/15 border border-violet/30 rounded px-2 py-1">
						{badge}
					</span>
				)}
			</div>
			<h3 className="font-display font-bold text-xl mt-5">{title}</h3>
			<p className="text-cream/55 text-sm mt-2 leading-relaxed">{description}</p>
		</div>
	);

	if (!href) return card;
	return (
		<a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
			{card}
		</a>
	);
}

export default function ProductsGrid({ t, locale }: ProductsGridProps) {
	return (
		<section id="products" className="relative w-full py-24">
			<div className="mx-auto max-w-[1240px] px-6">
				<Reveal className="max-w-2xl">
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-4 py-1.5 text-xs font-display tracking-widest text-gold-light uppercase">
						{t.badge}
					</span>
					<h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
						{t.title} <span className="text-gold">{t.titleAccent}</span>
					</h2>
					<p className="text-cream/60 text-lg mt-5">{t.description}</p>
				</Reveal>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
					{PRODUCT_DEFS.map((def, index) => {
						const copy = t[def.key];
						const href = def.localizedVaults ? vaultsUrl(locale) : def.href;
						return (
							<Reveal key={def.key} delay={(index % 3) * 100} className="h-full">
								<ProductCard
									icon={def.icon}
									title={copy.title}
									description={copy.description}
									href={href}
									badge={href ? undefined : t.comingSoon}
								/>
							</Reveal>
						);
					})}
				</div>
			</div>
		</section>
	);
}
