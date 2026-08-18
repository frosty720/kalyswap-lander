import Image from 'next/image';
import { Box, Coins, FileCheck2, Landmark, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import { LINKS } from '@/lib/links';

const PILLARS = [
	{
		icon: ShieldCheck,
		title: 'Non-custodial',
		description: 'Your keys, your assets, always.',
	},
	{
		icon: FileCheck2,
		title: 'Open-source contracts',
		description: 'Transparent and verifiable on-chain.',
	},
	{
		icon: Coins,
		title: 'Sub-cent fees',
		description: 'Less than $0.01 per transaction.',
	},
	{
		icon: Box,
		title: 'EVM Layer 1',
		description: 'Powered by KalyChain infrastructure.',
	},
];

export default function SecuritySection() {
	return (
		<section id="security" className="relative w-full py-24 border-t hairline bg-surface/30">
			<div className="mx-auto max-w-[1240px] px-6 grid lg:grid-cols-2 gap-12 items-center">
				<Reveal>
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/50 px-4 py-1.5 text-xs font-display tracking-widest text-gold">
						BUILT ON SOLID GROUND
					</span>
					<h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
						Fast, cheap and <span className="text-gradient-gold">secure by design</span>
					</h2>
					<p className="text-cream/65 text-lg mt-5 leading-relaxed">
						KalySwap runs on KalyChain, a high-throughput EVM Layer 1. Non-custodial by default — you always control
						your keys — with open-source smart contracts and transparent on-chain settlement.
					</p>
					<div className="grid sm:grid-cols-2 gap-4 mt-8">
						{PILLARS.map(({ icon: Icon, title, description }) => (
							<div key={title} className="rounded-xl border hairline bg-ink/40 p-4">
								<Icon className="w-5 h-5 text-gold" />
								<div className="font-display font-semibold mt-2">{title}</div>
								<div className="text-xs text-cream/50 mt-1">{description}</div>
							</div>
						))}
					</div>
				</Reveal>

				<Reveal className="rounded-3xl border hairline bg-ink/50 p-8 text-center" delay={150}>
					<Image src="/images/logo.png" alt="KalySwap logo" width={64} height={64} className="mx-auto" />
					<h3 className="font-display font-bold text-2xl mt-6">Part of the KalyChain ecosystem</h3>
					<p className="text-cream/60 mt-3 leading-relaxed">
						KalySwap is the consumer DeFi gateway of a full-stack ecosystem — alongside the KalyChain L1, the KalyDAO
						on-chain governance and the KUSD stablecoin.
					</p>
					<div className="flex flex-wrap items-center justify-center gap-3 mt-7">
						<a
							href={LINKS.kalychain}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-xl border hairline px-5 py-3 text-sm font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition"
						>
							<Box className="w-4 h-4" /> KalyChain L1
						</a>
						<a
							href={LINKS.dao}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-xl border hairline px-5 py-3 text-sm font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition"
						>
							<Landmark className="w-4 h-4" /> KalyDAO
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
