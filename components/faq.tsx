import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getTranslations } from "next-intl/server";

const faqKeys = ["location", "reformerVsMat", "beginners", "prenatalPostnatal", "groupSize", "whatToBring"] as const;

type Props = { locale: string };

export async function Faq({ locale }: Props) {
	const t = await getTranslations({ locale, namespace: "faq" });

	const faqJsonLd = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: faqKeys.map((key) => ({
			"@type": "Question",
			name: t(`items.${key}.question`),
			acceptedAnswer: {
				"@type": "Answer",
				text: t(`items.${key}.answer`),
			},
		})),
	};

	// Sanitize < to \u003c per Next.js JSON-LD docs to prevent XSS; content is static translations under our control.
	const jsonLdString = JSON.stringify(faqJsonLd).replace(/</g, "\\u003c");

	return (
		<section id="faq" className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
			<div className="mx-auto max-w-3xl">
				<div className="mb-12 text-center">
					<Badge variant="outline" className="border-accent/40 text-accent mb-4">
						{t("badge")}
					</Badge>
					<h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t("subtitle")}</p>
				</div>

				<Accordion type="single" collapsible className="w-full">
					{faqKeys.map((key) => (
						<AccordionItem key={key} value={key}>
							<AccordionTrigger className="text-base">{t(`items.${key}.question`)}</AccordionTrigger>
							<AccordionContent className="text-muted-foreground text-base leading-relaxed">{t(`items.${key}.answer`)}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
}
