"use client";

import { AnimatePresence, motion } from "motion/react";
import { CircleCheck, CircleDashed, CircleMinus, FileSearch } from "lucide-react";
import { useState } from "react";
import { apiBase } from "@/lib/api";
import { fitExample } from "@/lib/content";
import { Reveal, ease } from "./reveal";
import { SectionHeading } from "./section-heading";

type Level = "strong" | "partial" | "gap";
interface FitResult {
  role: string;
  summary: string;
  items: { requirement: string; level: Level; evidence: string }[];
  counts: Record<Level, number>;
}

const MAX = 8000;
const columns: { level: Level; title: string; icon: typeof CircleCheck; tone: string }[] = [
  { level: "strong", title: "Strengths", icon: CircleCheck, tone: "text-strong" },
  { level: "partial", title: "Partial matches", icon: CircleDashed, tone: "text-partial" },
  { level: "gap", title: "Missing", icon: CircleMinus, tone: "text-gap" },
];

export function FitChecker() {
  const [jobAd, setJobAd] = useState("");
  const [state, setState] = useState<{ kind: "idle" | "loading" | "error"; message?: string } | { kind: "done"; result: FitResult }>({ kind: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const ad = jobAd.trim();
    if (ad.length < 80) {
      setState({ kind: "error", message: "Paste a bit more of the ad, at least a few requirements, so the comparison means something." });
      return;
    }
    setState({ kind: "loading" });
    try {
      const res = await fetch(`${apiBase()}/api/fit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobAd: ad }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setState({
          kind: "error",
          message:
            d.error === "rate_limited" || d.error === "busy"
              ? "You've run a few comparisons already. Give it a few minutes."
              : d.error === "too_long"
                ? "That's a long ad. Trim it to the role and requirements (8,000 characters max)."
                : "The comparison couldn't run right now. Try again in a moment, or email me.",
        });
      } else setState({ kind: "done", result: d as FitResult });
    } catch {
      setState({ kind: "error", message: "The comparison couldn't run right now. Try again in a moment, or email me." });
    }
  }

  return (
    <section id="fit" aria-labelledby="fit-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="fit-title"
          eyebrow="Hiring?"
          title={
            <>
              Paste your job ad. See an <span className="accent-serif text-gradient">honest</span> match.
            </>
          }
          lede="My AI compares the role with my resume, requirement by requirement. Every line of evidence is checked against my resume before it's shown, so gaps stay gaps. Nothing you paste is stored."
        />

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <form onSubmit={submit} className="card flex h-full flex-col p-5 sm:p-6">
              <label htmlFor="fit-input" className="text-sm font-medium">
                Job description
              </label>
              <textarea
                id="fit-input"
                value={jobAd}
                onChange={(e) => setJobAd(e.target.value.slice(0, MAX))}
                maxLength={MAX}
                placeholder="Paste the role, responsibilities and requirements…"
                className="field mt-3 min-h-64 flex-1 resize-y p-4 text-[0.95rem] leading-relaxed"
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="submit" disabled={state.kind === "loading"} className="btn btn-primary">
                  {state.kind === "loading" ? "Comparing…" : "Compare with my resume"}
                </button>
                <button type="button" className="btn btn-ghost" onClick={() => setJobAd(fitExample)}>
                  Use an example
                </button>
                <span className="ml-auto font-mono text-xs tabular-nums text-subtle">
                  {jobAd.length.toLocaleString("en")} / {MAX.toLocaleString("en")}
                </span>
              </div>
            </form>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card h-full min-h-80 p-5 sm:p-6" aria-live="polite" aria-busy={state.kind === "loading"}>
              <AnimatePresence mode="wait">
                {state.kind === "done" ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
                    {state.result.role && <p className="font-mono text-xs uppercase tracking-wider text-subtle">{state.result.role}</p>}
                    <p className="mt-2 leading-relaxed">{state.result.summary}</p>
                    <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-surface-2" aria-hidden>
                      {columns.map((c) => (
                        <motion.span
                          key={c.level}
                          initial={{ width: 0 }}
                          animate={{ width: `${(state.result.counts[c.level] / Math.max(1, state.result.items.length)) * 100}%` }}
                          transition={{ duration: 0.8, ease, delay: 0.1 }}
                          className={c.level === "strong" ? "bg-strong" : c.level === "partial" ? "bg-partial" : "bg-gap"}
                        />
                      ))}
                    </div>
                    <div className="mt-7 space-y-7">
                      {columns.map((c) => {
                        const items = state.result.items.filter((it) => it.level === c.level);
                        return (
                          <div key={c.level}>
                            <h3 className={`flex items-center gap-2 text-sm font-semibold ${c.tone}`}>
                              <c.icon className="size-4" /> {c.title}
                              <span className="font-mono text-xs text-subtle">{state.result.counts[c.level]}</span>
                            </h3>
                            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                              {items.length === 0 && <li className="text-sm text-subtle">None</li>}
                              {items.map((it, i) => (
                                <motion.li
                                  key={it.requirement}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.15 + i * 0.06 }}
                                  className="rounded-xl border border-line bg-bg-2/60 p-3"
                                >
                                  <p className="text-sm font-medium leading-snug">{it.requirement}</p>
                                  <p className="mt-1.5 text-[0.8rem] leading-relaxed text-muted">{it.evidence}</p>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                    <p className="mt-6 text-xs text-subtle">Evidence comes only from my resume and is checked before it&apos;s shown.</p>
                  </motion.div>
                ) : (
                  <motion.div key={state.kind} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full min-h-72 flex-col items-center justify-center text-center">
                    <FileSearch className={`size-8 ${state.kind === "error" ? "text-gap" : "text-subtle"} ${state.kind === "loading" ? "animate-pulse" : ""}`} strokeWidth={1.5} />
                    <p className={`mt-4 max-w-sm text-sm leading-relaxed ${state.kind === "error" ? "text-gap" : "text-muted"}`}>
                      {state.kind === "loading"
                        ? "Reading the ad and my resume… a few seconds."
                        : state.kind === "error"
                          ? state.message
                          : "Your match report shows up here: strengths, partial matches and missing requirements, each with evidence from my resume."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
