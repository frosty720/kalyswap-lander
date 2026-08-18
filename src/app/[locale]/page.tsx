import { Zap } from 'lucide-react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import HeroSection from '@/components/landing/HeroSection';
import StatsBar from '@/components/landing/StatsBar';
import ProductsGrid from '@/components/landing/ProductsGrid';
import RealYieldSection from '@/components/landing/RealYieldSection';
import DashboardPreview from '@/components/landing/DashboardPreview';
import SecuritySection from '@/components/landing/SecuritySection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';
import { getDictionary, isLocale } from '@/i18n';
import { getDexStats } from '@/lib/stats';
import { LINKS } from '@/lib/links';

export const revalidate = 300;

export default async function Home({ params }: { params: { locale: string } }) {
	if (!isLocale(params.locale)) notFound();
	const locale = params.locale;
	const dict = getDictionary(locale);
	const stats = await getDexStats();

	return (
		<>
			<Header nav={dict.nav} locale={locale} />
			<main className="flex min-h-screen flex-col items-center bg-ink">
				<HeroSection t={dict.hero} locale={locale} />
				<StatsBar t={dict.stats} stats={stats} />
				<ProductsGrid t={dict.products} locale={locale} />
				<RealYieldSection t={dict.yield} locale={locale} />
				<DashboardPreview t={dict.dashboard} stats={stats} statLabels={dict.stats} />
				<SecuritySection t={dict.security} locale={locale} />
				<CtaSection t={dict.cta} />
				<Footer t={dict.footer} products={dict.products} locale={locale} />

				<a
					href={LINKS.app}
					target="_blank"
					rel="noopener noreferrer"
					className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-bright to-gold-dark px-5 py-3 text-sm font-display font-semibold text-ink hover:scale-[1.03] transition gold-glow"
				>
					<Zap className="w-4 h-4" /> {dict.nav.launchApp}
				</a>
			</main>
		</>
	);
}
