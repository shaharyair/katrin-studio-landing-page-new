import { AccessibilityWidget } from "@/components/accessibility-widget";
import { FloatingButtons } from "@/components/floating-buttons";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { studioConfig } from "@/lib/studio-config";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "hero" });

	const isHe = locale === "he";
	const siteName = isHe ? "הסטודיו של קאתרין" : "Katrin's Studio";
	const titleTemplate = isHe ? "%s | הסטודיו של קאתרין" : "%s | Katrin's Studio";
	const defaultTitle = isHe ? "הסטודיו של קאתרין | פילאטיס וכושר" : "Katrin's Studio | Pilates & Fitness";

	return {
		metadataBase: new URL(studioConfig.siteUrl),
		alternates: {
			canonical: `${studioConfig.siteUrl}/${locale}`,
			languages: {
				"he-IL": `${studioConfig.siteUrl}/he`,
				"en-US": `${studioConfig.siteUrl}/en`,
				"x-default": `${studioConfig.siteUrl}/he`,
			},
		},
		title: {
			default: defaultTitle,
			template: titleTemplate,
		},
		description: t("subline"),
		openGraph: {
			siteName,
			locale: isHe ? "he_IL" : "en_US",
			alternateLocale: isHe ? "en_US" : "he_IL",
			type: "website",
			images: [`${studioConfig.siteUrl}/images/studio/studio-1.webp`],
		},
		twitter: {
			card: "summary_large_image",
		},
	};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;

	if (!routing.locales.includes(locale as "en" | "he")) {
		notFound();
	}

	const messages = await getMessages();
	const dir = locale === "he" ? "rtl" : "ltr";

	const localBusinessJsonLd = {
		"@context": "https://schema.org",
		"@type": "HealthAndBeautyBusiness",
		name: "Katrin Studio",
		description: "Premium Pilates reformer studio and fitness center offering reformer classes, TRX training, personal training, and group classes.",
		url: studioConfig.siteUrl,
		image: `${studioConfig.siteUrl}/images/studio/studio-1.webp`,
		address: {
			"@type": "PostalAddress",
			streetAddress: `${studioConfig.address.streetEn}, ${studioConfig.address.floorEn}`,
			addressLocality: studioConfig.address.city,
			addressCountry: studioConfig.address.country,
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: studioConfig.address.coordinates.latitude,
			longitude: studioConfig.address.coordinates.longitude,
		},
		priceRange: "₪₪",
		openingHoursSpecification: [
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
				opens: "07:00",
				closes: "21:00",
			},
			{
				"@type": "OpeningHoursSpecification",
				dayOfWeek: ["Friday"],
				opens: "07:00",
				closes: "15:00",
			},
		],
		hasMap: studioConfig.googleMapsUrl,
		sameAs: [studioConfig.instagramUrl],
	};

	// Sanitize < to \u003c per Next.js JSON-LD docs to prevent XSS
	const jsonLdString = JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c");

	return (
		<html lang={locale} dir={dir} suppressHydrationWarning className={geistSans.variable}>
			<body className="bg-background text-foreground flex min-h-full flex-col overflow-x-clip antialiased">
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<Analytics />
						<Navbar />
						<main className="flex-1">{children}</main>
						<Footer locale={locale} />
						<FloatingButtons />
						<AccessibilityWidget />
						<Toaster />
					</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
