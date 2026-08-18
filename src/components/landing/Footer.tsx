import Image from 'next/image';
import Link from 'next/link';
import { LINKS } from '@/lib/links';

const COLUMNS = [
	{
		title: 'Products',
		links: [
			{ label: 'Swap', href: LINKS.swap },
			{ label: 'Pools', href: LINKS.pools },
			{ label: 'Farm', href: LINKS.farm },
			{ label: 'Stake', href: LINKS.stake },
			{ label: 'Vaults NFT', href: LINKS.vaults },
			{ label: 'Bridge', href: LINKS.bridge },
			{ label: 'Launchpad', href: LINKS.launchpad },
		],
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Documentation', href: LINKS.docs },
			{ label: 'Block Explorer', href: LINKS.explorer },
			{ label: 'API', href: LINKS.apiDocs },
			{ label: 'Governance', href: LINKS.dao },
			{ label: 'KalyChain L1', href: LINKS.kalychain },
		],
	},
	{
		title: 'Connect',
		links: [
			{ label: 'Twitter', href: LINKS.twitter },
			{ label: 'Discord', href: LINKS.discord },
			{ label: 'Telegram', href: LINKS.telegram },
			{ label: 'GitHub', href: LINKS.github },
		],
	},
];

export default function Footer() {
	return (
		<footer className="relative w-full border-t hairline bg-ink pt-16 pb-8">
			<div className="mx-auto max-w-[1240px] px-6">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
					<div className="lg:col-span-1">
						<Link href="/" className="flex items-center gap-2.5">
							<Image src="/images/logo.png" alt="KalySwap logo" width={36} height={36} />
							<span className="font-display font-bold text-lg">KalySwap</span>
						</Link>
						<p className="text-cream/50 text-sm mt-5 max-w-xs leading-relaxed">
							The DeFi super app of the KalyChain ecosystem. Swap, earn and build — all in one place.
						</p>
					</div>
					{COLUMNS.map((column) => (
						<div key={column.title}>
							<p className="font-display font-semibold tracking-wide text-sm mb-4">{column.title}</p>
							<ul className="space-y-2.5 text-sm text-cream/55">
								{column.links.map((link) => (
									<li key={link.label}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-gold transition"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
				<div className="mt-14 pt-6 border-t hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream/40 font-display">
					<p>© {new Date().getFullYear()} KalySwap · A KalyChain company. Everything DeFi in one place.</p>
					<p className="flex items-center gap-2">
						<span className="w-2 h-2 rounded-full bg-green-400" /> App operational
					</p>
				</div>
			</div>
		</footer>
	);
}
