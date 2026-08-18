import { Zap } from 'lucide-react';
import Reveal from '@/components/landing/Reveal';
import { LINKS } from '@/lib/links';
import type { DexStats } from '@/lib/stats';

// Portfolio figures below are an illustrative mockup (labeled on the page);
// only the "Live stats" card shows real subgraph data.
const ASSETS = [
	{ badge: 'K', badgeClass: 'from-gold-bright to-gold-dark', symbol: 'KLC', name: 'KalyChain', balance: '2,400,000', price: '$0.0020', value: '$4,800', change: '+8.2%', changeClass: 'text-emerald-400' },
	{ badge: '$', badgeClass: 'from-emerald-400 to-green-600', symbol: 'KUSD', name: 'Kaly Dollar', balance: '3,500', price: '$1.00', value: '$3,500', change: '0.0%', changeClass: 'text-cream/50' },
	{ badge: 'E', badgeClass: 'from-indigo-400 to-blue-600', symbol: 'ETH', name: 'Ethereum', balance: '0.85', price: '$3,120', value: '$2,652', change: '-1.4%', changeClass: 'text-red-400' },
	{ badge: 'B', badgeClass: 'from-orange-400 to-amber-600', symbol: 'BTC', name: 'Bitcoin', balance: '0.014', price: '$102,400', value: '$1,433', change: '+2.1%', changeClass: 'text-emerald-400' },
];

const POSITIONS = [
	{ title: 'Pool KLC/USDT', detail: 'Liquidity provided', status: 'Earning fees' },
	{ title: 'Farm KSWAP/KLC', detail: 'LP tokens staked', status: 'Earning rewards' },
	{ title: 'KLC Staking', detail: 'KLC staked', status: 'Earning rewards' },
];

const STAT_ROWS: { key: keyof Pick<DexStats, 'tvl' | 'transactions' | 'pools' | 'klcPrice'>; label: string }[] = [
	{ key: 'tvl', label: 'Total TVL' },
	{ key: 'transactions', label: 'Swap Transactions' },
	{ key: 'pools', label: 'Liquidity Pools' },
	{ key: 'klcPrice', label: 'KLC Price' },
];

