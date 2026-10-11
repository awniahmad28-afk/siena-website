import type { EvoVariant } from "@/components/flux/EvolutionLink";

/** Subtle "Explore the Evolution" buttons for the hero's top-right corner (a preview set of their own). */
export const EVO_DESIGNS: { v: EvoVariant; n: string; name: string; mood: string; text: string; swatch: string[] }[] = [
  { v: "pill", n: "1", name: "Glass Pill", mood: "Clean · familiar", text: "A small frosted pill reading “Explore the Evolution →” with a tiny cyan dot that softly pings, like a live indicator.", swatch: ["#03050d", "#33e1ff", "#e8f6ff"] },
  { v: "ring", n: "2", name: "Play Ring", mood: "Cinematic · inviting", text: "A small play button inside a thin, slowly turning cyan arc, with the label beside it. Suggests “watch the story”.", swatch: ["#03050d", "#33e1ff", "#7f93b3"] },
  { v: "text", n: "3", name: "Bracket Link", mood: "Minimal · editorial", text: "Just text: [ Explore the Evolution ], with a short cyan-to-pink underline that stretches across on hover.", swatch: ["#03050d", "#33e1ff", "#ff4fd8"] },
  { v: "timeline", n: "4", name: "Mini Timeline", mood: "Story · on theme", text: "A tiny 1900 → 2035 line with a dot travelling along it, and “Explore the Evolution →” underneath. Hints at the journey.", swatch: ["#03050d", "#7f93b3", "#33e1ff"] },
  { v: "mark", n: "5", name: "SIENA Mark", mood: "Branded · quiet", text: "The small SIENA symbol with “Story · The Evolution” beside it. The S tilts slightly on hover.", swatch: ["#03050d", "#2f7bff", "#ff4fd8"] },
];
