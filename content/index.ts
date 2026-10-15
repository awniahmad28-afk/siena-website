/**
 * All site text for one language: getContent("en" | "ar" | "ku").
 * English is the source (content/site.ts, content/work.ts, content/eras.ts, content/ui.ts); Arabic and Kurdish
 * (content/locales/) translate the same pieces and are merged onto it, so ids, links, colours and timings stay shared.
 */
import type { Locale } from "@/lib/i18n";
import { ABOUT, CONTACT, HERO, REVEAL, SERVICES, SITE, SOLUTIONS, WHAT, WHY } from "@/content/site";
import { PROJECTS, WORK } from "@/content/work";
import { ERAS, WORKFLOW_STEPS, type Era } from "@/content/eras";
import { UI_EN, type UI } from "@/content/ui";
import { AR } from "@/content/locales/ar";
import { KU } from "@/content/locales/ku";

type ServiceText = { title: string; body: string; overview: string[]; result: string; workflow: string[] };
type EraText = { years?: string; railLabel: string; title: string; statement: string; lead?: string; beats?: string[]; keywords?: string[] };
type ProjectText = { title?: string; client?: string; summary?: string };

/** the shape of a translation (content/locales/*.ts) */
export type Translation = {
  site: { description: string; whatsappText: string };
  reveal: { kicker1: string; kicker2: string; lines: [string, string, string]; support: string; storyCta: string; storySecondary: string };
  about: { eyebrow: string; headline: string; paragraphs: string[]; services: { title: string; body: string }[] };
  whatHeadline: string;
  why: { eyebrow: string; headline: string; intro: string; points: { title: string; body: string }[] };
  solutions: { eyebrow: string; headline: string };
  services: Record<(typeof SERVICES)[number]["id"], ServiceText>;
  contact: { eyebrow: string; headline: string; body: string; cta: string };
  work: { eyebrow: string; headline: string; intro: string; empty: string };
  projects: Record<string, ProjectText>;
  eras: Record<string, EraText>;
  workflowSteps: string[];
  ui: UI;
};

function build(locale: Locale) {
  if (locale === "en") {
    return {
      locale,
      site: SITE,
      heroEyebrow: HERO.eyebrow,
      reveal: REVEAL,
      about: ABOUT,
      whatHeadline: WHAT.headline,
      why: WHY,
      solutions: { eyebrow: SOLUTIONS.eyebrow, headline: SOLUTIONS.headline },
      services: SERVICES.map((s) => ({ id: s.id, title: s.title, body: s.body, overview: [...s.overview], result: s.result, workflow: [...s.workflow] })),
      contact: CONTACT,
      work: WORK,
      projects: PROJECTS,
      eras: ERAS,
      workflowSteps: WORKFLOW_STEPS,
      ui: UI_EN,
    };
  }
  const t = locale === "ar" ? AR : KU;
  const services = SERVICES.map((s) => ({ id: s.id, ...t.services[s.id] }));
  return {
    locale,
    site: { ...SITE, ...t.site },
    heroEyebrow: HERO.eyebrow,
    reveal: {
      ...REVEAL,
      kicker1: t.reveal.kicker1,
      kicker2: t.reveal.kicker2,
      lines: REVEAL.lines.map((l, i) => ({ ...l, text: t.reveal.lines[i] })),
      support: t.reveal.support,
      storyCta: { ...REVEAL.storyCta, label: t.reveal.storyCta },
      storySecondary: { ...REVEAL.storySecondary, label: t.reveal.storySecondary },
    },
    about: t.about,
    whatHeadline: t.whatHeadline,
    why: t.why,
    solutions: t.solutions,
    services,
    contact: t.contact,
    work: t.work,
    projects: Object.fromEntries(Object.entries(PROJECTS).map(([k, v]) => [k, { ...v, ...t.projects[k] }])),
    /* the 2026 chapter's keywords are the six services */
    eras: ERAS.map((e): Era => ({ ...e, ...t.eras[e.id], keywords: t.eras[e.id]?.keywords ?? (e.id === "ai" ? services.map((s) => s.title) : e.keywords) })),
    workflowSteps: t.workflowSteps,
    ui: t.ui,
  };
}

const cache: Partial<Record<Locale, ReturnType<typeof build>>> = {};
export function getContent(locale: Locale) {
  return (cache[locale] ??= build(locale));
}
export type Content = ReturnType<typeof build>;
export type ServiceItem = Content["services"][number];
