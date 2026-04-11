import { LegalPageLayout } from "@/components/legal-page-layout";
import { getLegalPage } from "@/lib/legal";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const page = getLegalPage(locale, "accessibility-statement");

	if (!page) return {};

	return {
		title: page.title,
		description: page.description,
	};
}

export default async function AccessibilityStatementPage({ params }: Props) {
	const { locale } = await params;
	const page = getLegalPage(locale, "accessibility-statement");

	if (!page) notFound();

	const lastUpdatedLabel = locale === "he" ? "עודכן לאחרונה" : "Last updated";

	return <LegalPageLayout title={page.title} lastUpdated={page.lastUpdated} lastUpdatedLabel={lastUpdatedLabel} content={page.content} />;
}
