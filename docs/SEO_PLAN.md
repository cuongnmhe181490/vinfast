# SEO Plan

## Technical SEO

- Next.js App Router metadata per page.
- Canonical URL in `buildPageMetadata`.
- Open Graph and Twitter Card metadata.
- Native `sitemap.ts` and `robots.ts`, plus `next-sitemap.config.js` for future generation.
- JSON-LD for WebSite, Product, BreadcrumbList, FAQPage and Article.
- One H1 per route.
- Vietnamese content with short English slugs.

## Content SEO

- Each vehicle has a landing page at `/cars/[slug]`.
- Blog cluster covers comparison, family needs, ADAS and EV range interpretation.
- Internal links connect blog posts to related vehicle detail pages.
- Technical pages link conceptually to car specs and source-backed fields.

## Core Web Vitals

- 3D viewer is client-loaded with fallback.
- Hero keeps key text in server-rendered page shell.
- No official images or heavy 3D files are bundled in phase 1.
- Future production assets should use GLB/GLTF, Draco and KTX2.
