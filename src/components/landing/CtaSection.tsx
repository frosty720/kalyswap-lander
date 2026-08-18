import { Compass, Zap } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import { LINKS } from '@/lib/links';

export default function CtaSection() {
	return (
		<section className="relative w-full py-28 border-t hairline overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
			<Reveal className="relative mx-auto max-w-[900px] px-6 text-center">
				<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/50 px-4 py-1.5 text-xs font-display tracking-widest text-gold">
					START IN SECONDS
				</span>
				<h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mt-6">
					Ready to enter the <span className="text-gradient-gold">DeFi Super App?</span>
				</h2>
				<p className="text-cream/60 text-lg mt-6 max-w-2xl mx-auto">
					Connect your wallet and start swapping, earning and building your on-chain portfolio in minutes — at less than
					a cent per transaction.
				</p>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<a
						href={LINKS.app}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-gold-bright to-gold-dark px-8 py-4 text-base font-display font-bold text-ink hover:scale-[1.02] transition gold-glow"
					>
						<Zap className="w-4 h-4" /> Launch App
					</a>
					<a
						href="#products"
						className="inline-flex items-center gap-2.5 rounded-xl border hairline px-8 py-4 text-base font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition"
					>
						<Compass className="w-4 h-4" /> Explore Products
					</a>
				</div>
			</Reveal>
		</section>
	);
}
