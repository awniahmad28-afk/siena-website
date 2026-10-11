"use client";
import { useRef, useState } from "react";
import { openStory } from "@/lib/story";
import e from "./engine.module.css";

/**
 * "Explore the Evolution" as a car engine start/stop button. It idles with a small rumble, rumbles harder on hover,
 * and on press "ignites" (ring flash, hard shake, a short haptic buzz on phones that support it) before the
 * full-screen Evolution story opens.
 */
export function EngineButton({ className = "" }: { className?: string }) {
  const [starting, setStarting] = useState(false);
  const timer = useRef(0);
  const start = () => {
    if (starting) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { openStory(); return; }
    setStarting(true);
    try { navigator.vibrate?.([25, 35, 70]); } catch { /* not supported */ }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { openStory(); setStarting(false); }, 520);
  };
  return (
    <button
      type="button"
      className={`${e.btn} ${className}`}
      data-starting={starting || undefined}
      onPointerDown={(ev) => ev.stopPropagation()}
      onClick={start}
      aria-label="Explore the Evolution"
    >
      <span className={e.bezel} aria-hidden="true">
        <span className={e.ring} />
        <span className={e.face}>
          <span className={e.top}>Explore</span>
          <svg className={e.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 3v8" />
            <path d="M6.6 6.6a7.5 7.5 0 1 0 10.8 0" />
          </svg>
          <span className={e.bottom}>The Evolution</span>
        </span>
      </span>
    </button>
  );
}
