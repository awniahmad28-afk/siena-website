import { asset } from "@/lib/asset";

/** The site's languages. English lives at the root (/), the others under their own prefix (/ar/, /ku/). */
export type Locale = "en" | "ar" | "ku";

export const LOCALES: Record<Locale, { label: string; short: string; lang: string; dir: "ltr" | "rtl"; prefix: string }> = {
  en: { label: "English", short: "EN", lang: "en", dir: "ltr", prefix: "" },
  ar: { label: "العربية", short: "AR", lang: "ar", dir: "rtl", prefix: "/ar" },
  /* Kurdish (Sorani / Central Kurdish), written in Arabic script */
  ku: { label: "کوردی", short: "KU", lang: "ckb", dir: "rtl", prefix: "/ku" },
};

export const LOCALE_LIST: Locale[] = ["en", "ar", "ku"];

/** a page path in a given language, with the site's base path: href("ar", "/work/") → "/ar/work/" */
export const href = (locale: Locale, path = "/") => asset(`${LOCALES[locale].prefix}${path}`);
