import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { LOCALES, LOCALE_LIST } from "@/lib/i18n";

export const dynamic = "force-static";

const PAGES = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/work/", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/privacy/", priority: 0.2, changeFrequency: "yearly" as const },
];

/** sitemap.xml: every page in every language, each listing its other language versions
 *  (uses SITE.url, so it is correct once the domain is set at launch) */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const url = (code: (typeof LOCALE_LIST)[number], path: string) => `${base}${LOCALES[code].prefix}${path}`;
  return LOCALE_LIST.flatMap((code) =>
    PAGES.map((p) => ({
      url: url(code, p.path),
      changeFrequency: p.changeFrequency,
      priority: code === "en" ? p.priority : p.priority * 0.9,
      alternates: { languages: Object.fromEntries(LOCALE_LIST.map((l) => [LOCALES[l].lang, url(l, p.path)])) },
    })),
  );
}
