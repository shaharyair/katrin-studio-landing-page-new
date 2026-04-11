import { BlogCard } from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
	params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "blog" });

	return {
		title: t("title"),
		description: t("subtitle"),
		alternates: {
			canonical: `https://katrin.co.il/${locale}/blog`,
		},
		openGraph: {
			title: t("title"),
			description: t("subtitle"),
			url: `https://katrin.co.il/${locale}/blog`,
			images: ["https://katrin.co.il/images/studio/studio-1.webp"],
		},
	};
}

export default async function BlogListPage({ params }: Props) {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "blog" });
	const posts = getAllPosts(locale);

	return (
		<div className="bg-background min-h-screen px-4 pt-24 pb-20 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-7xl">
				{/* Header */}
				<div className="mb-16 text-center">
					<Badge variant="outline" className="border-accent/40 text-accent mb-4">
						Blog
					</Badge>
					<h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
					<p className="text-muted-foreground mx-auto max-w-2xl text-lg">{t("subtitle")}</p>
				</div>

				{/* Posts grid */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{posts.map((post) => (
						<BlogCard
							key={post.slug}
							slug={post.slug}
							title={post.title}
							description={post.description}
							date={post.date}
							tag={post.tag}
							locale={locale}
							readMore={t("readMore")}
							publishedOn={t("publishedOn")}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
