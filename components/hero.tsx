import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
	const t = useTranslations("hero");
	const locale = useLocale();

	const headline = t("headline").split("\n");

	function renderHeadlineLine(line: string) {
		const match = line.match(/(קאתרין|Katrin)/);
		if (!match || match.index === undefined) return line;
		const before = line.slice(0, match.index);
		const name = match[0];
		const after = line.slice(match.index + name.length);
		return (
			<>
				{before}
				<span className="text-accent">{name}</span>
				{after}
			</>
		);
	}

	return (
		<section className="relative flex min-h-svh items-center justify-center overflow-hidden">
			{/* Background image */}
			<div className="absolute inset-0">
				<Image
					src="/images/studio/studio-2.webp"
					alt="Katrin Studio - Premium Pilates studio in Afula with reformer machines"
					fill
					className="object-cover"
					priority
					sizes="100vw"
					quality={85}
				/>
				{/* Dark gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
			</div>

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white sm:px-6 lg:px-8">
				<h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl">
					{headline.map((line) => (
						<span key={line} className="block">
							{renderHeadlineLine(line)}
						</span>
					))}
				</h1>

				<p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{t("subline")}</p>

				<div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-8 text-base font-semibold">
						<Link href={`/${locale}#contact`}>{t("cta")}</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="h-12 border-white/40 bg-white/10 px-8 text-base font-medium text-white backdrop-blur-sm hover:bg-white/20"
					>
						<Link href={`/${locale}#services`}>{t("ctaSecondary")}</Link>
					</Button>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
				<ChevronDown className="size-6" />
			</div>
		</section>
	);
}
