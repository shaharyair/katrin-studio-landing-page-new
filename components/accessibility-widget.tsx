"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAccessibility } from "@/hooks/use-accessibility";
import { cn } from "@/lib/utils";
import { AArrowDown, AArrowUp, ALargeSmall, Accessibility, Contrast, Eye, Link2, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";

export function AccessibilityWidget() {
	const t = useTranslations("accessibility");
	const { settings, increaseFontSize, decreaseFontSize, toggleHighContrast, toggleInvert, toggleGrayscale, toggleHighlightLinks, reset } =
		useAccessibility();

	return (
		<div className="fixed inset-s-6 bottom-6 z-50">
			<Popover>
				<PopoverTrigger asChild>
					<Button variant="outline" size="icon" className="size-12 rounded-full shadow-lg sm:size-14" aria-label={t("openWidget")}>
						<Accessibility className="size-6 sm:size-7" />
					</Button>
				</PopoverTrigger>

				<PopoverContent side="top" align="start" sideOffset={12} className="w-72 p-0">
					{/* Header */}
					<div className="flex items-center gap-2 px-4 py-3">
						<Accessibility className="text-muted-foreground size-4" />
						<span className="text-sm font-semibold">{t("title")}</span>
					</div>

					<Separator />

					<div className="flex flex-col gap-3 p-4">
						{/* Font size */}
						<div className="flex items-center justify-between">
							<span className="text-sm">{t("fontSize")}</span>
							<div className="flex items-center gap-1">
								<Button
									variant="ghost"
									size="icon-sm"
									onClick={decreaseFontSize}
									disabled={settings.fontSize === "normal"}
									aria-label={t("fontDecrease")}
								>
									<AArrowDown />
								</Button>
								<span className="text-muted-foreground w-16 text-center text-xs tabular-nums">{t(`fontSizeValue.${settings.fontSize}`)}</span>
								<Button
									variant="ghost"
									size="icon-sm"
									onClick={increaseFontSize}
									disabled={settings.fontSize === "xl"}
									aria-label={t("fontIncrease")}
								>
									<AArrowUp />
								</Button>
							</div>
						</div>

						{/* Toggle grid */}
						<div className="grid grid-cols-2 gap-2">
							<ToggleTile active={settings.highContrast} onToggle={toggleHighContrast} icon={<Contrast />} label={t("highContrast")} />
							<ToggleTile active={settings.invert} onToggle={toggleInvert} icon={<Eye />} label={t("invert")} />
							<ToggleTile active={settings.grayscale} onToggle={toggleGrayscale} icon={<ALargeSmall />} label={t("grayscale")} />
							<ToggleTile active={settings.highlightLinks} onToggle={toggleHighlightLinks} icon={<Link2 />} label={t("highlightLinks")} />
						</div>

						{/* Reset */}
						<Button variant="ghost" size="sm" className="text-muted-foreground w-full gap-2" onClick={reset}>
							<RefreshCcw className="size-3.5" />
							{t("reset")}
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}

function ToggleTile({ active, onToggle, icon, label }: { active: boolean; onToggle: () => void; icon: React.ReactNode; label: string }) {
	return (
		<button
			onClick={onToggle}
			aria-pressed={active}
			className={cn(
				"flex flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-3 text-xs font-medium transition-colors [&>svg]:size-5",
				active ? "border-accent bg-accent/10 text-accent-foreground" : "border-border bg-background hover:bg-surface",
			)}
		>
			{icon}
			{label}
		</button>
	);
}
