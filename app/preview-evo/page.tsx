import Link from "next/link";
import s from "../preview/preview.module.css";
import { EVO_DESIGNS } from "./designs";

export default function EvoPreviewIndex() {
  return (
    <main className={s.index}>
      <p className={s.kicker}>SIENA · Evolution button previews</p>
      <h1 className={s.title}>A subtle way into the Evolution</h1>
      <p className={s.lead}>
        Five quiet replacements for the engine button in the hero’s top-right corner. Each opens the full-screen Evolution
        story. Hover them on desktop, or tap on your phone.
      </p>
      <ul className={s.grid}>
        {EVO_DESIGNS.map((d) => (
          <li key={d.v}>
            <Link href={`/preview-evo/${d.v}`} className={s.card}>
              <span className={s.swatches} aria-hidden="true">
                {d.swatch.map((c) => <span key={c} style={{ background: c }} />)}
              </span>
              <span className={s.cardMood}>{d.mood}</span>
              <span className={s.cardName}>{d.n} · {d.name}</span>
              <span className={s.cardText}>{d.text}</span>
              <span className={s.cardGo}>Open preview →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
