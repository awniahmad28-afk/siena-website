/**
 * Our Work — projects shown on /work.
 *
 * HOW TO ADD A PROJECT: copy one entry and fill it in. `services` uses the service ids from content/site.ts
 * (apps, websites, agents, automation, systems, marketing). For a screenshot, put the image in public/work/
 * (e.g. public/work/bloom-salon.jpg, ideally 1600 × 1000) and set image: "/work/bloom-salon.jpg".
 * `link` is optional (a live website or app store page).
 *
 * The entries marked `example: true` are PLACEHOLDERS that show the layout — replace them with real projects
 * (the page labels them "Example" until then).
 */
export type Project = {
  id: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  services: string[];
  summary: string;
  details: string[];
  result: string;
  image?: string;
  link?: string;
  example?: boolean;
};

export const WORK = {
  eyebrow: "Our Work",
  headline: "Selected projects.",
  intro:
    "A selection of the apps, websites and systems we have designed and built for our clients, each one shaped around how that business operates.",
  projects: [
    {
      id: "example-restaurant-app",
      title: "Ordering & loyalty app",
      client: "Restaurant group",
      industry: "Food & beverage",
      year: "2026",
      services: ["apps", "systems"],
      summary: "A mobile app for ordering, table reservations and loyalty rewards, connected to the restaurant’s point-of-sale system.",
      details: [
        "Customers browse the menu, order for pickup or delivery and reserve tables in a few taps.",
        "Orders go straight to the kitchen through the POS, with live status updates for the customer.",
        "A points-based loyalty programme rewards repeat visits and powers targeted offers.",
      ],
      result: "Faster ordering, fewer phone calls and more returning customers.",
      example: true,
    },
    {
      id: "example-clinic-website",
      title: "Website & online booking",
      client: "Aesthetic clinic",
      industry: "Beauty & health",
      year: "2026",
      services: ["websites", "agents"],
      summary: "A premium bilingual website with treatment pages, online booking and an AI assistant that answers questions day and night.",
      details: [
        "A refined design that reflects the clinic’s brand, with clear pages for every treatment.",
        "Online booking linked to the clinic calendar, with automatic confirmations and reminders.",
        "An AI assistant trained on the clinic’s services answers enquiries and books consultations.",
      ],
      result: "More bookings online and less time spent answering the same questions.",
      example: true,
    },
    {
      id: "example-retail-system",
      title: "Point of sale & inventory system",
      client: "Retail chain",
      industry: "Retail",
      year: "2025",
      services: ["systems", "automation"],
      summary: "A custom POS and stock management system for several branches, with reporting for the owners.",
      details: [
        "Fast checkout screens for staff, with receipts, returns and discounts.",
        "Live stock levels across every branch, with automatic reorder alerts.",
        "Daily sales reports and dashboards, connected to the accounting software.",
      ],
      result: "One clear view of sales and stock across the whole business.",
      example: true,
    },
  ] satisfies Project[] as Project[],
};
