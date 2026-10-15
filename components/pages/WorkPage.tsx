import "@fontsource-variable/jetbrains-mono/wght.css";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { FluxFooter } from "@/components/flux/FluxFooter";
import { SmoothScroll } from "@/components/flux/SmoothScroll";
import { WorkGallery } from "@/components/flux/WorkGallery";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getContent } from "@/content/index";
import { getWork } from "@/lib/work.server";
import { LOCALES, type Locale } from "@/lib/i18n";
import s from "@/app/home.module.css";
import w from "@/components/flux/work.module.css";

/** Our Work: pictures and videos of delivered projects, grouped by service (folders in public/work/). */
export function WorkPage({ locale }: { locale: Locale }) {
  const { work } = getContent(locale);
  return (
    <LocaleProvider locale={locale}>
      <div className={s.page} dir={LOCALES[locale].dir} lang={LOCALES[locale].lang}>
        <SmoothScroll />
        <FluxHeader s={s} page="work" />
        <main id="top" className={w.main}>
          <header className={w.head}>
            <p className={w.eyebrow}>{work.eyebrow}</p>
            <h1 className={w.title}>{work.headline}</h1>
            <p className={w.intro}>{work.intro}</p>
          </header>
          <WorkGallery categories={getWork(locale)} empty={work.empty} />
        </main>
        <FluxFooter s={s} page="work" locale={locale} />
      </div>
    </LocaleProvider>
  );
}
