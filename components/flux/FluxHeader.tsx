"use client";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { TailSymbol } from "./TailSymbol";
import { href as pageHref } from "@/lib/i18n";
import { useContent, useLocale } from "@/components/LocaleProvider";
import { LangSwitch } from "./LangSwitch";

const LINKS = [
  { id: "what", n: "01", key: "about" },
  { id: "solutions", n: "02", key: "solutions" },
  { id: "work", n: "03", key: "work", page: "/work/" },
  { id: "why", n: "04", key: "why" },
  { id: "contact", n: "05", key: "contact" },
] as const;

export type HeaderPage = "work" | "privacy" | "other";

/** Fixed HUD header: highlights the section in view; full-screen menu on small screens; language switcher.
 *  `page` is set on pages other than the homepage: section links then lead back to the homepage. */
export function FluxHeader({ s, page }: { s: Record<string, string>; page?: HeaderPage }) {
  const locale = useLocale();
  const { ui } = useContent();
  const home = page ? pageHref(locale, "/") : "";
  const path = page === "work" ? "/work/" : page === "privacy" ? "/privacy/" : "/";
  const href = (l: (typeof LINKS)[number]) => ("page" in l && l.page ? pageHref(locale, l.page) : `${home}#${l.id}`);
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
      <a href={page ? pageHref(locale, "/") : "#top"} className={s.brand} aria-label={page ? ui.brandHome : ui.brandTop}>
        <TailSymbol className={s.symbol} />
        <BrandLogo variant="wordmark" alt="SIENA" className={s.word} sizes="100px" priority feather={false} />
      </a>
      <nav aria-label={ui.primaryNav} className={s.nav}>
        {LINKS.map((l) => (
          <a key={l.id} href={href(l)} aria-current={current(l)}>{ui.nav[l.key]}</a>
        ))}
      </nav>
      {/* end of the bar: language · CTA (desktop) · menu button (phones) */}
      <div className={s.topEnd}>
        <LangSwitch path={path} />
        <a href={`${home}#contact`} className={s.topCta} aria-current={active === "contact" ? "location" : undefined}>{ui.startProject}</a>
        <button
          ref={toggle}
          type="button"
          className={s.menuBtn}
          aria-expanded={open}
          aria-controls="flux-menu"
          aria-label={open ? ui.closeMenu : ui.openMenu}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>

      <div id="flux-menu" ref={panel} className={s.menu} hidden={!open} role="dialog" aria-modal="true" aria-label={ui.menu}>
        <p className={s.menuKicker}>{ui.menu}</p>
        <ul>
          {LINKS.map((l) => (
            <li key={l.id}>
              <a href={href(l)} onClick={() => setOpen(false)} aria-current={current(l)}>
                <span>{l.n}</span>{ui.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>
        <a href={`${home}#contact`} className={s.btn} onClick={() => setOpen(false)}>{ui.startProject}</a>
        <LangSwitch path={path} inline />
        <button type="button" className={s.menuClose} onClick={() => setOpen(false)}>{ui.close} ✕</button>
      </div>
    </header>
  );
}
