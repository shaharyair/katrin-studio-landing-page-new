import { About } from "@/components/about";
import { ContactSection } from "@/components/contact-section";
import { CtaBanner } from "@/components/cta-banner";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { WhyUs } from "@/components/why-us";
import { studioConfig } from "@/lib/studio-config";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "hero" });

	const isHe = locale === "he";
	const title = isHe ? "הסטודיו של קאתרין | פילאטיס וכושר" : "Katrin Studio | Pilates & Fitness";

	return {
		title,
		description: t("subline"),
		alternates: {
			canonical: `${studioConfig.siteUrl}/${locale}`,
		},
		openGraph: {
			title,
			description: t("subline"),
			url: `${studioConfig.siteUrl}/${locale}`,
			images: [`${studioConfig.siteUrl}/images/studio/studio-1.webp`],
		},
	};
}

export default async function HomePage() {
	return (
		<>
			<Hero />
			<Services />
			<About />
			<Testimonials />
			<WhyUs />
			<CtaBanner />
			<ContactSection />
		</>
	);
}
