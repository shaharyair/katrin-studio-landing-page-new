# Katrin Studio — Pilates & Fitness Website

Production website for **Katrin's Studio**, a Pilates reformer and fitness studio in Afula, Israel. Built with the latest Next.js 16 canary, React 19, and Tailwind CSS v4.

**Live site:** [katrin.co.il](https://katrin.co.il)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Language | TypeScript 5.9 (strict) |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui + Radix UI primitives |
| i18n | next-intl 4 — Hebrew (RTL) + English (LTR) |
| Content | MDX via next-mdx-remote + gray-matter |
| Forms | React Hook Form + Zod v4 |
| Theming | next-themes (dark / light / system) |
| Fonts | Geist (variable, via next/font) |
| Linting | ESLint 9 + Prettier + Biome |
| Pre-commit | Husky + lint-staged |

---

## Features

### Internationalization
- Full **Hebrew and English** support with automatic RTL/LTR layout switching
- `hreflang` tags, `x-default` canonical, and locale-aware Open Graph metadata
- All copy managed through structured JSON translation files

### Blog
- **26 MDX blog posts** (13 Hebrew, 13 English) on Pilates, fitness, and wellness
- Static generation at build time — zero client-side data fetching
- Per-post Article JSON-LD schema with `datePublished` and author

### SEO
- `robots.ts` and `sitemap.ts` covering all static + dynamic routes
- LocalBusiness JSON-LD schema (hours, coordinates, address, social links)
- Locale-aware canonical URLs and Open Graph tags on every page
- Sanitized JSON-LD rendering to prevent script injection

### Performance
- All images in **WebP** format with `next/image` optimization
- React Server Components by default — client components only where needed
- `min-h-svh` hero for correct mobile viewport height
- Scroll-adaptive navbar (transparent on hero, solid on scroll)

### UX
- **Mobile bottom navigation bar** — no hamburger, instant access to all sections
- Floating WhatsApp + Instagram CTAs (positioned clear of mobile nav)
- Smooth hash-scroll navigation
- Contact form with server action, Zod validation, and toast feedback
- Dark / light theme toggle with system preference detection

---

## Project Structure

```
├── app/
│   ├── [locale]/           # Locale-scoped pages (he / en)
│   │   ├── layout.tsx      # Per-locale metadata, JSON-LD, providers
│   │   ├── page.tsx        # Home page
│   │   └── blog/
│   │       ├── page.tsx    # Blog listing
│   │       └── [slug]/     # Individual posts
│   ├── actions/
│   │   └── contact.ts      # Server action for contact form
│   ├── robots.ts           # Dynamic robots.txt
│   └── sitemap.ts          # Dynamic sitemap
├── components/
│   ├── ui/                 # shadcn/ui base components
│   ├── navbar.tsx          # Scroll-adaptive navbar + mobile bottom nav
│   ├── hero.tsx            # Full-screen hero with accent name highlight
│   ├── services.tsx
│   ├── about.tsx
│   ├── testimonials.tsx
│   ├── contact-section.tsx
│   ├── floating-buttons.tsx
│   └── footer.tsx
├── content/
│   └── blog/
│       ├── en/             # 13 English MDX posts
│       └── he/             # 13 Hebrew MDX posts
├── messages/
│   ├── en.json             # English translations
│   └── he.json             # Hebrew translations
├── lib/
│   ├── studio-config.ts    # Centralized studio info (URLs, address, coords)
│   ├── blog.ts             # MDX parsing utilities
│   └── utils.ts            # cn() helper
└── i18n/
    ├── routing.ts          # next-intl locale routing config
    └── request.ts          # Server-side locale resolution
```

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root redirects to `/he` (Hebrew) by default.

---

## Notable Implementation Details

**Next.js 16 + React 19** — Uses the canary release with async params, the React Compiler Babel plugin, and React 19 APIs throughout.

**Tailwind v4** — CSS-first configuration via `@theme inline` in `globals.css` instead of `tailwind.config.js`. Custom CSS variables wire up the full design token system including dark mode overrides.

**RTL layout** — A single `dir` attribute on `<html>` combined with Tailwind's logical properties (`ms-`, `me-`, `ps-`, `pe-`, `inset-s-`, `inset-e-`) handles all RTL/LTR layout differences without duplicating styles.

**Canonical URLs** — Each locale page declares its own canonical (`/he` or `/en`) rather than pointing all pages to one locale, ensuring both language versions are independently indexable by search engines.

**Mobile nav** — Replaced the conventional hamburger + drawer pattern with a persistent bottom tab bar. With only 4 nav destinations, the bottom bar provides zero-tap navigation versus two taps for a drawer — a meaningful UX improvement on mobile.

---

## License

Private — all rights reserved. Studio branding and content belong to Katrin Yair.
