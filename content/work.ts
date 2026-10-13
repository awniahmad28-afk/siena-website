/**
 * Our Work (/work) — the page text and the project descriptions. The pictures and videos come straight from folders:
 *
 *   public/work/apps/         public/work/websites/     public/work/agents/
 *   public/work/automation/   public/work/systems/      public/work/marketing/
 *
 * A PROJECT is a sub-folder (e.g. public/work/websites/dolce-aesthetic-clinic/). Its first picture is the cover, its
 * first video plays on the card, and every picture and video in it opens in the project viewer, in file-name order.
 * The file name becomes the caption: "05-services.jpg" → "Services". A video's cover is a picture with the same name
 * (tour.mp4 + tour.jpg). Give each project folder a title and short description below (keyed by the folder name).
 * Pictures or videos placed directly in a service folder (not in a project) are shown as a simple gallery.
 */
export const WORK = {
  eyebrow: "Our Work",
  headline: "Selected projects.",
  intro:
    "A selection of the apps, websites and systems we have designed and built for our clients, each one shaped around how that business operates.",
  empty: "Projects coming soon.",
};

/** DRAFT descriptions (written from the screenshots) — check and edit freely. */
export const PROJECTS: Record<string, { title?: string; client?: string; summary?: string }> = {
  "dolce-plus-app": {
    title: "Dolce+ App",
    client: "Beauty & wellness app · Erbil",
    summary:
      "One app for the Dolce, Polished and Core brands, where clients browse services, book appointments, shop products, earn loyalty rewards and get help from an AI assistant, in English, Arabic and Kurdish.",
  },
  "dolce-aesthetic-clinic": {
    title: "Dolce Aesthetic Clinic",
    client: "Aesthetic clinic · Erbil",
    summary:
      "A trilingual English, Arabic and Kurdish website for a premium aesthetic clinic, presenting its dermatology, plastic surgery and wellness services, real before-and-after results, the clinic’s story and the Dolce+ app.",
  },
  "polished-by-dolce": {
    title: "Polished by Dolce",
    client: "Beauty salon · Erbil",
    summary:
      "A refined website for the hair, nails and beauty salon of Dolce Aesthetic Clinic, with its service menu, a gallery of recent work, client reviews and easy booking through WhatsApp and Instagram, in English, Arabic and Kurdish.",
  },
};
