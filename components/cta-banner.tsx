import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export function CtaBanner() {
	const t = useTranslations("cta");
	const locale = useLocale();

	return (
		<section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
			{/* Background */}
			<div className="absolute inset-0">
				<Image src="/images/studio/studio-4.webp" alt="Katrin Studio training space" fill className="object-cover" sizes="100vw" quality={75} />
				<div className="absolute inset-0 bg-black/75" />
			</div>

			{/* Gold accent lines */}
			<div className="via-accent/50 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />
			<div className="via-accent/50 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />

			<div className="relative z-10 mx-auto max-w-3xl text-center text-white">
				<h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
				<p className="mx-auto mb-10 max-w-xl text-lg text-white/75">{t("subtitle")}</p>
				<Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 h-12 px-10 text-base font-semibold">
					<Link href={`/${locale}#contact`}>{t("button")}</Link>
				</Button>
			</div>
		</section>
	);
}
