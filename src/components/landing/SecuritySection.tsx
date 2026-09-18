import Image from 'next/image';
import { Box, Coins, FileCheck2, Landmark, ShieldCheck } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import type { Dictionary, Locale } from '@/i18n';
import { LINKS, kalychainUrl } from '@/lib/links';

interface SecuritySectionProps {
	t: Dictionary['security'];
	locale: Locale;
}

export default function SecuritySection({ t, locale }: SecuritySectionProps) {
	const pillars = [
		{ icon: ShieldCheck, ...t.pillarCustody },
		{ icon: FileCheck2, ...t.pillarOpenSource },
		{ icon: Coins, ...t.pillarFees },
		{ icon: Box, ...t.pillarEvm },
	];

	return (
		<section id="security" className="relative w-full py-24 border-t hairline bg-surface/30">
			<div className="mx-auto max-w-[1240px] px-6 grid lg:grid-cols-2 gap-12 items-center">
				<Reveal>
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft px-4 py-1.5 text-xs font-display tracking-widest text-gold-light uppercase">
						{t.badge}
					</span>
					<h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
						{t.title} <span className="text-gold">{t.titleAccent}</span>
					</h2>
					<p className="text-cream/65 text-lg mt-5 leading-relaxed">{t.description}</p>
					<div className="grid sm:grid-cols-2 gap-4 mt-8">
						{pillars.map(({ icon: Icon, title, description }) => (
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
					<h3 className="font-display font-bold text-2xl mt-6">{t.ecosystemTitle}</h3>
					<p className="text-cream/60 mt-3 leading-relaxed">{t.ecosystemDescription}</p>
					<div className="flex flex-wrap items-center justify-center gap-3 mt-7">
						<a
							href={kalychainUrl(locale)}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-xl border hairline px-5 py-3 text-sm font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition"
						>
							<Box className="w-4 h-4" /> {t.ecosystemL1}
						</a>
						<a
							href={LINKS.dao}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-xl border hairline px-5 py-3 text-sm font-display font-semibold text-cream hover:border-gold/60 hover:text-gold transition"
						>
							<Landmark className="w-4 h-4" /> {t.ecosystemDao}
						</a>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
