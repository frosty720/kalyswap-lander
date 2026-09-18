import Image from 'next/image';
import { Coins, Gauge, Gem, ShieldCheck, Zap } from 'lucide-react';
import type { Dictionary, Locale } from '@/i18n';
import { LINKS, vaultsUrl } from '@/lib/links';

interface HeroSectionProps {
	t: Dictionary['hero'];
	locale: Locale;
}

export default function HeroSection({ t, locale }: HeroSectionProps) {
	return (
		<section className="relative w-full min-h-[800px] flex items-center overflow-hidden">
			<div className="absolute inset-0">
				<Image
					src="/images/hero.jpg"
					alt="KalySwap DeFi super app visualization"
					fill
					priority
					className="object-cover"
					sizes="100vw"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
				<div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
			</div>

			<div className="relative mx-auto max-w-[1240px] w-full px-6 pt-28 pb-16">
				<div className="max-w-3xl">
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-3.5 py-1.5 text-xs font-display tracking-widest text-gold-light mb-7">
						<span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" /> {t.badge}
					</span>

					<h1 className="font-display font-bold text-5xl md:text-[68px] leading-[1.03] tracking-tight mb-6">
						{t.titleTop}
						<br />
						<span className="text-gold">{t.titleAccent}</span>
					</h1>

					<p className="text-cream/75 text-lg md:text-xl leading-relaxed mb-9 max-w-2xl">
						{t.desc1}
						<span className="text-gold font-semibold">{t.descHighlight}</span>
						{t.desc2}
					</p>

					<div className="flex flex-wrap items-center gap-3.5">
						<a
							href={LINKS.app}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2.5 rounded-xl bg-gold-gradient px-7 py-4 text-base font-display font-bold text-on-gold hover:scale-[1.02] transition gold-glow"
						>
							<Zap className="w-4 h-4" /> {t.launchApp}
						</a>
						<a
							href={vaultsUrl(locale)}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2.5 rounded-xl border hairline bg-ink/40 backdrop-blur px-7 py-4 text-base font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition"
						>
							<Gem className="w-4 h-4" /> {t.exploreVaults}
						</a>
					</div>

					<div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-cream/60 font-display">
						<span className="flex items-center gap-2">
							<Coins className="w-4 h-4 text-gold" /> {t.fee}
						</span>
						<span className="flex items-center gap-2">
							<ShieldCheck className="w-4 h-4 text-gold" /> {t.nonCustodial}
						</span>
						<span className="flex items-center gap-2">
							<Gauge className="w-4 h-4 text-gold" /> {t.realYield}
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
