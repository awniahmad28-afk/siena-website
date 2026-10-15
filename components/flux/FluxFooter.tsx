import { FooterReveal } from "./FooterReveal";
import { CopyEmail } from "./CopyEmail";
import { getContent } from "@/content/index";
import { href, type Locale } from "@/lib/i18n";

/* simple line icons for the social links (shown only once a link is set in content/site.ts) */
const ICONS: Record<string, { label: string; d: string }> = {
  instagram: { label: "Instagram", d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.2-1.6h.01" },
  linkedin: { label: "LinkedIn", d: "M4 9h4v11H4zM6 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm5 5h3.8v1.6C15.5 9.5 16.8 9 18.2 9 21 9 22 10.8 22 14v6h-4v-5.3c0-1.4-.3-2.4-1.7-2.4-1.5 0-2.3 1-2.3 2.6V20h-4z" },
  facebook: { label: "Facebook", d: "M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8a0 0 0 0 1 0 0Z" },
  tiktok: { label: "TikTok", d: "M14 3v11.5a3.5 3.5 0 1 1-3-3.46M14 3c.5 2.6 2.4 4.4 5 4.6" },
};

/** Footer: the logo reveal, then Company, Services and Contact (email, WhatsApp, location and social links when set). */
export function FluxFooter({ s, page, locale = "en" }: { s: Record<string, string>; page?: "work" | "privacy" | "other"; locale?: Locale }) {
  const { site: SITE, services: SERVICES, ui } = getContent(locale);
  const f = ui.footer;
  const home = page ? href(locale, "/") : "";
  const digits = SITE.phone.replace(/\D/g, "");
  const social = Object.entries(SITE.social).filter(([, url]) => url);
  return (
    <footer className={s.footer}>
      <div className={s.footTop}>
        <FooterReveal className={s.footBrand} emClass={s.footEm} />
        <nav className={s.footCols} aria-label={f.company}>
          <div>
            <h2>{f.company}</h2>
            <ul>
              <li><a href={`${home}#what`}>{f.about}</a></li>
              <li><a href={href(locale, "/work/")}>{f.work}</a></li>
              <li><a href={`${home}#why`}>{f.why}</a></li>
            </ul>
          </div>
          <div>
            <h2>{f.services}</h2>
            <ul>
              {SERVICES.map((it) => <li key={it.id}><a href={`${home}#solution-${it.id}`}>{it.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h2>{f.contact}</h2>
            <ul>
              <li><CopyEmail s={s} compact /></li>
              <li><a href={`https://wa.me/${digits}?text=${encodeURIComponent(SITE.whatsappText)}`} target="_blank" rel="noopener noreferrer">{f.whatsapp}</a></li>
              {SITE.location && <li className={s.footPlain}>{SITE.location}</li>}
              <li><a className={s.footCta} href={`${home}#contact`}>{f.startLink}</a></li>
            </ul>
            {social.length > 0 && (
              <ul className={s.footSocial} aria-label={f.social}>
                {social.map(([k, url]) => (
                  <li key={k}>
                    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={ICONS[k]?.label ?? k}>
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[k]?.d ?? ""} /></svg>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </nav>
      </div>
      <div className={s.footBar}>
        <span>© {new Date().getFullYear()} {SITE.name} {SITE.tagline}</span>
        <span className={s.footBarLinks}>
          <a href={href(locale, "/privacy/")}>{f.privacy}</a>
          <a href="#top">{f.backTop}</a>
        </span>
      </div>
    </footer>
  );
}
