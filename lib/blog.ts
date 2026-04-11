import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type BlogPost = {
	slug: string;
	title: string;
	description: string;
	date: string;
	author: string;
	tag: string;
	content: string;
};

function blogDir(locale: string) {
	return path.join(process.cwd(), "content/blog", locale);
}

export function getAllPosts(locale: string): Omit<BlogPost, "content">[] {
	const dir = blogDir(locale);
	if (!fs.existsSync(dir)) return [];

	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

	return files
		.map((file) => {
			const slug = file.replace(/\.mdx$/, "");
			const raw = fs.readFileSync(path.join(dir, file), "utf-8");
			const { data } = matter(raw);

			return {
				slug,
				title: data.title as string,
				description: data.description as string,
				date: data.date as string,
				author: data.author as string,
				tag: data.tag as string,
			};
		})
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(locale: string, slug: string): BlogPost | null {
	const filePath = path.join(blogDir(locale), `${slug}.mdx`);

	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(raw);

	return {
		slug,
		title: data.title as string,
		description: data.description as string,
		date: data.date as string,
		author: data.author as string,
		tag: data.tag as string,
		content,
	};
}

export function getAllSlugs(locale: string): string[] {
	const dir = blogDir(locale);
	if (!fs.existsSync(dir)) return [];

	return fs
		.readdirSync(dir)
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => f.replace(/\.mdx$/, ""));
}
