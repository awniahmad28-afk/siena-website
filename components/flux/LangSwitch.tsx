"use client";
import { useEffect, useRef, useState } from "react";
import { LOCALES, LOCALE_LIST, href } from "@/lib/i18n";
import { useContent, useLocale } from "@/components/LocaleProvider";
import l from "./langSwitch.module.css";

/**
 * Language switcher. In the header bar: a small button with the current language that opens a short list.
 * `inline` (inside the phone menu): the three languages side by side. Each link opens the same page in that
 * language and keeps the section you are on (#contact etc.).
 */
export function LangSwitch({ path, inline = false }: { path: string; inline?: boolean }) {
  const locale = useLocale();
  const { ui } = useContent();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const out = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", out);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("pointerdown", out); document.removeEventListener("keydown", key); };
  }, [open]);

  /* keep the current section when switching */
  const keepHash = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const h = window.location.hash;
    if (h && h !== "#top") e.currentTarget.href = e.currentTarget.href.split("#")[0] + h;
  };

  const links = LOCALE_LIST.map((code) => (
    <a
      key={code}
      href={href(code, path)}
      hrefLang={LOCALES[code].lang}
      lang={LOCALES[code].lang}
      aria-current={code === locale ? "true" : undefined}
      onClick={keepHash}
      className={l.opt}
    >
      {LOCALES[code].label}
    </a>
  ));

  if (inline) return <nav className={l.inline} aria-label={ui.language}>{links}</nav>;

  return (
    <div ref={root} className={l.root}>
      <button type="button" className={l.btn} aria-expanded={open} aria-haspopup="true" aria-label={`${ui.language}: ${LOCALES[locale].label}`} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" /></svg>
        <span>{LOCALES[locale].short}</span>
      </button>
      {open && <div className={l.list}>{links}</div>}
    </div>
  );
}
