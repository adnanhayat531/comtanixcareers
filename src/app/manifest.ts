import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F3F9FA",
    theme_color: "#2A7A85",
    lang: "en",
    categories: ["business", "productivity"],
  };
}
