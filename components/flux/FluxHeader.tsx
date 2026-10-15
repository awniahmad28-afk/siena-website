"use client";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { TailSymbol } from "./TailSymbol";
import { asset } from "@/lib/asset";

const LINKS = [
  { id: "what", n: "01", label: "About" },
  { id: "solutions", n: "02", label: "Solutions" },
  { id: "work", n: "03", label: "Our Work", page: "/work/" },
  { id: "why", n: "04", label: "Why SIENA" },
  { id: "contact", n: "05", label: "Contact" },
];

/** Fixed HUD header: highlights the section in view; full-screen menu on small screens.
 *  `page` is set on pages other than the homepage: section links then lead back to the homepage. */
export function FluxHeader({ s, page }: { s: Record<string, string>; page?: "work" | "other" }) {
  const home = page ? asset("/") : "";
  const href = (l: (typeof LINKS)[number]) => ("page" in l && l.page ? asset(l.page) : `${home}#${l.id}`);
  const current = (l: (typeof LINKS)[number]) => (page === l.id ? "page" : active === l.id ? "location" : undefined);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  /* which section is in view */
  useEffect(() => {
    const els = LINKS.filter((l) => !("page" in l)).map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const top = () => { if (window.scrollY < window.innerHeight) setActive(null); };
    window.addEventListener("scroll", top, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", top); };
  }, []);

  /* menu: lock scroll, Escape closes, focus stays inside, focus returns to the toggle */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panel.current) {
        const f = Array.from(panel.current.querySelectorAll<HTMLElement>("a, button"));
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", key);
    return () => { root.style.overflow = prev; document.removeEventListener("keydown", key); toggle.current?.focus(); };
  }, [open]);

  return (
    <header className={s.top} data-open={open || undefined}>
      <a href={page ? asset("/") : "#top"} className={s.brand} aria-label={page ? "SIENA — home" : "SIENA — back to top"}>
        <TailSymbol className={s.symbol} />
        <BrandLogo variant="wordmark" alt="SIENA" className={s.word} sizes="100px" priority feather={false} />
      </a>
      <nav aria-label="Primary" className={s.nav}>
        {LINKS.map((l) => (
          <a key={l.id} href={href(l)} aria-current={current(l)}>{l.label}</a>
        ))}
      </nav>
      <a href={`${home}#contact`} className={s.topCta} aria-current={active === "contact" ? "location" : undefined}>Start your project</a>
      <button
        ref={toggle}
        type="button"
        className={s.menuBtn}
        aria-expanded={open}
        aria-controls="flux-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span />
      </button>

      <div id="flux-menu" ref={panel} className={s.menu} hidden={!open} role="dialog" aria-modal="true" aria-label="Menu">
        <p className={s.menuKicker}>Menu</p>
        <ul>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={href(l)} onClick={() => setOpen(false)} aria-current={current(l)}>
                <span>{l.n}</span>{l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={`${home}#contact`} className={s.btn} onClick={() => setOpen(false)}>Start your project</a>
        <button type="button" className={s.menuClose} onClick={() => setOpen(false)}>Close ✕</button>
      </div>
    </header>
  );
}
