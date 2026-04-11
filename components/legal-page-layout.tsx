import { Separator } from "@/components/ui/separator";
import { MDXRemote } from "next-mdx-remote/rsc";

type Props = {
	title: string;
	lastUpdated: string;
	lastUpdatedLabel: string;
	content: string;
};

export function LegalPageLayout({ title, lastUpdated, lastUpdatedLabel, content }: Props) {
	const formatted = new Date(lastUpdated).toLocaleDateString("he-IL", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<div className="bg-background min-h-screen px-4 pt-24 pb-20 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-3xl">
				<header className="mb-8">
					<h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
					<p className="text-muted-foreground text-sm">
						{lastUpdatedLabel}: {formatted}
					</p>
				</header>

				<Separator className="mb-10" />

				<article className="prose prose-neutral dark:prose-invert prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground max-w-none">
					<MDXRemote source={content} />
				</article>
			</div>
		</div>
	);
}
