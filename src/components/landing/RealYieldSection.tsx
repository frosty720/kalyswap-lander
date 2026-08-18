import { Gem, Lock, Waves, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import type { Dictionary, Locale } from '@/i18n';
import { LINKS, vaultsUrl } from '@/lib/links';

interface RealYieldSectionProps {
	t: Dictionary['yield'];
	locale: Locale;
}

export default function RealYieldSection({ t, locale }: RealYieldSectionProps) {
	const facts = [
		{ value: '100%', label: t.factCustody },
		{ value: '< $0.01', label: t.factPerTx },
		{ value: '24/7', label: t.factClaim },
	];

	const sources: { icon: LucideIcon; title: string; description: string; href: string }[] = [
		{ icon: Waves, title: t.liquidity.title, description: t.liquidity.description, href: LINKS.pools },
		{ icon: Lock, title: t.farmStake.title, description: t.farmStake.description, href: LINKS.stake },
		{ icon: Gem, title: t.vaultsNft.title, description: t.vaultsNft.description, href: vaultsUrl(locale) },
	];

	return (
		<section id="yield" className="relative w-full py-24 border-t hairline bg-surface/30 overflow-hidden">
			<div className="mx-auto max-w-[1240px] px-6 grid lg:grid-cols-2 gap-14 items-center">
				<Reveal>
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/50 px-4 py-1.5 text-xs font-display tracking-widest text-gold uppercase">
						{t.badge}
					</span>
					<h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
						{t.title} <span className="text-gradient-gold">{t.titleAccent}</span>
					</h2>
					<p className="text-cream/65 text-lg mt-5 leading-relaxed">{t.description}</p>
					<div className="grid grid-cols-3 gap-4 mt-9">
						{facts.map((fact) => (
							<div key={fact.label} className="rounded-xl border hairline bg-ink/40 p-4 text-center">
								<div className="font-display font-bold text-2xl text-gold">{fact.value}</div>
								<div className="text-xs text-cream/50 mt-1">{fact.label}</div>
							</div>
						))}
					</div>
				</Reveal>

				<Reveal className="grid gap-4" delay={150}>
					{sources.map(({ icon: Icon, title, description, href }) => (
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
