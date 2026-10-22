"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Download } from "lucide-react";
import { useEffect, useState } from "react";
import { rotating, site, stats } from "@/lib/content";
import { HeroVisual } from "./hero-visual";
import { GithubIcon, LinkedinIcon } from "./icons";
import { ease } from "./reveal";

const headline = "I build software that solves real problems.".split(" ");

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Helsinki", hour: "2-digit", minute: "2-digit" });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

function Rotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % rotating.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={rotating[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="text-gradient inline-block whitespace-nowrap font-medium"
        >
          {rotating[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only">{rotating.join(", ")}</span>
    </span>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:min-h-[100svh] lg:pb-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
        <div>
          <div className="rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted backdrop-blur" style={{ animationDelay: "0s" }}
          >
            <span className="live-dot" aria-hidden />
            <span>
              {site.location} · <LocalTime /> local time
            </span>
          </div>

          <h1
            id="hero-title" className="rise mt-7 text-[clamp(2.75rem,8vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.045em]" style={{ animationDelay: "0.05s" }}
          >
            Hey, I&apos;m <span className="accent-serif text-gradient pr-1">Haroon.</span>
          </h1>

          <p className="mt-5 max-w-[22ch] text-[clamp(1.5rem,3.4vw,2.4rem)] font-medium leading-[1.15] tracking-[-0.025em] text-fg/90">
            {headline.map((w, i) => (
              <span key={i} className="rise inline-block pr-[0.25em]" style={{ animationDelay: `${0.25 + i * 0.06}s` }}>
                {w}
              </span>
            ))}
          </p>

          <p className="rise mt-4 flex flex-wrap items-baseline gap-x-2 font-mono text-sm text-subtle sm:text-base" style={{ animationDelay: "0.75s" }}
          >
            <span>Building →</span>
            <Rotator />
          </p>

          <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: "0.85s" }}
          >
            I&apos;m a Software Engineer based in Finland, building scalable web applications and AI-powered products. I enjoy turning complex
            ideas into practical, reliable software.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.95s" }}
          >
            <a href="#work" className="btn btn-primary group">
              Explore My Work <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
            <a href="#contact" className="btn btn-ghost group">
              Let&apos;s Connect <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <div className="flex items-center gap-1 sm:ml-2">
              <a href={site.cv} download className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:text-fg">
                <Download className="size-4" /> CV
              </a>
              <a href={site.github} aria-label="GitHub" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-fg">
                <GithubIcon className="size-[1.15rem]" />
              </a>
              <a href={site.linkedin} aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-fg">
                <LinkedinIcon className="size-[1.1rem]" />
              </a>
            </div>
          </div>
        </div>

        <div className="rise pb-6" style={{ animationDelay: "0.2s" }}>
          <HeroVisual />
        </div>
      </div>

      <dl className="rise container-x relative mt-20 grid grid-cols-2 gap-px overflow-hidden lg:mt-16 lg:grid-cols-4" style={{ animationDelay: "1.1s" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="border-t border-line pt-5 pr-4 pb-2">
            <dt className="sr-only">{s.label}</dt>
            <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</dd>
            <dd className="mt-1 text-sm text-muted">{s.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
