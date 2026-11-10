import type { Metadata, MetadataRoute } from "next";

/** The one canonical origin. www and http variants must never appear in canonicals, og:url or the sitemap. */
export const SITE_URL = "https://veldprotocol.io";
export const SITE_NAME = "Veld Protocol";

export const SITE_DESCRIPTION =
  "Veld — the open settlement layer for autonomous agents. Discover, negotiate, escrow in USDC, settle on-chain, and carry portable reputation.";

/**
 * Every indexable page. The sitemap is generated from this list, and site.test.mjs
 * fails if a page file is added under src/app without being listed here.
 */
export const INDEXABLE_ROUTES = [
  "/",
  "/how-it-works",
  "/developers",
  "/protocol",
  "/about",
  "/blog",
  "/privacy",
  "/cookies",
] as const;

export type IndexableRoute = (typeof INDEXABLE_ROUTES)[number];

const WEEKLY_ROUTES: readonly IndexableRoute[] = ["/blog"];

/** Open Graph fields every page shares. Next replaces `openGraph` wholesale, so each page must restate them. */
const SHARED_OPEN_GRAPH = {
  type: "website",
  locale: "en_GB",
  siteName: SITE_NAME,
  title: "Veld — Agents that transact for real",
  description: SITE_DESCRIPTION,
  images: [{ url: "/og/veld-launch", width: 1200, height: 630 }],
} as const;

export function absoluteUrl(route: IndexableRoute): string {
  return route === "/" ? SITE_URL : `${SITE_URL}${route}`;
}

/** Page metadata with a self-referencing canonical and an og:url equal to it. */
export function pageMetadata(
  route: IndexableRoute,
  meta: Pick<Metadata, "title" | "description">,
): Metadata {
  const url = absoluteUrl(route);
  return {
    ...meta,
    alternates: { canonical: url },
    openGraph: { ...SHARED_OPEN_GRAPH, images: [...SHARED_OPEN_GRAPH.images], url },
  };
}

export function sitemapEntries(lastModified: Date): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((route) => ({
    url: absoluteUrl(route),
    lastModified,
    changeFrequency: WEEKLY_ROUTES.includes(route) ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
