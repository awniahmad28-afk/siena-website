"use client";
import { useEffect, useRef, useState } from "react";
import { useContent } from "@/components/LocaleProvider";

/**
 * The contact email. On phones it is a normal mailto link; on desktop it is plain, selectable text with a copy button
 * next to it (switched by CSS, so there is no flash on load). `compact` shows the button as an icon only (footer).
 */
export function CopyEmail({ s, compact = false }: { s: Record<string, string>; compact?: boolean }) {
  const { site, ui } = useContent();
  const c = ui.copy;
  const email = site.contactEmail;
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      /* older browsers / non-secure pages: copy through a hidden text field */
      const t = document.createElement("textarea");
      t.value = email; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <span className={s.mail}>
      <a className={s.mailLink} href={`mailto:${email}`} dir="ltr">{email}</a>
      <span className={s.mailText} dir="ltr">{email}</span>
      <button
        type="button"
        className={`${s.copyBtn} ${compact ? s.copyCompact : ""}`}
        onClick={copy}
        data-copied={copied || undefined}
        aria-label={copied ? c.emailCopied : c.copyAria(email)}
        title={copied ? c.copied : c.copyEmail}
      >
        {copied ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2.5" /><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6.5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" /></svg>
        )}
        {!compact && <span>{copied ? c.copied : c.copy}</span>}
        <span className={s.copyLive} aria-live="polite">{copied ? c.emailCopied : ""}</span>
      </button>
    </span>
  );
}
