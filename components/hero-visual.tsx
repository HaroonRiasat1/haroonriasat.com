"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";

// An orbit system: the product at the centre, then frontend, backend and AI rings.
// Labels counter-rotate so they stay upright. A small "retrieval trace" card below
// plays the loop behind the AI resume on this page.

const rings = [
  { r: 26, dur: 50, label: "Frontend", nodes: ["React", "Next.js", "TypeScript"], offset: 20 },
  { r: 38, dur: 70, label: "Backend", nodes: ["Node.js", "Python", "Laravel", "PostgreSQL"], offset: 70, reverse: true },
  { r: 49, dur: 95, label: "AI", nodes: ["RAG", "LLMs", "MCP", "Embeddings", "AWS"], offset: 0 },
];

const trace = [
  { k: "query", v: "\"Has he shipped RAG in production?\"" },
  { k: "route", v: "answerable · keyword + vector" },
  { k: "retrieve", v: "3 resume lines · score 0.81" },
  { k: "generate", v: "streaming answer…" },
  { k: "check", v: "grounded in resume ✓" },
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 20 });
  const [step, setStep] = useState(reduce ? trace.length : 0);

  useEffect(() => {
    if (reduce) {
      setStep(trace.length);
      return;
    }
    const id = setInterval(() => setStep((s) => (s >= trace.length + 2 ? 0 : s + 1)), 900);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[30rem] [perspective:1200px]" aria-hidden="true">
      <motion.div style={{ rotateX: rx, rotateY: ry }} className="relative aspect-square w-full [transform-style:preserve-3d]">
        {/* glow */}
        <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_45%,transparent),transparent_70%)] blur-2xl" />
        <div className="absolute inset-[30%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent-2)_30%,transparent),transparent_70%)] blur-2xl" />

        {/* spokes with data packets travelling inward */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="spoke" x1="0" x2="1">
              <stop offset="0" stopColor="var(--accent-2)" stopOpacity="0" />
              <stop offset="1" stopColor="var(--accent-2)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          {[15, 75, 135, 195, 255, 315].map((deg, i) => {
            const a = (deg * Math.PI) / 180;
            const x = 50 + 49 * Math.cos(a);
            const y = 50 + 49 * Math.sin(a);
            return (
              <g key={deg}>
                <line x1={x} y1={y} x2="50" y2="50" stroke="var(--line-2)" strokeWidth="0.15" />
                {!reduce && (
                  <motion.circle
                    r="0.7"
                    fill="var(--accent-2)"
                    initial={{ cx: x, cy: y, opacity: 0 }}
                    animate={{ cx: [x, 50], cy: [y, 50], opacity: [0, 1, 0] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.55, ease: "easeIn" }}
                  />
                )}
              </g>
            );
          })}
          {rings.map((ring) => (
            <circle key={ring.r} cx="50" cy="50" r={ring.r} fill="none" stroke="var(--line-2)" strokeWidth="0.18" strokeDasharray={ring.reverse ? "0.6 1.2" : undefined} />
          ))}
        </svg>

        {/* orbiting labels */}
        {rings.map((ring) => (
          <div
            key={ring.label}
            className="orbit absolute inset-0"
            style={{ animationDuration: `${ring.dur}s`, animationDirection: ring.reverse ? "reverse" : "normal" }}
          >
            {ring.nodes.map((n, i) => {
              const a = ((ring.offset + (360 / ring.nodes.length) * i) * Math.PI) / 180;
              return (
                <div
                  key={n}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + ring.r * Math.cos(a)}%`, top: `${50 + ring.r * Math.sin(a)}%` }}
                >
                  <span
                    className="orbit block whitespace-nowrap rounded-full border border-line-2 bg-bg/80 px-2 py-0.5 font-mono text-[0.62rem] text-muted shadow-card backdrop-blur sm:px-2.5 sm:text-[0.7rem]"
                    style={{ animationDuration: `${ring.dur}s`, animationDirection: ring.reverse ? "normal" : "reverse" }}
                  >
                    {n}
                  </span>
                </div>
              );
            })}
          </div>
        ))}

        {/* core */}
        <div className="absolute left-1/2 top-1/2 grid size-[22%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-bg-2 shadow-[0_0_60px_-10px_var(--accent)]">
          <div className="text-center">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-subtle sm:text-[0.65rem]">ship</div>
            <div className="text-gradient text-sm font-semibold tracking-tight sm:text-base">product</div>
          </div>
        </div>
      </motion.div>

      {/* retrieval trace */}
      <div className="card absolute -bottom-6 left-1/2 w-[min(100%,21rem)] -translate-x-1/2 overflow-hidden bg-bg-2/90 p-3.5 font-mono text-[0.7rem] leading-relaxed backdrop-blur-xl sm:-left-4 sm:translate-x-0 sm:text-xs">
        <div className="mb-2 flex items-center gap-1.5 text-subtle">
          <span className="size-2 rounded-full bg-gap/70" />
          <span className="size-2 rounded-full bg-partial/70" />
          <span className="size-2 rounded-full bg-strong/70" />
          <span className="ml-2">ask.haroonriasat.com</span>
        </div>
        <ul className="space-y-0.5">
          {trace.map((t, i) => (
            <li key={t.k} className={`flex gap-2 transition-opacity duration-300 ${i < step ? "opacity-100" : "opacity-0"}`}>
              <span className="w-14 shrink-0 text-accent-text">{t.k}</span>
              <span className={`truncate ${t.k === "check" ? "text-strong" : "text-muted"}`}>{t.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