export default function DashboardPreview({ stats }: { stats: DexStats }) {
	return (
		<section id="app" className="relative w-full py-24">
			<div className="mx-auto max-w-[1240px] px-6">
				<Reveal className="max-w-2xl mb-12">
					<span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-ink/50 px-4 py-1.5 text-xs font-display tracking-widest text-gold">
						YOUR PORTFOLIO AT A GLANCE
					</span>
					<h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mt-6">
						A dashboard built for <span className="text-gradient-gold">real DeFi users</span>
					</h2>
					<p className="text-cream/60 text-lg mt-5">
						Track balances, active yields and performance across every KalySwap product from a single, elegant control
						center.
					</p>
				</Reveal>

				<Reveal className="rounded-3xl border hairline bg-surface/50 p-4 sm:p-6 shadow-[0_40px_120px_-40px_rgba(245,158,11,0.25)]">
					<div className="flex items-center justify-between px-2 pb-4">
						<div className="flex items-center gap-2">
							<span className="w-3 h-3 rounded-full bg-red-500/70" />
							<span className="w-3 h-3 rounded-full bg-gold/70" />
							<span className="w-3 h-3 rounded-full bg-emerald-500/70" />
						</div>
						<span className="inline-flex items-center gap-2 text-xs font-display text-cream/50">
							<span className="w-2 h-2 rounded-full bg-emerald-400" /> KalyChain · Interface preview
						</span>
					</div>

					<div className="grid lg:grid-cols-3 gap-4">
						<div className="lg:col-span-2 rounded-2xl border hairline bg-ink/60 p-6">
							<div className="flex items-center justify-between">
								<span className="text-xs font-display tracking-widest text-cream/40 uppercase">Total Portfolio Value</span>
								<div className="flex items-center gap-1 text-xs font-display">
									<span className="px-2 py-1 rounded text-cream/40">1D</span>
									<span className="px-2 py-1 rounded bg-gold/20 text-gold">1W</span>
									<span className="px-2 py-1 rounded text-cream/40">1M</span>
									<span className="px-2 py-1 rounded text-cream/40">1Y</span>
								</div>
							</div>
							<div className="flex items-end gap-3 mt-3">
								<span className="font-display font-bold text-4xl md:text-5xl">$12,385.42</span>
								<span className="text-emerald-400 font-display font-semibold mb-1.5">+3.1% (24h)</span>
							</div>
							<svg viewBox="0 0 600 200" className="w-full h-40 mt-6" preserveAspectRatio="none" aria-hidden="true">
								<defs>
									<linearGradient id="ksArea" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#F59E0B" stopOpacity="0.45" />
										<stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
									</linearGradient>
								</defs>
								<path
									d="M0,160 C60,150 90,150 130,130 C180,105 210,110 250,112 C300,114 330,80 380,70 C430,60 470,55 520,35 C560,20 580,18 600,12 L600,200 L0,200 Z"
									fill="url(#ksArea)"
								/>
								<path
									d="M0,160 C60,150 90,150 130,130 C180,105 210,110 250,112 C300,114 330,80 380,70 C430,60 470,55 520,35 C560,20 580,18 600,12"
									fill="none"
									stroke="#F59E0B"
									strokeWidth="2.5"
								/>
							</svg>
						</div>

						<div className="rounded-2xl border hairline bg-ink/60 p-6">
							<span className="text-xs font-display tracking-widest text-cream/40 uppercase">Live Stats</span>
							<div className="mt-4 space-y-4 text-sm font-display">
								{STAT_ROWS.map(({ key, label }) => (
									<div key={key} className="flex items-center justify-between border-b hairline pb-3 last:border-0">
										<span className="text-cream/55">{label}</span>
										<span className="font-bold">{stats[key]}</span>
									</div>
								))}
							</div>
							<div className="mt-4 rounded-lg border border-gold/25 bg-gold/5 px-3 py-2.5 text-xs text-cream/70">
								<Zap className="inline w-3.5 h-3.5 text-gold mr-1 -mt-0.5" />
								Live from the KalySwap V2 + V3 subgraphs.
							</div>
						</div>
					</div>

					<div className="grid lg:grid-cols-3 gap-4 mt-4">
						<div className="lg:col-span-2 rounded-2xl border hairline bg-ink/60 p-6">
							<div className="flex items-center justify-between mb-4">
								<span className="font-display font-bold text-lg">My assets</span>
								<span className="text-xs font-display text-gold">View all</span>
							</div>
							<div className="overflow-x-auto">
								<table className="w-full text-sm font-display">
									<thead>
										<tr className="text-left text-[11px] tracking-widest text-cream/40 uppercase">
											<th className="pb-3 font-medium">Asset</th>
											<th className="pb-3 font-medium text-right">Balance</th>
											<th className="pb-3 font-medium text-right">Price</th>
											<th className="pb-3 font-medium text-right">Value</th>
											<th className="pb-3 font-medium text-right">24h</th>
										</tr>
									</thead>
									<tbody>
										{ASSETS.map((asset) => (
											<tr key={asset.symbol} className="border-t hairline">
												<td className="py-3">
													<div className="flex items-center gap-3">
														<span
															className={`grid place-items-center w-8 h-8 rounded-full bg-gradient-to-br ${asset.badgeClass} text-ink font-bold text-xs`}
														>
															{asset.badge}
														</span>
														<div>
															<div className="font-semibold">{asset.symbol}</div>
															<div className="text-[11px] text-cream/45">{asset.name}</div>
														</div>
													</div>
												</td>
												<td className="py-3 text-right">{asset.balance}</td>
												<td className="py-3 text-right text-cream/70">{asset.price}</td>
												<td className="py-3 text-right font-semibold">{asset.value}</td>
												<td className={`py-3 text-right font-semibold ${asset.changeClass}`}>{asset.change}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="rounded-2xl border hairline bg-ink/60 p-6">
							<div className="flex items-center justify-between mb-4">
								<span className="font-display font-bold text-lg">Active yields</span>
							</div>
							<div className="space-y-3">
								{POSITIONS.map((position) => (
									<div key={position.title} className="rounded-xl border hairline bg-surface/40 p-3">
										<div className="flex items-center justify-between">
											<span className="font-display font-semibold text-sm">{position.title}</span>
											<span className="text-[11px] font-bold text-emerald-400">{position.status}</span>
										</div>
										<div className="mt-1 text-[11px] text-cream/50">{position.detail}</div>
									</div>
								))}
							</div>
							<a
								href={LINKS.app}
								target="_blank"
								rel="noopener noreferrer"
								className="mt-4 block w-full rounded-xl bg-gradient-to-r from-gold-bright to-gold-dark py-2.5 text-sm font-display font-bold text-ink text-center"
							>
								Open the dashboard
							</a>
						</div>
					</div>
				</Reveal>

				<p className="text-center text-xs text-cream/35 mt-5 font-display">
					Interface preview — portfolio figures are illustrative. Protocol stats are live.
				</p>
			</div>
		</section>
	);
}
