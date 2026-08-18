import Counter from '@/components/landing/Counter';
import type { Dictionary } from '@/i18n';
import type { DexStats } from '@/lib/stats';

interface StatsBarProps {
	t: Dictionary['stats'];
	stats: DexStats;
}

const STAT_KEYS = ['tvl', 'transactions', 'pools', 'klcPrice'] as const;

export default function StatsBar({ t, stats }: StatsBarProps) {
	return (
		<section className="relative w-full border-t hairline bg-surface/40">
			<div className="mx-auto max-w-[1240px] px-6 py-10">
				<p className="text-center text-xs font-display tracking-widest text-cream/40 uppercase mb-8">{t.label}</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
					{STAT_KEYS.map((key) => (
						<div key={key} className="text-center">
							<Counter
								{...stats.counters[key]}
								className="font-display font-bold text-4xl md:text-5xl text-gradient-gold"
							/>
							<p className="mt-2 text-sm text-cream/55 font-display">{t[key]}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
