import { Award, Heart, Star } from "lucide-react";
import { useTranslations } from "next-intl";

const icons = {
	equipment: Award,
	instructors: Star,
	community: Heart,
};

export function WhyUs() {
	const t = useTranslations("whyUs");

	const keys = ["equipment", "instructors", "community"] as const;

	return (
		<section className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t("subtitle")}</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-3">
					{keys.map((key) => {
						const Icon = icons[key];
						return (
							<div key={key} className="group text-center">
								<div className="bg-accent/10 group-hover:bg-accent/20 mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl transition-colors">
									<Icon className="text-accent size-8" />
								</div>
								<h3 className="mb-3 text-xl font-semibold">{t(`items.${key}.title`)}</h3>
								<p className="text-muted-foreground leading-relaxed">{t(`items.${key}.description`)}</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
