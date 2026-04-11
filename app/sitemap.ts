import { getAllSlugs } from "@/lib/blog";
import type { MetadataRoute } from "next";

const BASE_URL = "https://katrin.co.il";
const locales = ["en", "he"];

export default function sitemap(): MetadataRoute.Sitemap {
	const staticPages = locales.flatMap((locale) => [
		{
			url: `${BASE_URL}/${locale}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1,
		},
		{
			url: `${BASE_URL}/${locale}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
	]);

	const blogPages = locales.flatMap((locale) =>
		getAllSlugs(locale).map((slug) => ({
			url: `${BASE_URL}/${locale}/blog/${slug}`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		})),
	);

	return [...staticPages, ...blogPages];
}
