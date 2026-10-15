"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { asset } from "@/lib/asset";
import { useContent } from "@/components/LocaleProvider";

const NODE_COUNT = 8;
const C = { x: 400, y: 210 };
/* without SIENA: tools scattered, a few brittle point-to-point links */
const LOOSE = [[90, 70], [300, 40], [560, 80], [720, 150], [640, 330], [400, 370], [150, 300], [250, 190]];
const BROKEN = [[0, 7], [1, 2], [3, 4], [5, 6], [2, 7]];
/* with SIENA: every tool on one ring around the core */
const RING = Array.from({ length: NODE_COUNT }, (_, i) => {
  const a = (i / NODE_COUNT) * Math.PI * 2 - Math.PI / 2;
  return [C.x + Math.cos(a) * 300, C.y + Math.sin(a) * 160];
});

/** "Why SIENA": a short introduction and the four principles as text, then the Without / With SIENA comparison. */
export function FluxWhy({ s }: { s: Record<string, string> }) {
  const { why: WHY, ui } = useContent();
  const t = ui.why;
  const [on, setOn] = useState(false);
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  /* the first time the diagram is seen, it connects itself */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      t = window.setTimeout(() => { if (!touched.current) setOn(true); }, 1400);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
  const pick = (v: boolean) => { touched.current = true; setOn(v); };

  return (
    <section id="why" className={s.section} data-reveal="">
      <p className={s.eyebrow}>{WHY.eyebrow}</p>
      <h2 className={s.h2}>{WHY.headline}</h2>
      <p className={s.whyIntro}>{WHY.intro}</p>

      {/* the four principles as text, above the Without / With comparison */}
      <ol className={s.whyPoints}>
        {WHY.points.map((p, i) => (
          <li key={p.title}>
            <span className={s.serviceN}>0{i + 1}</span>
            <h3 className={s.serviceTitle}>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ol>

      <div className={s.compare} ref={ref} data-on={on || undefined}>
        <div className={s.switch} role="group" aria-label={t.compare}>
          <button type="button" aria-pressed={!on} onClick={() => pick(false)}>{t.without}</button>
          <button type="button" aria-pressed={on} onClick={() => pick(true)}>{t.with}</button>
        </div>
        <svg viewBox="0 0 800 420" className={s.compareSvg} role="img"
          aria-label={on ? t.ariaOn : t.ariaOff}>
          <g className={s.broken}>
            {BROKEN.map(([a, b]) => (
              <line key={`${a}-${b}`} x1={LOOSE[a][0]} y1={LOOSE[a][1]} x2={LOOSE[b][0]} y2={LOOSE[b][1]} />
            ))}
          </g>
          <g className={s.links}>
            {RING.map(([x, y], i) => <line key={i} x1={C.x} y1={C.y} x2={x} y2={y} style={{ "--i": i } as CSSProperties} />)}
            <polygon points={RING.map((p) => p.join(",")).join(" ")} />
          </g>
          <g className={s.core}>
            <circle cx={C.x} cy={C.y} r="46" />
            <image href={asset("/brand/siena-symbol-160.webp")} x={C.x - 30} y={C.y - 30} width="60" height="60" />
          </g>
          {t.nodes.map((n, i) => {
            const [x, y] = on ? RING[i] : LOOSE[i];
            return (
              <g key={n} className={s.tool} style={{ transform: `translate(${x}px, ${y}px)`, "--i": i } as CSSProperties}>
                <rect x="-56" y="-16" width="112" height="32" />
                <text y="5" textAnchor="middle">{n.toUpperCase()}</text>
              </g>
            );
          })}
        </svg>
        <p className={s.compareCaption} aria-live="polite">
          {on ? t.captionOn : t.captionOff}
        </p>
      </div>

    </section>
  );
}
