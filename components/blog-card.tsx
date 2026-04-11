import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type BlogCardProps = {
	title: string;
	description: string;
	date: string;
	slug: string;
	tag: string;
	locale: string;
	readMore: string;
	publishedOn: string;
};

export function BlogCard({ title, description, date, slug, tag, locale, readMore, publishedOn }: BlogCardProps) {
	const formatted = new Date(date).toLocaleDateString(locale === "he" ? "he-IL" : "en-US", { year: "numeric", month: "long", day: "numeric" });

	return (
		<Link href={`/${locale}/blog/${slug}`} className="group block h-full">
			<Card className="bg-card border-border hover:border-accent/50 hover:shadow-accent/10 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
				<CardHeader className="pb-3">
					<Badge variant="outline" className="border-accent/30 text-accent mb-3 w-fit text-xs">
						{tag}
					</Badge>
					<h3 className="group-hover:text-accent line-clamp-2 text-lg leading-snug font-semibold transition-colors">{title}</h3>
					<p className="text-muted-foreground text-xs">
						{publishedOn} {formatted}
					</p>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">{description}</p>
					<div className="text-accent flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2">
						{readMore}
						<ArrowRight className="size-4" />
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}
