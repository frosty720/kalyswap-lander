import { Compass, Zap } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import type { Dictionary } from '@/i18n';
import { LINKS } from '@/lib/links';

export default function CtaSection({ t }: { t: Dictionary['cta'] }) {
	return (
		<section className="relative w-full py-28 border-t hairline overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
			<Reveal className="relative mx-auto max-w-[900px] px-6 text-center">
				<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-4 py-1.5 text-xs font-display tracking-widest text-gold-light uppercase">
					{t.badge}
				</span>
				<h2 className="font-display font-bold text-4xl md:text-6xl leading-tight mt-6">
					{t.title} <span className="text-gold">{t.titleAccent}</span>
				</h2>
				<p className="text-cream/60 text-lg mt-6 max-w-2xl mx-auto">{t.description}</p>
				<div className="mt-10 flex flex-wrap items-center justify-center gap-4">
					<a
						href={LINKS.app}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2.5 rounded-xl bg-gold-gradient px-8 py-4 text-base font-display font-bold text-on-gold hover:scale-[1.02] transition gold-glow"
					>
						<Zap className="w-4 h-4" /> {t.launchApp}
					</a>
					<a
						href="#products"
						className="inline-flex items-center gap-2.5 rounded-xl border hairline px-8 py-4 text-base font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition"
					>
						<Compass className="w-4 h-4" /> {t.explore}
					</a>
				</div>
			</Reveal>
		</section>
	);
}
