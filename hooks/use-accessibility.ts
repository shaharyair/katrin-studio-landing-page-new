"use client";

import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

export type FontSize = "normal" | "lg" | "xl";

export interface AccessibilitySettings {
	fontSize: FontSize;
	highContrast: boolean;
	invert: boolean;
	grayscale: boolean;
	highlightLinks: boolean;
}

export const DEFAULT_SETTINGS: AccessibilitySettings = {
	fontSize: "normal",
	highContrast: false,
	invert: false,
	grayscale: false,
	highlightLinks: false,
};

const STORAGE_KEY = "a11y-settings";
const FONT_CYCLE: FontSize[] = ["normal", "lg", "xl"];

function applyClasses(s: AccessibilitySettings): void {
	const h = document.documentElement;
	h.classList.remove("a11y-font-lg", "a11y-font-xl");
	if (s.fontSize === "lg") h.classList.add("a11y-font-lg");
	if (s.fontSize === "xl") h.classList.add("a11y-font-xl");
	h.classList.toggle("a11y-contrast", s.highContrast);
	h.classList.toggle("a11y-invert", s.invert);
	h.classList.toggle("a11y-grayscale", s.grayscale);
	h.classList.toggle("a11y-links", s.highlightLinks);
}

export function useAccessibility() {
	const [settings, setSettings, removeSettings] = useLocalStorage(STORAGE_KEY, DEFAULT_SETTINGS);

	useEffect(() => {
		applyClasses(settings);
	}, [settings]);

	return {
		settings,
		increaseFontSize: () =>
			setSettings((s) => ({
				...s,
				fontSize: FONT_CYCLE[Math.min(FONT_CYCLE.indexOf(s.fontSize) + 1, FONT_CYCLE.length - 1)],
			})),
		decreaseFontSize: () =>
			setSettings((s) => ({
				...s,
				fontSize: FONT_CYCLE[Math.max(FONT_CYCLE.indexOf(s.fontSize) - 1, 0)],
			})),
		toggleHighContrast: () => setSettings((s) => ({ ...s, highContrast: !s.highContrast })),
		toggleInvert: () => setSettings((s) => ({ ...s, invert: !s.invert })),
		toggleGrayscale: () => setSettings((s) => ({ ...s, grayscale: !s.grayscale })),
		toggleHighlightLinks: () => setSettings((s) => ({ ...s, highlightLinks: !s.highlightLinks })),
		reset: () => {
			removeSettings();
			applyClasses(DEFAULT_SETTINGS);
		},
	};
}
