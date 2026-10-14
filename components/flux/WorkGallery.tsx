"use client";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { WorkCategory, WorkMedia } from "@/lib/work.server";
import w from "./work.module.css";

type Viewer = { items: WorkMedia[]; index: number; title?: string };

/**
 * Our Work gallery: one tab per service. Each tab shows its projects as large cards (cover picture, the project video
 * playing on hover, title and description) and any loose pictures/videos as a grid. A project opens in a full-screen
 * viewer with all of its pictures and videos; a service with nothing yet shows an empty state.
 */
export function WorkGallery({ categories, empty }: { categories: WorkCategory[]; empty: string }) {
  const first = categories.find((c) => c.projects.length || c.items.length)?.id ?? categories[0]?.id ?? "";
  const [cat, setCat] = useState(first);
  const [viewer, setViewer] = useState<Viewer | null>(null);
  const current = categories.find((c) => c.id === cat) ?? categories[0];

  /* leaving the page: stop and unload every video so the next page (the animated homepage) has the memory it needs,
     which matters on iPhones; restore them if Safari brings this page back from its back/forward cache */
  useEffect(() => {
    const hide = () => document.querySelectorAll("video").forEach((v) => {
      v.pause(); v.dataset.src = v.currentSrc || v.src; v.removeAttribute("src"); v.load();
    });
    const show = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      document.querySelectorAll<HTMLVideoElement>("video[data-src]").forEach((v) => { v.src = v.dataset.src!; delete v.dataset.src; });
    };
    window.addEventListener("pagehide", hide);
    window.addEventListener("pageshow", show);
    return () => { window.removeEventListener("pagehide", hide); window.removeEventListener("pageshow", show); };
  }, []);

  /* #websites etc. opens that tab */
  useEffect(() => {
    const fromHash = () => { const h = window.location.hash.slice(1); if (categories.some((c) => c.id === h)) setCat(h); };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [categories]);

  const choose = (id: string) => { setCat(id); setViewer(null); history.replaceState(null, "", `#${id}`); };
  const count = (c: WorkCategory) => c.projects.length + c.items.length;

  return (
    <>
      <div className={w.filters} role="tablist" aria-label="Work by service">
        {categories.map((c) => (
          <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} className={w.chip} onClick={() => choose(c.id)}>
            {c.title}{count(c) > 0 && <span className={w.count}>{count(c)}</span>}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-label={current?.title} key={cat}>
        {current && current.projects.length > 0 && (
          <ul className={w.projects}>
            {current.projects.map((p, i) => (
              <li key={p.id} className={w.project} style={{ "--i": i } as CSSProperties}>
                <ProjectCover cover={p.cover} video={p.video} title={p.title} onOpen={() => setViewer({ items: p.items, index: 0, title: p.title })} />
                <div className={w.projectBody}>
                  {p.client && <p className={w.meta}>{p.client}</p>}
                  <h2 className={w.projectTitle}>{p.title}</h2>
                  {p.summary && <p className={w.summary}>{p.summary}</p>}
                  <button type="button" className={w.toggle} onClick={() => setViewer({ items: p.items, index: 0, title: p.title })}>
                    View project <span aria-hidden="true">→</span>
                  </button>
                  <p className={w.stat}>
                    {p.items.filter((m) => m.type === "image").length} pictures
                    {(() => { const v = p.items.filter((m) => m.type === "video").length; return v ? ` · ${v} video${v > 1 ? "s" : ""}` : ""; })()}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {current && current.items.length > 0 && (
          <ul className={w.gallery}>
            {current.items.map((m, i) => (
              <li key={m.src} className={w.item} style={{ "--i": i } as CSSProperties}>
                <button type="button" className={w.open} onClick={() => setViewer({ items: current.items, index: i })} aria-label={`Open ${m.caption || m.type}`}>
                  <Media m={m} grid />
                  {m.type === "video" && <span className={w.play} aria-hidden="true">▶</span>}
                </button>
                {m.caption && <p className={w.caption}>{m.caption}</p>}
              </li>
            ))}
          </ul>
        )}

        {current && count(current) === 0 && (
          <div className={w.empty}>
            <div className={w.slots} aria-hidden="true"><span /><span /><span /></div>
            <p><strong>{current.title}</strong> · {empty}</p>
          </div>
        )}
      </div>

      {viewer && <Lightbox viewer={viewer} onIndex={(index) => setViewer({ ...viewer, index })} onClose={() => setViewer(null)} />}
    </>
  );
}

/** project card picture: the cover, with the project video playing over it while hovered (always on touch screens) */
function ProjectCover({ cover, video, title, onOpen }: { cover?: WorkMedia; video?: WorkMedia; title: string; onOpen: () => void }) {
  const vid = useRef<HTMLVideoElement>(null);
  const [touch, setTouch] = useState(false);
  useEffect(() => { setTouch(!window.matchMedia("(hover: hover)").matches); }, []);
  const play = () => { vid.current?.play().catch(() => {}); };
  const stop = () => { if (vid.current && !touch) { vid.current.pause(); vid.current.currentTime = 0; } };
  return (
    <button type="button" className={w.cover} onClick={onOpen} onMouseEnter={play} onMouseLeave={stop} aria-label={`Open ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {cover && <img src={cover.src} alt={`${title} — ${cover.caption}`} loading="lazy" />}
      {video && (
        <video ref={vid} className={w.coverVideo} src={video.src} poster={cover?.src ?? video.poster} muted loop playsInline preload="none" autoPlay={touch} data-on={touch || undefined} />
      )}
      {video && <span className={w.play} aria-hidden="true">▶</span>}
    </button>
  );
}

function Media({ m, grid = false, onTall }: { m: WorkMedia; grid?: boolean; onTall?: (tall: boolean) => void }) {
  if (m.type === "video") {
    return grid ? (
      <video src={m.src} poster={m.poster} muted loop playsInline autoPlay preload="metadata" />
    ) : (
      <video src={m.src} poster={m.poster} controls autoPlay playsInline />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={m.src}
      alt={m.caption}
      loading={grid ? "lazy" : "eager"}
      onLoad={(e) => onTall?.(e.currentTarget.naturalHeight / e.currentTarget.naturalWidth > 2.2)}
    />
  );
}

function Lightbox({ viewer, onIndex, onClose }: { viewer: Viewer; onIndex: (i: number) => void; onClose: () => void }) {
  const { items, index, title } = viewer;
  const [tall, setTall] = useState(false);
  const go = useCallback((d: number) => { setTall(false); onIndex((index + d + items.length) % items.length); }, [index, items.length, onIndex]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    document.addEventListener("keydown", key);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.documentElement.style.overflow = prev; };
  }, [go, onClose]);
  const m = items[index];
  return (
    <div className={w.lightbox} role="dialog" aria-modal="true" aria-label={title ?? m.caption ?? "Project media"} onClick={onClose} data-lenis-prevent="">
      <div className={w.lbTop}>
        <span>{title && <strong>{title}</strong>} {m.caption}</span>
        <span className={w.lbCount}>{index + 1} / {items.length}</span>
      </div>
      {/* very tall pictures (full-page screenshots) scroll inside the viewer at a readable width */}
      <figure className={w.lbFigure} data-tall={tall || undefined} onClick={(e) => e.stopPropagation()}>
        <Media m={m} key={m.src} onTall={setTall} />
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
