import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { FluxFooter } from "@/components/flux/FluxFooter";
import { SmoothScroll } from "@/components/flux/SmoothScroll";
import { WorkGallery } from "@/components/flux/WorkGallery";
import { WORK } from "@/content/work";
import { getWork } from "@/lib/work.server";
import s from "@/app/home.module.css";
import w from "@/components/flux/work.module.css";

export const metadata: Metadata = {
  title: "Our Work | SIENA — AI Solutions & Systems",
  description: WORK.intro,
};

/** Our Work: pictures and videos of delivered projects, grouped by service (folders in public/work/). */
export default function WorkPage() {
  return (
    <div className={s.page}>
      <SmoothScroll />
      <FluxHeader s={s} page="work" />
      <main id="top" className={w.main}>
        <header className={w.head}>
          <p className={w.eyebrow}>{WORK.eyebrow}</p>
          <h1 className={w.title}>{WORK.headline}</h1>
          <p className={w.intro}>{WORK.intro}</p>
        </header>
        <WorkGallery categories={getWork()} empty={WORK.empty} />
      </main>
      <FluxFooter s={s} page="work" />
    </div>
  );
}
