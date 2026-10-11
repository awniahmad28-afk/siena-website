import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { FluxFooter } from "@/components/flux/FluxFooter";
import { SmoothScroll } from "@/components/flux/SmoothScroll";
import { WorkGrid } from "@/components/flux/WorkGrid";
import { WORK } from "@/content/work";
import s from "@/app/home.module.css";
import w from "@/components/flux/work.module.css";

export const metadata: Metadata = {
  title: "Our Work | SIENA — AI Solutions & Systems",
  description: WORK.intro,
};

/** Our Work: the projects SIENA has delivered (content/work.ts). */
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
        <WorkGrid />
      </main>
      <FluxFooter s={s} page="work" />
    </div>
  );
}
