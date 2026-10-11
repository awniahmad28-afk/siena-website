"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "../preview/preview.module.css";
import { EVO_DESIGNS } from "./designs";

/** Switcher for the Evolution button previews only. */
export function EvoBar() {
  const path = (usePathname() || "").replace(/\/$/, "");
  const links: { href: string; label: string; name?: string }[] = [
    { href: "/preview-evo", label: "All" },
    ...EVO_DESIGNS.map((d) => ({ href: `/preview-evo/${d.v}`, label: d.n, name: d.name })),
    { href: "/", label: "Current site" },
  ];
  return (
    <nav className={s.bar} aria-label="Evolution button previews">
      <span className={s.barTag}>Evolution preview</span>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className={s.barLink} aria-current={path === l.href ? "page" : undefined}>
          {l.label}
          {l.name && <span className={s.barName}> · {l.name}</span>}
        </Link>
      ))}
    </nav>
  );
}
