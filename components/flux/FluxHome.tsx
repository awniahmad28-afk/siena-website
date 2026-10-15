import "@fontsource-variable/jetbrains-mono/wght.css";
import type { ReactNode } from "react";
import { getContent } from "@/content/index";
import type { Locale } from "@/lib/i18n";
import { Genesis, type CursorStyle, type GenesisPalette } from "@/components/genesis/Genesis";
import { Spotlight } from "@/components/genesis/Spotlight";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { FluxWhat } from "@/components/flux/FluxWhat";
import { FluxWhy } from "@/components/flux/FluxWhy";
import { FluxContact } from "@/components/flux/FluxContact";
import { FluxFooter } from "@/components/flux/FluxFooter";
import { Counters, Reveal } from "@/components/flux/Reveal";
import { SolutionsTide } from "@/components/flux/SolutionsTide";
import { LogoInterlude } from "@/components/flux/LogoInterlude";
import { SmoothScroll } from "@/components/flux/SmoothScroll";
import { EvolutionLink, type EvoVariant } from "@/components/flux/EvolutionLink";
import s from "@/app/home.module.css";

const PALETTE: GenesisPalette = {
  dots: ["#33e1ff", "#7aa2ff", "#ff4fd8", "#e6f7ff"],
  link: "#33e1ff",
  linkAlpha: 0.75,
  pulse: "#ff4fd8",
  flow: "#33e1ff",
  trace: ["#ff4fd8", "#33e1ff", "#7aa2ff"],
};

/**
 * The Genesis Flux homepage. `solutions` replaces the solutions section (used by design previews);
 * by default it is the Tide wheel (SolutionsTide). `core` is the visual after the About text (logo-interlude previews); by default it is the Light Sweep. Keep the section id "solutions" so the header and footer links work.
 */
export function FluxHome({ locale = "en", solutions, core, cursor = "glow", evo = "ring" }: { locale?: Locale; solutions?: ReactNode; core?: ReactNode; cursor?: CursorStyle; evo?: EvoVariant }) {
  const c = getContent(locale);
  const h = c.ui.hero;
  return (
    <div className={s.page}>
      <SmoothScroll />
      <Reveal />
      <Counters />
      <Spotlight />
      <FluxHeader s={s} />

      <main id="top">
        <Genesis
          variant="flux"
          palette={PALETTE}
          logoTail="#ff4fd8"
          coords={false}
          cursor={cursor}
          corner={<EvolutionLink variant={evo} />}
          stages={h.stages}
          backdrop={
            <div className={s.backdrop} aria-hidden="true">
              <div className={s.haze} />
              <div className={s.scan} />
            </div>
          }
          intro={
            <>
              <p className={s.kicker}>[ {c.heroEyebrow} ]</p>
              <h1 className={s.h1}>
                <span className={s.glitch} data-text={h.titleA}>{h.titleA}</span><br />
                <em>{h.titleB}</em>
              </h1>
              <p className={s.cue}>{h.cue} <span aria-hidden="true">↓</span></p>
            </>
          }
          outro={
            <>
              <p className={s.kicker}>[ {h.outroKicker} ]</p>
              <h2 className={s.outroTitle}>{h.outroA} <em>{h.outroB}</em></h2>
              <p className={s.lead}>{c.whatHeadline}</p>
              <div className={s.ctas}>
                <a href="#contact" className={s.btn} data-magnet="">{c.ui.startProject}</a>
                <a href="#solutions" className={s.btnGhost}>{h.explore}</a>
              </div>
            </>
          }
        />

        <FluxWhat s={s} locale={locale} core={core ?? <LogoInterlude variant="sweep" />} />

        {solutions ?? <SolutionsTide />}

        <FluxWhy s={s} />
        <FluxContact s={s} />
      </main>
      <FluxFooter s={s} locale={locale} />
    </div>
  );
}
