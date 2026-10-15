"use client";
import { useState, type FormEvent } from "react";
import { SERVICES } from "@/content/site";
import { CopyEmail } from "./CopyEmail";
import { useContent, useLocale } from "@/components/LocaleProvider";
import { LOCALES, href } from "@/lib/i18n";

/** Terminal-style enquiry. The site is static, so it opens a pre-filled email in the visitor's mail app. */
export function FluxContact({ s }: { s: Record<string, string> }) {
  const locale = useLocale();
  const { contact: CONTACT, services, site: SITE, ui } = useContent();
  const t = ui.contact;
  const arrow = LOCALES[locale].dir === "rtl" ? "←" : "→";
  const digits = SITE.phone.replace(/\D/g, "");
  const [areas, setAreas] = useState<string[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [error, setError] = useState("");

  const toggle = (t: string) => setAreas((a) => (a.includes(t) ? a.filter((x) => x !== t) : [...a, t]));

  const [sending, setSending] = useState(false);

  /* the site is static, so the message is delivered by FormSubmit (formsubmit.co) straight to SIENA's inbox;
     if that fails, it falls back to opening a pre-filled email in the visitor's mail app */
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "").trim(), email = String(f.get("email") || "").trim();
    const company = String(f.get("company") || "").trim(), note = String(f.get("note") || "").trim();
    if (String(f.get("_honey") || "")) return; /* spam bots fill the hidden field */
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.errRequired); return;
    }
    setError("");
    const langName = { en: "English", ar: "Arabic", ku: "Kurdish" }[locale];
    const subject = `New enquiry from the website${locale !== "en" ? ` (${langName})` : ""} — ${name}${company ? `, ${company}` : ""}`;
    const lines = [`Name: ${name}`, `Email: ${email}`];
    if (company) lines.push(`Company: ${company}`);
    const areaNames = areas.map((id) => SERVICES.find((sv) => sv.id === id)?.title ?? id);
    if (areas.length) lines.push(`Where systems feel fragmented: ${areaNames.join(", ")}`);
    if (note) lines.push("", note);

    setSending(true);
    setLog([t.logPack, t.logModules(areas.length ? String(areas.length) : t.none), t.transmitting]);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${SITE.contactEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: subject, _template: "table", _captcha: "false",
          Name: name, Email: email, Company: company || "—",
          "Where systems feel fragmented": areaNames.join(", ") || "—", Message: note || "—",
          "Website language": langName,
          _replyto: email,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || String(data.success) !== "true") throw new Error(data.message || "failed");
      setLog((x) => [...x, t.delivered, "", t.thanks(email)]);
      form.reset(); setAreas([]);
    } catch {
      setLog((x) => [...x, t.fallback]);
      const subj = `New project enquiry${company ? ` — ${company}` : ""}`;
      window.setTimeout(() => {
        window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(lines.join("\n"))}`;
      }, 600);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className={`${s.section} ${s.contactWrap}`} data-reveal="">
      <div className={s.contactCopy}>
        <p className={s.eyebrow}>{CONTACT.eyebrow}</p>
        <h2 className={s.h2}>{CONTACT.headline}</h2>
        <p className={s.sectionLead}>{CONTACT.body}</p>
        <p className={s.direct}>{t.direct} <CopyEmail s={s} /></p>
        {/* quick contact: WhatsApp everywhere, Call on phones only */}
        <div className={s.quick}>
          <a className={`${s.quickBtn} ${s.wa}`} href={`https://wa.me/${digits}?text=${encodeURIComponent(SITE.whatsappText)}`} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91A9.86 9.86 0 0 0 12.04 2Zm0 18.15a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.24 8.24 0 1 1 6.98 3.86Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z"/></svg>
            {t.whatsapp}
          </a>
          <a className={`${s.quickBtn} ${s.call}`} href={`tel:+${digits}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>
            {t.call}
          </a>
        </div>
      </div>

      <form className={s.terminal} onSubmit={submit} noValidate data-spot="">
        <div className={s.termBar} aria-hidden="true"><span /><span /><span /><p>siena://initiate</p></div>
        <div className={s.termBody}>
          <div className={s.fieldRow}>
            <label className={s.field}><span>{t.name}</span><input name="name" autoComplete="name" required /></label>
            <label className={s.field}><span>{t.company}</span><input name="company" autoComplete="organization" /></label>
          </div>
          {/* hidden from people; bots that fill it are ignored */}
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", insetInlineStart: "-9999px", width: 1, height: 1, opacity: 0 }} />
          <label className={s.field}><span>{t.email}</span><input name="email" type="email" dir="ltr" autoComplete="email" required /></label>
          <fieldset className={s.areas}>
            <legend>{t.areas}</legend>
            <div>
              {services.map((it) => (
                <button key={it.id} type="button" aria-pressed={areas.includes(it.id)} onClick={() => toggle(it.id)}>
                  {it.title}
                </button>
              ))}
            </div>
          </fieldset>
          <label className={s.field}><span>{t.anything} <em>{t.optional}</em></span><textarea name="note" rows={3} /></label>
          {error && <p className={s.error} role="alert">{error}</p>}
          <div className={s.termFoot}>
            <button type="submit" className={s.btn} data-magnet="" disabled={sending} aria-busy={sending}>{sending ? t.sending : `${CONTACT.cta} ${arrow}`}</button>
            <p className={s.termNote}>{t.note} <a href={href(locale, "/privacy/")}>{ui.footer.privacy}</a></p>
          </div>
          {log.length > 0 && <pre className={s.log} aria-live="polite">{log.join("\n")}</pre>}
        </div>
      </form>
    </section>
  );
}
