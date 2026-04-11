import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
	reactCompiler: true,
	pageExtensions: ["ts", "tsx", "mdx"],
	images: { qualities: [75, 80, 85] },
};

export default withNextIntl(withMDX(nextConfig));
