import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

const testimonialKeys = ["1", "2", "3"] as const;

export function Testimonials() {
	const t = useTranslations("testimonials");

	return (
		<section className="bg-background px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<Badge variant="outline" className="border-accent/40 text-accent mb-4">
						{t("badge")}
					</Badge>
					<h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t("subtitle")}</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{testimonialKeys.map((key) => (
						<div key={key} className="bg-card border-border flex flex-col rounded-2xl border p-6 shadow-sm">
							<div className="mb-4 flex gap-0.5">
								{Array.from({ length: 5 }).map((_, i) => (
									<Star key={i} className="text-accent size-4 fill-current" />
								))}
							</div>
							<p className="text-muted-foreground mb-6 flex-1 leading-relaxed">&ldquo;{t(`items.${key}.body`)}&rdquo;</p>
							<div>
								<div className="font-semibold">{t(`items.${key}.name`)}</div>
								<div className="text-muted-foreground text-sm">{t(`items.${key}.detail`)}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
