import type { Metadata } from "next";
import { getContent } from "@/content/index";
import { LOCALES, LOCALE_LIST, href, type Locale } from "@/lib/i18n";
import { asset } from "@/lib/asset";

type Kind = "home" | "work" | "privacy";
const PATH: Record<Kind, string> = { home: "/", work: "/work/", privacy: "/privacy/" };

/** title, description, share card and the links between the language versions of a page */
export function pageMeta(locale: Locale, kind: Kind): Metadata {
  const c = getContent(locale);
  const title = kind === "home" ? c.ui.meta.homeTitle : kind === "work" ? c.ui.meta.workTitle : c.ui.meta.privacyTitle;
  const description = kind === "home" ? c.site.description : kind === "work" ? c.work.intro : c.ui.meta.privacyDesc;
  return {
    title,
    description,
    alternates: {
      canonical: href(locale, PATH[kind]),
      languages: { ...Object.fromEntries(LOCALE_LIST.map((l) => [LOCALES[l].lang, href(l, PATH[kind])])), "x-default": href("en", PATH[kind]) },
    },
    openGraph: {
      title,
      description,
      locale: locale === "en" ? "en_US" : locale === "ar" ? "ar_IQ" : "ckb_IQ",
      images: [{ url: asset("/brand/og.jpg"), width: 1200, height: 630, alt: "SIENA Solutions" }],
      type: "website",
    },
  };
}
