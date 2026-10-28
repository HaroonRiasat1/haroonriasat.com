"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { earlier, experience } from "@/lib/content";
import { Reveal, ease } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [open, setOpen] = useState<Record<string, boolean>>({ Amplon: true });

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title={
            <>
              Four years of <span className="accent-serif text-gradient">shipping</span>.
            </>
          }
          lede="From leading a team of six to co-founding a consultancy, I've owned products from the first client call to production."
        />

        <ol ref={listRef} className="relative ml-1.5 sm:ml-0">
          {/* track + progress */}
          <div aria-hidden className="absolute left-0 top-2 bottom-2 w-px bg-line sm:left-[11.5rem]" />
          <motion.div aria-hidden style={{ scaleY: fill }} className="absolute left-0 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent sm:left-[11.5rem]" />

          {experience.map((job) => {
            const isOpen = !!open[job.company];
            const panelId = `role-${job.company.toLowerCase().replace(/\W+/g, "-")}`;
            return (
              <Reveal as="li" key={job.company} className="relative grid gap-3 pb-10 pl-7 sm:grid-cols-[11.5rem_1fr] sm:gap-0 sm:pl-0">
                <span
                  aria-hidden
                  className={`absolute left-0 top-2 size-2.5 -translate-x-1/2 rounded-full ring-4 ring-bg sm:left-[11.5rem] ${job.current ? "bg-accent-2 shadow-[0_0_14px_var(--accent-2)]" : "bg-line-2"}`}
                />
                <div className="pt-0.5 sm:pr-8 sm:text-right">
                  <p className="font-mono text-xs text-subtle">{job.dates}</p>
                  <p className="mt-1 text-sm text-muted">{job.place}</p>
                </div>

                <div className="sm:pl-10">
                  <div className="card glow-card p-5 sm:p-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        {job.role}{" "}
                        <span className="text-muted">
                          at{" "}
                          {job.url ? (
                            <a href={job.url} className="link-u text-fg">
                              {job.company}
                            </a>
                          ) : (
                            <span className="text-fg">{job.company}</span>
                          )}
                        </span>
                      </h3>
                      {job.current && <span className="chip border-accent-2/30 text-cyan-text">Current</span>}
                    </div>
                    <p className="mt-3 leading-relaxed text-muted">{job.summary}</p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                          className="overflow-hidden"
                        >
                          {job.highlights.map((h) => (
                            <li key={h} className="flex gap-3 pt-3 text-[0.95rem] leading-relaxed text-muted first:pt-5">
                              <span aria-hidden className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-accent-2" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                      <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                        {job.tech.map((t) => (
                          <li key={t} className="chip">
                            {t}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpen((o) => ({ ...o, [job.company]: !o[job.company] }))}
                        className="relative z-10 inline-flex items-center gap-1 text-sm text-accent-text hover:text-fg"
                      >
                        {isOpen ? "Less" : "Highlights"}
                        <ChevronDown className={`size-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal as="li" className="relative grid gap-3 pl-7 sm:grid-cols-[11.5rem_1fr] sm:pl-0">
            <span aria-hidden className="absolute left-0 top-2 size-2.5 -translate-x-1/2 rounded-full bg-line-2 ring-4 ring-bg sm:left-[11.5rem]" />
            <div className="pt-0.5 sm:pr-8 sm:text-right">
              <p className="font-mono text-xs text-subtle">2021 – 2022</p>
            </div>
            <div className="sm:pl-10">
              <h3 className="text-lg font-semibold tracking-tight">Earlier: internships</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {earlier.map((e) => (
                  <li key={e.company + e.dates} className="rounded-xl border border-line p-4">
                    <p className="font-medium">
                      {e.company} <span className="font-mono text-xs text-subtle">· {e.dates}</span>
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.text}</p>
                  </li>
                ))}
              </ul>
              <a href="https://linkedin.com/in/haroon-riasat-82659b1a7" className="mt-5 inline-flex items-center gap-1 text-sm text-muted hover:text-fg">
                Full history on LinkedIn <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
