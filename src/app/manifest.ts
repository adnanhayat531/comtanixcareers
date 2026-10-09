import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#E8F5F6",
    theme_color: "#49A4AE",
    lang: "en",
    categories: ["business", "productivity"],
  };
}
