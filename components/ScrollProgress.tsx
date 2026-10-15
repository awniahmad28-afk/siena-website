"use client";
/** ScrollProgress — the time machine's dial: live year readout + keyboard-navigable era rail. */
import { useContent } from "@/components/LocaleProvider";

export function ScrollProgress({ onJump }: { onJump: (index: number) => void }) {
  const { eras: ERAS, ui } = useContent();
  return (
    <nav className="progress" aria-label={ui.story.eras}>
      <p className="progress-year" aria-hidden="true">
        <span data-year data-circa={ui.story.circa}>{ui.story.circa} 762</span>
        <span className="progress-era" data-year-suffix data-ce={ui.story.ce}>
          {ui.story.ce}
        </span>
      </p>
      <div className="progress-rail">
        <span className="progress-fill" data-progress-fill />
        <ol>
          {ERAS.map((e, i) => (
            <li key={e.id}>
              <button type="button" data-rail={i} onClick={() => onJump(i)} aria-label={`${e.years} — ${e.title}`}>
                <span className="progress-dot" aria-hidden="true" />
                <span className="progress-label">{e.railLabel}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
