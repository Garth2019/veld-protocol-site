import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { INDEXABLE_ROUTES, SITE_URL, absoluteUrl, pageMetadata, sitemapEntries } from "./site.ts";

const APP_DIR = fileURLToPath(new URL("../app", import.meta.url));

/** Every route that has a page file, with route groups such as (showcase) removed. */
function pageRoutes(dir = APP_DIR) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return pageRoutes(full);
    if (!/^page\.(tsx|mdx?)$/.test(entry.name)) return [];
    const segments = relative(APP_DIR, dir)
      .split(sep)
      .filter((segment) => segment && !/^\(.*\)$/.test(segment));
    return [`/${segments.join("/")}`];
  });
}

test("every page route is listed as indexable, and nothing else is", () => {
  assert.deepEqual([...INDEXABLE_ROUTES].sort(), pageRoutes().sort());
});

test("absoluteUrl gives the home page no trailing slash and other pages their path", () => {
  assert.equal(absoluteUrl("/"), "https://veldprotocol.io");
  assert.equal(absoluteUrl("/privacy"), "https://veldprotocol.io/privacy");
});

test("sitemap lists each indexable route once, on the canonical host", () => {
  const urls = sitemapEntries(new Date("2026-11-10")).map((entry) => entry.url);

  assert.deepEqual(urls, INDEXABLE_ROUTES.map(absoluteUrl));
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.every((url) => url === SITE_URL || url.startsWith(`${SITE_URL}/`)));
});

test("sitemap keeps the home page at top priority and the blog on a weekly cadence", () => {
  const entries = sitemapEntries(new Date("2026-11-10"));
  const byUrl = (path) => entries.find((entry) => entry.url === absoluteUrl(path));

  assert.equal(byUrl("/").priority, 1);
  assert.equal(byUrl("/about").priority, 0.8);
  assert.equal(byUrl("/blog").changeFrequency, "weekly");
  assert.equal(byUrl("/about").changeFrequency, "monthly");
});

test("pageMetadata gives a page a self-referencing canonical and a matching og:url", () => {
  const metadata = pageMetadata("/about", { title: "About", description: "About us." });

  assert.equal(metadata.alternates.canonical, "https://veldprotocol.io/about");
  assert.equal(metadata.openGraph.url, metadata.alternates.canonical);
  assert.equal(metadata.title, "About");
  assert.equal(metadata.description, "About us.");
});

test("pageMetadata keeps the shared Open Graph fields a page would otherwise lose", () => {
  const { openGraph } = pageMetadata("/", { description: "Home." });

  assert.equal(openGraph.url, "https://veldprotocol.io");
  assert.equal(openGraph.siteName, "Veld Protocol");
  assert.equal(openGraph.type, "website");
  assert.deepEqual(openGraph.images, [{ url: "/og/veld-launch", width: 1200, height: 630 }]);
});
