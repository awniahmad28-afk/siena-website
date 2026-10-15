import type { Metadata } from "next";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { FluxHeader } from "@/components/flux/FluxHeader";
import { asset } from "@/lib/asset";
import s from "@/app/home.module.css";

export const metadata: Metadata = { title: "Page not found | SIENA Solutions", robots: { index: false } };

/** Shown for any address that doesn't exist (exported as 404.html, which GitHub Pages serves for unknown paths). */
export default function NotFound() {
  return (
    <div className={s.page}>
      <FluxHeader s={s} page="other" />
      <main id="top" className={s.notFound}>
        <p className={s.eyebrow}>Error 404</p>
        <h1 className={s.h1}>This page <em>doesn’t exist.</em></h1>
        <p className={s.lead}>The link may be old, or the address may have a typo. Everything SIENA does is one click away.</p>
        <div className={s.ctas}>
          <a href={asset("/")} className={s.btn}>Back to the homepage</a>
          <a href={asset("/work/")} className={s.btnGhost}>See our work</a>
          <a href={`${asset("/")}#contact`} className={s.btnGhost}>Start your project</a>
        </div>
      </main>
    </div>
  );
}
