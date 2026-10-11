"use client";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import type { WorkCategory, WorkMedia } from "@/lib/work.server";
import w from "./work.module.css";

/**
 * Our Work gallery: one tab per service; each shows that service's pictures and videos. Videos play silently in the
 * grid; any item opens full screen (arrows / swipe-free buttons / Esc). A service with nothing yet shows an empty state.
 */
export function WorkGallery({ categories, empty }: { categories: WorkCategory[]; empty: string }) {
  const [cat, setCat] = useState(categories[0]?.id ?? "");
  const [view, setView] = useState<number | null>(null);
  const current = categories.find((c) => c.id === cat) ?? categories[0];
  const items = current?.items ?? [];

  /* #websites etc. opens that tab */
  useEffect(() => {
    const fromHash = () => { const h = window.location.hash.slice(1); if (categories.some((c) => c.id === h)) setCat(h); };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [categories]);

  const choose = (id: string) => { setCat(id); setView(null); history.replaceState(null, "", `#${id}`); };

  return (
    <>
      <div className={w.filters} role="tablist" aria-label="Work by service">
        {categories.map((c) => (
          <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} className={w.chip} onClick={() => choose(c.id)}>
            {c.title}{c.items.length > 0 && <span className={w.count}>{c.items.length}</span>}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-label={current?.title} key={cat}>
        {items.length ? (
          <ul className={w.gallery}>
            {items.map((m, i) => (
              <li key={m.src} className={w.item} data-type={m.type} style={{ "--i": i } as CSSProperties}>
                <button type="button" className={w.open} onClick={() => setView(i)} aria-label={`Open ${m.caption || m.type}`}>
                  <Media m={m} grid />
                  {m.type === "video" && <span className={w.play} aria-hidden="true">▶</span>}
                </button>
                {m.caption && <p className={w.caption}>{m.caption}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <div className={w.empty}>
            <div className={w.slots} aria-hidden="true"><span /><span /><span /></div>
            <p><strong>{current?.title}</strong> · {empty}</p>
          </div>
        )}
      </div>

      {view !== null && items[view] && <Lightbox items={items} index={view} onIndex={setView} onClose={() => setView(null)} />}
    </>
  );
}

function Media({ m, grid = false }: { m: WorkMedia; grid?: boolean }) {
  if (m.type === "video") {
    return grid ? (
      <video src={m.src} poster={m.poster} muted loop playsInline autoPlay preload="metadata" />
    ) : (
      <video src={m.src} poster={m.poster} controls autoPlay playsInline />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={m.src} alt={m.caption} loading={grid ? "lazy" : "eager"} />;
}

function Lightbox({ items, index, onIndex, onClose }: { items: WorkMedia[]; index: number; onIndex: (i: number) => void; onClose: () => void }) {
  const go = useCallback((d: number) => onIndex((index + d + items.length) % items.length), [index, items.length, onIndex]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    document.addEventListener("keydown", key);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.documentElement.style.overflow = prev; };
  }, [go, onClose]);
  const m = items[index];
  return (
    <div className={w.lightbox} role="dialog" aria-modal="true" aria-label={m.caption || "Project media"} onClick={onClose} data-lenis-prevent="">
      <figure className={w.lbFigure} onClick={(e) => e.stopPropagation()}>
        <Media m={m} key={m.src} />
        {m.caption && <figcaption>{m.caption}</figcaption>}
      </figure>
      {items.length > 1 && (
        <>
          <button type="button" className={`${w.lbNav} ${w.lbPrev}`} onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous">←</button>
          <button type="button" className={`${w.lbNav} ${w.lbNext}`} onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next">→</button>
        </>
      )}
      <button type="button" className={w.lbClose} onClick={onClose} aria-label="Close">Close ✕</button>
    </div>
  );
}
