"use client";
import { useEffect, useState } from "react";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getContent } from "@/content/index";
import { BASE_PATH } from "@/lib/asset";
import { LOCALES, href, type Locale } from "@/lib/i18n";
import s from "@/app/home.module.css";

/** One 404 page serves every language (GitHub Pages has a single 404.html): the address picks the language. */
export function NotFoundPage() {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const m = window.location.pathname.slice(BASE_PATH.length).match(/^\/(ar|ku)(\/|$)/);
    if (m) setLocale(m[1] as Locale);
  }, []);
  useEffect(() => {
    document.documentElement.lang = LOCALES[locale].lang;
    document.documentElement.dir = LOCALES[locale].dir;
  }, [locale]);
  const { ui } = getContent(locale);
  const t = ui.notFound;
  return (
    <LocaleProvider locale={locale}>
      <div className={s.page} dir={LOCALES[locale].dir} lang={LOCALES[locale].lang}>
        <FluxHeader s={s} page="other" />
        <main id="top" className={s.notFound}>
          <p className={s.eyebrow}>{t.eyebrow}</p>
          <h1 className={s.h1}>{t.titleA} <em>{t.titleB}</em></h1>
          <p className={s.lead}>{t.lead}</p>
          <div className={s.ctas}>
            <a href={href(locale, "/")} className={s.btn}>{t.home}</a>
            <a href={href(locale, "/work/")} className={s.btnGhost}>{t.work}</a>
            <a href={`${href(locale, "/")}#contact`} className={s.btnGhost}>{ui.startProject}</a>
          </div>
        </main>
      </div>
    </LocaleProvider>
  );
}
