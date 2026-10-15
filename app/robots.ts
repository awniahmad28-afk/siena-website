import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

/** robots.txt: everything may be indexed; points search engines to the sitemap */
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE.url.replace(/\/$/, "")}/sitemap.xml` };
}
