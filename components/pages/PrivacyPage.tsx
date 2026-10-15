import "@fontsource-variable/jetbrains-mono/wght.css";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { FluxFooter } from "@/components/flux/FluxFooter";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getContent } from "@/content/index";
import { LOCALES, type Locale } from "@/lib/i18n";
import s from "@/app/home.module.css";

/** Plain-language privacy note: what the contact form collects and what the site does not do. */
export function PrivacyPage({ locale }: { locale: Locale }) {
  const { ui, site } = getContent(locale);
  const p = ui.privacy;
  return (
    <LocaleProvider locale={locale}>
      <div className={s.page} dir={LOCALES[locale].dir} lang={LOCALES[locale].lang}>
        <FluxHeader s={s} page="privacy" />
        <main id="top" className={s.legal}>
          <p className={s.eyebrow}>{p.eyebrow}</p>
          <h1 className={s.legalTitle}>{p.title}</h1>
          <p className={s.legalDate}>{p.updated}</p>
          {p.sections.map((sec) => (
            <section key={sec.h}>
              <h2>{sec.h}</h2>
              <p>{sec.p}</p>
            </section>
          ))}
          <h2>{p.keepH}</h2>
          <p>
            {p.keepBefore} <a href={`mailto:${site.contactEmail}`} dir="ltr">{site.contactEmail}</a> {p.keepAfter}
          </p>
        </main>
        <FluxFooter s={s} page="privacy" locale={locale} />
      </div>
    </LocaleProvider>
  );
}
