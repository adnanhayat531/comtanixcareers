import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

const routes = [
  "/",
  "/about",
  "/careers",
  "/life",
  "/apply",
  "/submit-cv",
  "/contact",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((path) => ({
    url: `${SITE.url}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
