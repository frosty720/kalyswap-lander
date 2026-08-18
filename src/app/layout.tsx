import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
	metadataBase: new URL('https://kalyswap.io'),
	title: 'KalySwap — The DeFi Super App on KalyChain',
	description:
		'Swap, earn, bridge and explore DeFi on KalyChain with KalySwap — trading, liquidity, farming, staking and NFT vaults at less than a cent per transaction.',
	openGraph: {
		title: 'KalySwap — The DeFi Super App on KalyChain',
		description: 'Everything DeFi in one place — swap, earn and build on KalyChain.',
		type: 'website',
		images: ['/images/hero.jpg'],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'KalySwap — The DeFi Super App on KalyChain',
		description: 'Everything DeFi in one place — swap, earn and build on KalyChain.',
		images: ['/images/hero.jpg'],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark" suppressHydrationWarning>
			<body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-ink text-cream antialiased overflow-x-hidden`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
