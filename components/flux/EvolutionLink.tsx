"use client";
import { openStory } from "@/lib/story";
import { TailSymbol } from "./TailSymbol";
import v from "./evoLink.module.css";

export type EvoVariant = "pill" | "ring" | "text" | "timeline" | "mark";

/**
 * Subtle "Explore the Evolution" openers for the hero's top-right corner. Each opens the full-screen Evolution story.
 * pill: a small glass pill with a softly pulsing dot · ring: a small play button inside a slowly turning arc ·
 * text: a bracketed text link that underlines itself · timeline: a tiny 1900 → 2035 line with a travelling dot ·
 * mark: the SIENA symbol with the label beside it.
 */
export function EvolutionLink({ variant }: { variant: EvoVariant }) {
  return (
    <button
      type="button"
      className={v.btn}
      data-v={variant}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={() => openStory()}
      aria-label="Explore the Evolution"
    >
      {variant === "pill" && (<><span className={v.dot} aria-hidden="true" /><span>Explore the Evolution</span><span className={v.arrow} aria-hidden="true">→</span></>)}
      {variant === "ring" && (
        <>
          <span className={v.label}>Explore the<br />Evolution</span>
          <span className={v.ringWrap} aria-hidden="true">
            <svg viewBox="0 0 40 40" className={v.arc}><circle cx="20" cy="20" r="18" /></svg>
            <svg viewBox="0 0 24 24" className={v.play}><path d="M9 7l8 5-8 5z" /></svg>
          </span>
        </>
      )}
      {variant === "text" && (<span className={v.text}><span className={v.br}>[</span> Explore the Evolution <span className={v.br}>]</span></span>)}
      {variant === "timeline" && (
        <>
          <span className={v.line} aria-hidden="true"><i>1900</i><b><em /></b><i>2035</i></span>
          <span className={v.small}>Explore the Evolution →</span>
        </>
      )}
      {variant === "mark" && (<><TailSymbol className={v.sym} sizes="28px" /><span className={v.markText}><small>Story</small>The Evolution</span></>)}
    </button>
  );
}
