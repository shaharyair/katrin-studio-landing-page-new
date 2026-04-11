import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

type Props = { locale: string };

export async function Footer({ locale }: Props) {
	const t = await getTranslations({ locale, namespace: "footer" });
	const navT = await getTranslations({ locale, namespace: "nav" });

	const year = new Date().getFullYear();

	const links = [
		{ href: `/${locale}`, label: navT("home") },
		{ href: `/${locale}#services`, label: navT("services") },
		{ href: `/${locale}/blog`, label: navT("blog") },
		{ href: `/${locale}#contact`, label: navT("contact") },
	];

	return (
		<footer className="bg-surface border-border border-t">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="mb-10 grid gap-8 sm:grid-cols-3">
					{/* Brand */}
					<div>
						<Link href={`/${locale}`} className="mb-4 inline-block">
							<Image src="/images/logo.webp" alt="Katrin Studio" width={130} height={62} className="h-8 w-auto dark:invert" />
						</Link>
						<p className="text-muted-foreground max-w-xs text-sm leading-relaxed">{t("tagline")}</p>
					</div>

					{/* Quick links */}
					<div>
						<div className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">{t("quickLinks")}</div>
						<ul className="space-y-2">
							{links.map((link) => (
								<li key={link.href}>
									<Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact + Social */}
					<div>
						<div className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">{t("contact")}</div>
						<ul className="text-muted-foreground mb-6 space-y-2 text-sm">
							<li>{t("address")}</li>
							<li>
								<a href="tel:0556620441" className="hover:text-foreground transition-colors">
									055-6620441
								</a>
							</li>
							<li>
								<a href="mailto:katrinyair@gmail.com" className="hover:text-foreground transition-colors">
									katrinyair@gmail.com
								</a>
							</li>
						</ul>
					</div>
				</div>

				<Separator className="mb-6" />

				<div className="text-muted-foreground flex flex-col items-center justify-between gap-2 text-xs sm:flex-row">
					<span>
						© {year} Katrin Studio. {t("rights")}
					</span>
					<div className="flex gap-4">
						<Link href="/en" className="hover:text-foreground transition-colors">
							EN
						</Link>
						<Link href="/he" className="hover:text-foreground transition-colors">
							עב
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
