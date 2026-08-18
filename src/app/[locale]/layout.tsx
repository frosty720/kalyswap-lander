import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, isLocale, locales, localePath } from '@/i18n';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

interface LayoutProps {
	children: React.ReactNode;
	params: { locale: string };
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
	if (!isLocale(params.locale)) return {};
	const { meta } = getDictionary(params.locale);
	return {
		metadataBase: new URL('https://kalyswap.io'),
		title: meta.title,
		description: meta.description,
		alternates: {
			canonical: localePath(params.locale),
			languages: {
				en: '/',
				fr: '/fr',
				es: '/es',
				'x-default': '/',
			},
		},
		openGraph: {
			title: meta.ogTitle,
			description: meta.ogDescription,
			type: 'website',
			images: ['/images/hero.jpg'],
		},
		twitter: {
			card: 'summary_large_image',
			title: meta.ogTitle,
			description: meta.ogDescription,
			images: ['/images/hero.jpg'],
		},
	};
}

export default function RootLayout({ children, params }: LayoutProps) {
	if (!isLocale(params.locale)) notFound();

	return (
		<html lang={params.locale} className="dark" suppressHydrationWarning>
			<body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-ink text-cream antialiased overflow-x-hidden`}>
				{children}
			</body>
		</html>
	);
}
