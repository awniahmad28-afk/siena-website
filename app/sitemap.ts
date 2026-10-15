import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

/** sitemap.xml: the pages Google should know about (uses SITE.url, so it is correct once the domain is set at launch) */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/work/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
