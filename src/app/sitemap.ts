import type { MetadataRoute } from "next";

const BASE_URL = "https://veldprotocol.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/how-it-works",
    "/developers",
    "/protocol",
    "/about",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
