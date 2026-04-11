"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookOpen, CalendarPlus, Home, Layers, MessageCircle, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

function LocaleSwitcher({ transparent }: { transparent: boolean }) {
	const pathname = usePathname();
	const isHe = pathname.startsWith("/he");
	const targetPath = isHe ? pathname.replace(/^\/he/, "/en") : pathname.replace(/^\/en/, "/he");

	return (
		<Link
			href={targetPath}
			className={cn(
				"rounded px-2 py-1 text-sm font-medium transition-colors",
				transparent ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground",
			)}
		>
			{isHe ? "EN" : "עב"}
		</Link>
	);
}

function ThemeToggle({ transparent }: { transparent: boolean }) {
	const { setTheme, resolvedTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			aria-label="Toggle theme"
			className={cn(transparent && "text-white/80 hover:bg-white/10 hover:text-white")}
		>
			{resolvedTheme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
		</Button>
	);
}

export function Navbar() {
	const t = useTranslations("nav");
	const pathname = usePathname();

	const scrolled = useSyncExternalStore(
		(cb) => {
			window.addEventListener("scroll", cb, { passive: true });
			return () => window.removeEventListener("scroll", cb);
		},
		() => window.scrollY > 10,
		() => false,
	);

	const locale = pathname.startsWith("/he") ? "he" : "en";
	const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
	const transparent = isHomePage && !scrolled;

	const navLinks = [
		{ href: `/${locale}`, label: t("home"), icon: Home },
		{ href: `/${locale}#services`, label: t("services"), icon: Layers },
		{ href: `/${locale}/blog`, label: t("blog"), icon: BookOpen },
		{ href: `/${locale}#contact`, label: t("contact"), icon: MessageCircle },
	];

	return (
		<>
			<header
				className={cn(
					"fixed inset-x-0 top-0 z-40 transition-all duration-300",
					transparent ? "bg-transparent" : "bg-background/95 backdrop-blur-md",
					scrolled && "shadow-sm",
				)}
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="relative flex h-16 items-center justify-between">
						{/* Logo */}
						<Link href={`/${locale}`} className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
							<Image
								src="/images/logo.webp"
								alt="Katrin Studio"
								width={140}
								height={67}
								className={cn("h-9 w-auto transition-all", transparent ? "invert" : "dark:invert")}
								priority
							/>
						</Link>

						{/* Desktop nav */}
						<nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className={cn(
										"text-sm transition-colors",
										transparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-foreground/80",
									)}
								>
									{link.label}
								</Link>
							))}
						</nav>

						{/* Desktop actions */}
						<div className="hidden items-center gap-2 md:flex">
							<LocaleSwitcher transparent={transparent} />
							<ThemeToggle transparent={transparent} />
							<Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium">
								<Link href={`/${locale}#contact`}>{t("bookClass")}</Link>
							</Button>
						</div>

						{/* Mobile: locale + theme only */}
						<div className="flex items-center gap-1 md:hidden">
							<LocaleSwitcher transparent={transparent} />
							<ThemeToggle transparent={transparent} />
						</div>
					</div>
				</div>
			</header>

			{/* Mobile bottom nav */}
			<nav className="bg-background/95 border-border fixed inset-x-0 bottom-0 z-40 flex items-center justify-around border-t backdrop-blur-md md:hidden">
				{navLinks.map(({ href, label, icon: Icon }) => (
					<Link
						key={href}
						href={href}
						className="text-muted-foreground hover:text-foreground flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors"
					>
						<Icon className="size-5" />
						{label}
					</Link>
				))}
				<Link
					href={`/${locale}#contact`}
					className="bg-accent text-accent-foreground hover:bg-accent/90 flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-semibold transition-colors"
				>
					<CalendarPlus className="size-5" />
					{t("bookClass")}
				</Link>
			</nav>
		</>
	);
}
