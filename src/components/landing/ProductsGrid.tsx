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
import { LINKS } from '@/lib/links';

interface Product {
	icon: LucideIcon;
	title: string;
	description: string;
	href?: string;
	badge?: string;
}

const PRODUCTS: Product[] = [
	{
		icon: ArrowLeftRight,
		title: 'Swap',
		description: 'Instant token exchange with deep liquidity and near-zero fees.',
		href: LINKS.swap,
	},
	{
		icon: Waves,
		title: 'Pools',
		description: 'Provide liquidity to KLC, KUSD & more and earn trading fees.',
		href: LINKS.pools,
	},
	{
		icon: Sprout,
		title: 'Farm',
		description: 'Stake your LP tokens in farms to earn extra rewards.',
		href: LINKS.farm,
	},
	{
		icon: Lock,
		title: 'Stake',
		description: 'Stake KLC to support the network and earn protocol rewards.',
		href: LINKS.stake,
	},
	{
		icon: Gem,
		title: 'Vaults NFT',
		description: 'Auto-compounding NFT vaults backed by protocol-owned liquidity.',
		href: LINKS.vaults,
	},
	{
		icon: Network,
		title: 'Bridge',
		description: 'Move assets across chains into the KalyChain ecosystem.',
		href: LINKS.bridge,
	},
	{
		icon: Rocket,
		title: 'Launchpad',
		description: 'Discover and back the next projects launching on KalyChain.',
		href: LINKS.launchpad,
	},
	{
		icon: HandCoins,
		title: 'Lend',
		description: 'Supply assets to earn, or borrow against your portfolio.',
		badge: 'COMING SOON',
	},
	{
		icon: CreditCard,
		title: 'KUSD Card',
		description: 'Spend your KUSD stablecoin anywhere, on-chain to real-world.',
		badge: 'COMING SOON',
	},
];

function ProductCard({ icon: Icon, title, description, href, badge }: Product) {
	const card = (
		<div className="card-hover group relative h-full rounded-2xl border hairline bg-surface/50 p-6 overflow-hidden">
			<div className="flex items-start justify-between">
				<span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold-dark/10 border border-gold/25 text-gold">
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

export default function ProductsGrid() {
	return (
		<section id="products" className="relative w-full py-24">
			<div className="mx-auto max-w-[1240px] px-6">
				<Reveal className="max-w-2xl">
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/50 px-4 py-1.5 text-xs font-display tracking-widest text-gold">
						ONE APP, EVERY DEFI PRIMITIVE
					</span>
					<h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
						Everything DeFi, <span className="text-gradient-gold">under one roof</span>
					</h2>
					<p className="text-cream/60 text-lg mt-5">
						No more juggling a dozen dApps. KalySwap unifies trading, yield, staking and launches into a single super
						app.
					</p>
				</Reveal>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
					{PRODUCTS.map((product, index) => (
						<Reveal key={product.title} delay={(index % 3) * 100} className="h-full">
							<ProductCard {...product} />
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
