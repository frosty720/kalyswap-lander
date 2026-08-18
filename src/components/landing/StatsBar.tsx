import Counter from '@/components/landing/Counter';
import type { DexStats } from '@/lib/stats';

const LABELS: { key: keyof DexStats['counters']; label: string }[] = [
	{ key: 'tvl', label: 'Total Value Locked' },
	{ key: 'transactions', label: 'Swap Transactions' },
	{ key: 'pools', label: 'Liquidity Pools' },
	{ key: 'klcPrice', label: 'KLC Price' },
];

export default function StatsBar({ stats }: { stats: DexStats }) {
	return (
		<section className="relative w-full border-t hairline bg-surface/40">
			<div className="mx-auto max-w-[1240px] px-6 py-10">
				<p className="text-center text-xs font-display tracking-widest text-cream/40 uppercase mb-8">
					Live metrics · KalySwap V2 + V3 subgraphs
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
					{LABELS.map(({ key, label }) => (
						<div key={key} className="text-center">
							<Counter
								{...stats.counters[key]}
								className="font-display font-bold text-4xl md:text-5xl text-gradient-gold"
							/>
							<p className="mt-2 text-sm text-cream/55 font-display">{label}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
