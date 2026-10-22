"use client";

import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { moreOnGithub, projects, site, type Project } from "@/lib/content";
import { GithubIcon } from "./icons";
import { visuals } from "./project-visuals";
import { ease } from "./reveal";
import { SectionHeading } from "./section-heading";

// Asymmetric bento: wide and narrow cards alternate on large screens.
const order = ["council-tap", "kinwell", "subqc-ai", "ai-resume-assistant", "wild-frequencies", "fridge", "sunridge", "scrub"];
const span = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];

function Preview({ p }: { p: Project }) {
  if (p.image) {
    return (
      <Image
        src={p.image}
        alt={p.imageAlt ?? ""}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover object-top transition-[transform,object-position] duration-[1.6s] ease-out group-hover:scale-[1.03] group-hover:object-[50%_22%]"
      />
    );
  }
  const Visual = p.visual ? visuals[p.visual] : null;
  return (
    <>
      {Visual && <Visual />}
      <span className="absolute right-3 top-3 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-subtle">Illustration</span>
    </>
  );
}

function Card({ p, index }: { p: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease, delay: (index % 2) * 0.08 }}
      className={`card glow-card group flex flex-col overflow-hidden ${span[index]}`}
      aria-labelledby={`p-${p.slug}`}
    >
      <div className="relative h-56 overflow-hidden border-b border-line bg-[radial-gradient(120%_120%_at_0%_0%,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_60%),var(--bg-2)] sm:h-72">
        <Preview p={p} />
        {p.image && <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg/60 to-transparent" />}
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-7">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-mono text-subtle">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-accent-text">{p.category}</span>
          <span className="text-subtle">·</span>
          <span className="text-muted">{p.kind}</span>
        </div>
        <h3 id={`p-${p.slug}`} className="mt-3 text-2xl font-semibold tracking-tight">
          {p.name}
        </h3>
        <p className="mt-2 leading-relaxed text-fg/85">{p.problem}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <span className="text-subtle">My role: </span>
          {p.role}
        </p>
        {p.outcome && (
          <p className="mt-1.5 text-sm leading-relaxed text-muted">
            <span className="text-subtle">Outcome: </span>
            {p.outcome}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
          {p.caseStudy && (
            <Link href={`/projects/${p.slug}`} className="group/l inline-flex items-center gap-1.5 font-medium text-fg">
              Case study <ArrowRight className="size-4 transition-transform group-hover/l:translate-x-0.5" />
            </Link>
          )}
          {p.demo && (
            <a href={p.demo} className="inline-flex items-center gap-1 text-muted hover:text-fg">
              Live <ArrowUpRight className="size-3.5" />
            </a>
          )}
          {p.repo && (
            <a href={p.repo} className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <GithubIcon className="size-3.5" /> Code
            </a>
          )}
          {p.repos?.map((r) => (
            <a key={r.href} href={r.href} className="inline-flex items-center gap-1.5 text-muted hover:text-fg">
              <GithubIcon className="size-3.5" /> {r.label}
            </a>
          ))}
          {p.confidential && (
            <span className="inline-flex items-center gap-1.5 text-subtle">
              <Lock className="size-3.5" /> {p.kind === "Client work" ? "Client work under NDA" : "Private repository"}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const list = order.map((slug) => projects.find((p) => p.slug === slug)!);
  return (
    <section id="work" aria-labelledby="work-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          title={
            <>
              Products I&apos;ve <span className="accent-serif text-gradient">built</span>, and why.
            </>
          }
          lede="Client platforms, AI systems and things I made for fun. Client work stays confidential, so those previews are illustrations, not screenshots."
        />
        <div className="grid gap-5 lg:grid-cols-12">
          {list.map((p, i) => (
            <Card key={p.slug} p={p} index={i} />
          ))}
        </div>
        <p className="mt-10 text-muted">
          More on{" "}
          <a href={site.github} className="link-u text-fg">
            GitHub
          </a>
          : {moreOnGithub.join(", ")}.
        </p>
      </div>
    </section>
  );
}
