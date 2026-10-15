import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { FluxFooter } from "@/components/flux/FluxFooter";
import { SITE } from "@/content/site";
import s from "@/app/home.module.css";

export const metadata: Metadata = {
  title: "Privacy | SIENA Solutions",
  description: "How SIENA Solutions handles the information you send us through this website.",
};

/** Plain-language privacy note: what the contact form collects and what the site does not do. */
export default function Privacy() {
  return (
    <div className={s.page}>
      <FluxHeader s={s} page="other" />
      <main id="top" className={s.legal}>
        <p className={s.eyebrow}>Privacy</p>
        <h1 className={s.legalTitle}>Your information, kept simple.</h1>
        <p className={s.legalDate}>Last updated: October 2026</p>

        <h2>What we collect</h2>
        <p>
          When you send the contact form, we receive the details you type in: your name, email address, company (if you add it),
          the services you select and your message. Nothing else is collected from the form.
        </p>

        <h2>How it reaches us</h2>
        <p>
          The form is delivered to our inbox ({SITE.contactEmail}) by FormSubmit, an email forwarding service. If you contact us
          by WhatsApp, phone or email instead, that conversation is handled by those services under their own privacy terms.
        </p>

        <h2>How we use it</h2>
        <p>
          Only to reply to you and to discuss your project. We do not sell or share your details, and we do not add you to a
          mailing list.
        </p>

        <h2>Cookies and tracking</h2>
        <p>This website does not use cookies, advertising trackers or analytics. Fonts, images and videos are served from the site itself.</p>

        <h2>Keeping and deleting your information</h2>
        <p>
          We keep your messages only as long as we need them to work with you. To see, correct or delete what we hold about you,
          email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> and we will take care of it.
        </p>
      </main>
      <FluxFooter s={s} page="other" />
    </div>
  );
}
