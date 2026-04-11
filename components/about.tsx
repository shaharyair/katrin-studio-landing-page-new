import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function About() {
	const t = useTranslations("about");

	const stats = [
		{ value: t("stat1Value"), label: t("stat1Label") },
		{ value: t("stat2Value"), label: t("stat2Label") },
		{ value: t("stat3Value"), label: t("stat3Label") },
	];

	return (
		<section className="bg-background px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="grid items-center gap-16 lg:grid-cols-2">
					{/* Image */}
					<div className="relative">
						<div className="relative aspect-4/3 overflow-hidden rounded-2xl">
							<Image
								src="/images/studio/studio-3.webp"
								alt="Katrin Studio interior showing premium Pilates reformer machines"
								fill
								className="object-cover"
								sizes="(max-width: 1024px) 100vw, 50vw"
								quality={80}
								priority
							/>
							{/* Gold accent frame */}
							<div className="ring-accent/20 pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset" />
						</div>
						{/* Floating stats card */}
						<div className="bg-card border-border absolute -inset-e-2 -bottom-6 grid grid-cols-3 gap-4 rounded-xl border p-4 shadow-xl md:-inset-e-6">
							{stats.map((stat) => (
								<div key={stat.label} className="text-center">
									<div className="text-accent text-2xl font-bold">{stat.value}</div>
									<div className="text-muted-foreground mt-0.5 text-xs whitespace-nowrap">{stat.label}</div>
								</div>
							))}
						</div>
					</div>

					{/* Text */}
					<div className="mt-8 lg:mt-0 lg:ps-8">
						<Badge variant="outline" className="border-accent/40 text-accent mb-4">
							{t("badge")}
						</Badge>
						<h2 className="mb-6 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
						<p className="text-muted-foreground mb-4 text-lg leading-relaxed">{t("body1")}</p>
						<p className="text-muted-foreground text-lg leading-relaxed">{t("body2")}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
