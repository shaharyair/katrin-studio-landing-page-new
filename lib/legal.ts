import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type LegalPage = {
	slug: string;
	title: string;
	description: string;
	lastUpdated: string;
	content: string;
};

function legalDir(locale: string) {
	return path.join(process.cwd(), "content/legal", locale);
}

export function getLegalPage(locale: string, slug: string): LegalPage | null {
	const filePath = path.join(legalDir(locale), `${slug}.mdx`);

	if (!fs.existsSync(filePath)) return null;

	const raw = fs.readFileSync(filePath, "utf-8");
	const { data, content } = matter(raw);

	return {
		slug,
		title: data.title as string,
		description: data.description as string,
		lastUpdated: data.lastUpdated as string,
		content,
	};
}
