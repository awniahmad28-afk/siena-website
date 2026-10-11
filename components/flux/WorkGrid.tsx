"use client";
import { useState, type CSSProperties } from "react";
import { SERVICES } from "@/content/site";
import { WORK, type Project } from "@/content/work";
import { asset } from "@/lib/asset";
import w from "./work.module.css";

const NAME: Record<string, string> = Object.fromEntries(SERVICES.map((sv) => [sv.id, sv.title]));
const HUES = ["#33e1ff", "#7aa2ff", "#ff4fd8", "#2f7bff", "#5cf2c0", "#a07bff"];

/** Filterable project grid; each card opens to show the project details. */
export function WorkGrid() {
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);
  const used = SERVICES.filter((sv) => WORK.projects.some((p) => p.services.includes(sv.id)));
  const list = WORK.projects.filter((p) => filter === "all" || p.services.includes(filter));

  return (
    <>
      <div className={w.filters} role="group" aria-label="Filter projects by service">
        {[{ id: "all", title: "All work" }, ...used].map((f) => (
          <button key={f.id} type="button" className={w.chip} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.title}
          </button>
        ))}
      </div>

      <ul className={w.grid}>
        {list.map((p, i) => (
          <Card key={p.id} p={p} i={i} open={open === p.id} onToggle={() => setOpen(open === p.id ? null : p.id)} />
        ))}
      </ul>
      {list.length === 0 && <p className={w.empty}>No projects in this category yet.</p>}
    </>
  );
}

function Card({ p, i, open, onToggle }: { p: Project; i: number; open: boolean; onToggle: () => void }) {
  const hue = HUES[i % HUES.length];
  return (
    <li className={w.card} data-open={open || undefined} style={{ "--hue": hue, "--i": i } as CSSProperties}>
      <div className={w.visual}>
        {p.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(p.image)} alt={`${p.title} — ${p.client}`} loading="lazy" />
        ) : (
          <span className={w.placeholder} aria-hidden="true"><span>{p.title.charAt(0)}</span></span>
        )}
        {p.example && <span className={w.badge}>Example</span>}
      </div>
      <div className={w.body}>
        <p className={w.meta}>{p.industry} · {p.year}</p>
        <h2 className={w.cardTitle}>{p.title}</h2>
        <p className={w.client}>{p.client}</p>
        <ul className={w.tags}>{p.services.map((id) => <li key={id}>{NAME[id] ?? id}</li>)}</ul>
        <p className={w.summary}>{p.summary}</p>
        <div className={w.more} id={`work-${p.id}`} hidden={!open}>
          <ul className={w.details}>{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
          <p className={w.result}><span>Result</span>{p.result}</p>
          {p.link && <a className={w.link} href={p.link} target="_blank" rel="noopener noreferrer">Visit project ↗</a>}
        </div>
        <button type="button" className={w.toggle} aria-expanded={open} aria-controls={`work-${p.id}`} onClick={onToggle}>
          {open ? "Show less" : "View project"} <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>
    </li>
  );
}
