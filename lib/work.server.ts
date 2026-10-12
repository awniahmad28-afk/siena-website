import "server-only";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { SERVICES } from "@/content/site";
import { PROJECTS } from "@/content/work";
import { asset } from "@/lib/asset";

export type WorkMedia = { type: "image" | "video"; src: string; caption: string; poster?: string };
export type WorkProject = { id: string; title: string; client?: string; summary?: string; cover?: WorkMedia; video?: WorkMedia; items: WorkMedia[] };
export type WorkCategory = { id: string; title: string; projects: WorkProject[]; items: WorkMedia[] };

const IMAGE = /\.(jpe?g|png|webp|avif|gif)$/i;
const VIDEO = /\.(mp4|webm|mov)$/i;
const base = (f: string) => f.replace(/\.[^.]+$/, "");
const byName = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

/** "01-bloom-salon-booking.jpg" → "Bloom salon booking" */
function caption(file: string) {
  const name = base(file).replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
  return name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
}

/** pictures and videos in one folder, in file-name order (a video's same-named picture becomes its cover) */
function media(dir: string, url: string): WorkMedia[] {
  const files = readdirSync(dir).filter((f) => !f.startsWith(".") && statSync(path.join(dir, f)).isFile()).sort(byName);
  const videos = new Set(files.filter((f) => VIDEO.test(f)).map(base));
  return files.flatMap((f): WorkMedia[] => {
    const src = asset(`${url}/${f}`);
    if (VIDEO.test(f)) {
      const poster = files.find((g) => IMAGE.test(g) && base(g) === base(f));
      return [{ type: "video", src, caption: caption(f), poster: poster ? asset(`${url}/${poster}`) : undefined }];
    }
    return IMAGE.test(f) && !videos.has(base(f)) ? [{ type: "image", src, caption: caption(f) }] : [];
  });
}

/**
 * Reads public/work/<service id>/ at build time. Pictures and videos directly in the folder are shown as a gallery;
 * each sub-folder is a project (its first picture is the cover, its first video plays on the card).
 */
export function getWork(): WorkCategory[] {
  const root = path.join(process.cwd(), "public", "work");
  return SERVICES.map((sv) => {
    const dir = path.join(root, sv.id);
    if (!existsSync(dir)) return { id: sv.id, title: sv.title, projects: [], items: [] };
    const projects = readdirSync(dir)
      .filter((f) => !f.startsWith(".") && statSync(path.join(dir, f)).isDirectory())
      .sort(byName)
      .map((p): WorkProject => {
        const items = media(path.join(dir, p), `/work/${sv.id}/${p}`);
        const meta = PROJECTS[p] ?? {};
        return {
          id: p,
          title: meta.title ?? caption(p),
          client: meta.client,
          summary: meta.summary,
          cover: items.find((m) => m.type === "image"),
          video: items.find((m) => m.type === "video"),
          items,
        };
      })
      .filter((p) => p.items.length > 0);
    return { id: sv.id, title: sv.title, projects, items: media(dir, `/work/${sv.id}`) };
  });
}
