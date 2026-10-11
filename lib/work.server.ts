import "server-only";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { SERVICES } from "@/content/site";
import { asset } from "@/lib/asset";

export type WorkMedia = { type: "image" | "video"; src: string; caption: string; poster?: string };
export type WorkCategory = { id: string; title: string; items: WorkMedia[] };

const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
const VIDEO = /\.(mp4|webm|mov)$/i;

/** "01-bloom-salon-booking.jpg" → "Bloom salon booking" */
function caption(file: string) {
  const name = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
}

/**
 * Reads public/work/<service id>/ at build time: every picture and video in a service's folder is shown under that
 * service on /work, in file-name order. A video can have a cover image with the same name (e.g. tour.mp4 + tour.jpg).
 */
export function getWork(): WorkCategory[] {
  const root = path.join(process.cwd(), "public", "work");
  return SERVICES.map((sv) => {
    const dir = path.join(root, sv.id);
    const files = existsSync(dir) ? readdirSync(dir).filter((f) => !f.startsWith(".")).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })) : [];
    const videoBases = new Set(files.filter((f) => VIDEO.test(f)).map((f) => f.replace(/\.[^.]+$/, "")));
    const items: WorkMedia[] = files.flatMap((f): WorkMedia[] => {
      const base = f.replace(/\.[^.]+$/, "");
      const src = asset(`/work/${sv.id}/${f}`);
      if (VIDEO.test(f)) {
        const poster = files.find((g) => IMAGE.test(g) && g.replace(/\.[^.]+$/, "") === base);
        return [{ type: "video", src, caption: caption(f), poster: poster ? asset(`/work/${sv.id}/${poster}`) : undefined }];
      }
      if (IMAGE.test(f) && !videoBases.has(base)) return [{ type: "image", src, caption: caption(f) }];
      return [];
    });
    return { id: sv.id, title: sv.title, items };
  });
}
