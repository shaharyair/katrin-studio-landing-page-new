import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
	params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
	const locales = ["he", "en"];
	return locales.flatMap((locale) => getAllSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const post = getPostBySlug(locale, slug);

	if (!post) return {};

	return {
		title: post.title,
		description: post.description,
		alternates: {
			canonical: `https://katrin.co.il/${locale}/blog/${slug}`,
		},
		openGraph: {
			title: post.title,
			description: post.description,
			url: `https://katrin.co.il/${locale}/blog/${slug}`,
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			images: ["https://katrin.co.il/images/studio/studio-1.webp"],
		},
	};
}

export default async function BlogPostPage({ params }: Props) {
	const { locale, slug } = await params;
	const t = await getTranslations({ locale, namespace: "blog" });
	const post = getPostBySlug(locale, slug);

	if (!post) notFound();

	const formatted = new Date(post.date).toLocaleDateString(locale === "he" ? "he-IL" : "en-US", { year: "numeric", month: "long", day: "numeric" });

	const articleJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		headline: post.title,
		description: post.description,
		datePublished: post.date,
		author: {
			"@type": "Person",
			name: post.author,
		},
		publisher: {
			"@type": "Organization",
			name: "Katrin Studio",
			url: "https://katrin.co.il",
		},
	};

	return (
		<>
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }} />

			<div className="bg-background min-h-screen px-4 pt-24 pb-20 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					{/* Back link */}
					<Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground -ms-2 mb-8">
						<Link href={`/${locale}/blog`}>
							<ArrowLeft className="me-1 size-4" />
							{t("backToBlog")}
						</Link>
					</Button>

					{/* Header */}
					<header className="mb-10">
						<Badge variant="outline" className="border-accent/30 text-accent mb-4">
							{post.tag}
						</Badge>
						<h1 className="mb-4 text-4xl leading-tight font-bold tracking-tight sm:text-5xl">{post.title}</h1>
						<p className="text-muted-foreground">
							{t("publishedOn")} {formatted} · {post.author}
						</p>
					</header>

					<Separator className="mb-10" />

					{/* MDX content */}
					<article className="prose prose-neutral dark:prose-invert prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground max-w-none">
						<MDXRemote source={post.content} />
					</article>

					<Separator className="my-12" />

					{/* CTA */}
					<div className="bg-surface border-border rounded-2xl border p-8 text-center">
						<h3 className="mb-3 text-2xl font-bold">{t("ctaTitle")}</h3>
						<p className="text-muted-foreground mb-6">{t("ctaBody")}</p>
						<Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
							<Link href={`/${locale}#contact`}>{t("ctaButton")}</Link>
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
