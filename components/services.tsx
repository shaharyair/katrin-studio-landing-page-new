import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, Dumbbell, User, Users } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const icons = {
	reformer: Dumbbell,
	trx: Activity,
	personal: User,
	group: Users,
};

export function Services() {
	const t = useTranslations("services");
	const locale = useLocale();

	const serviceKeys = ["reformer", "trx", "personal", "group"] as const;

	return (
		<section id="services" className="bg-surface px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="mb-16 text-center">
					<Badge variant="outline" className="border-accent/40 text-accent mb-4">
						{t("badge")}
					</Badge>
					<h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t("subtitle")}</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{serviceKeys.map((key) => {
						const Icon = icons[key];
						return (
							<Card
								key={key}
								className="bg-card border-border hover:border-accent/50 hover:shadow-accent/10 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
							>
								<CardHeader className="pb-4">
									<div className="bg-accent/10 group-hover:bg-accent/20 mb-4 flex size-12 items-center justify-center rounded-lg transition-colors">
										<Icon className="text-accent size-6" />
									</div>
									<CardTitle className="text-lg font-semibold">{t(`items.${key}.title`)}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground mb-5 text-sm leading-relaxed">{t(`items.${key}.description`)}</p>
									<Link
										href={`/${locale}#contact`}
										className="text-accent flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
									>
										{t("bookNow")}
										<ArrowRight className="size-4" />
									</Link>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
