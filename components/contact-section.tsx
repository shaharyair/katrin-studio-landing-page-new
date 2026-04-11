import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { studioConfig } from "@/lib/studio-config";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

export async function ContactSection() {
	const locale = await getLocale();
	const t = await getTranslations({ locale, namespace: "contact" });

	const contactDetails = [
		{
			icon: MapPin,
			label: t("addressLabel"),
			value: t("address"),
			href: undefined as string | undefined,
		},
		{
			icon: Phone,
			label: t("phoneLabel"),
			value: t("phone"),
			href: `tel:${t("phone").replace(/[-\s]/g, "")}`,
		},
		{
			icon: Mail,
			label: t("emailLabel"),
			value: t("email"),
			href: `mailto:${t("email")}`,
		},
		{
			icon: MessageCircle,
			label: t("whatsappLabel"),
			value: t("whatsapp"),
			href: studioConfig.whatsappUrl,
		},
	];

	return (
		<section id="contact" className="bg-background px-4 py-24 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				<div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
					{/* Left: info */}
					<div>
						<Badge variant="outline" className="border-accent/40 text-accent mb-6">
							{t("badge")}
						</Badge>
						<h2 className="mb-5 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">{t("title")}</h2>
						<p className="text-muted-foreground mb-12 text-lg leading-relaxed">{t("subtitle")}</p>

						<div className="space-y-6">
							{contactDetails.map(({ icon: Icon, label, value, href }) => (
								<div key={label} className="flex items-center gap-4">
									<div className="bg-accent/10 flex size-11 shrink-0 items-center justify-center rounded-xl">
										<Icon className="text-accent size-5" />
									</div>
									<div>
										<div className="text-muted-foreground mb-0.5 text-sm">{label}</div>
										{href ? (
											<a
												href={href}
												className="hover:text-accent font-medium transition-colors"
												target={href.startsWith("https") ? "_blank" : undefined}
												rel={href.startsWith("https") ? "noopener noreferrer" : undefined}
											>
												{value}
											</a>
										) : (
											<div className="font-medium whitespace-pre-line">{value}</div>
										)}
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Right: form */}
					<Card className="p-8 sm:p-10">
						<ContactForm />
					</Card>
				</div>
			</div>
		</section>
	);
}
