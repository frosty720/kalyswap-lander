import { Gem, Lock, Waves } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import { LINKS } from '@/lib/links';

const FACTS = [
	{ value: '100%', label: 'Non-custodial' },
	{ value: '< $0.01', label: 'Per transaction' },
	{ value: '24/7', label: 'Claim anytime' },
];

const SOURCES = [
	{
		icon: Waves,
		title: 'Provide liquidity',
		description: 'Earn a share of the trading fees from every swap in your pools.',
		href: LINKS.pools,
	},
	{
		icon: Lock,
		title: 'Farm & stake',
		description: 'Put LP tokens to work in farms or stake KLC for protocol rewards.',
		href: LINKS.stake,
	},
	{
		icon: Gem,
		title: 'Vaults NFT',
		description: 'Auto-compounding vault strategies backed by protocol-owned liquidity.',
		href: LINKS.vaults,
	},
];

export default function RealYieldSection() {
	return (
		<section id="yield" className="relative w-full py-24 border-t hairline bg-surface/30 overflow-hidden">
			<div className="mx-auto max-w-[1240px] px-6 grid lg:grid-cols-2 gap-14 items-center">
				<Reveal>
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/50 px-4 py-1.5 text-xs font-display tracking-widest text-gold">
						REAL YIELD, NOT INFLATION
					</span>
					<h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
						Your assets earn <span className="text-gradient-gold">every block</span>
					</h2>
					<p className="text-cream/65 text-lg mt-5 leading-relaxed">
						KalySwap yields are backed by real protocol activity — swap fees, farms and staking rewards — settled
						transparently on-chain. Rewards accrue continuously and are claimable at any time.
					</p>
					<div className="grid grid-cols-3 gap-4 mt-9">
						{FACTS.map((fact) => (
							<div key={fact.label} className="rounded-xl border hairline bg-ink/40 p-4 text-center">
								<div className="font-display font-bold text-2xl text-gold">{fact.value}</div>
								<div className="text-xs text-cream/50 mt-1">{fact.label}</div>
							</div>
						))}
					</div>
				</Reveal>

				<Reveal className="grid gap-4" delay={150}>
					{SOURCES.map(({ icon: Icon, title, description, href }) => (
						<a
							key={title}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="card-hover flex items-center gap-4 rounded-2xl border hairline bg-ink/50 p-5"
						>
							<span className="grid place-items-center shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-gold/20 to-gold-dark/10 border border-gold/25 text-gold">
								<Icon className="w-5 h-5" />
							</span>
							<div>
								<div className="font-display font-semibold">{title}</div>
								<div className="text-sm text-cream/50 mt-0.5">{description}</div>
							</div>
						</a>
					))}
				</Reveal>
			</div>
		</section>
	);
}
