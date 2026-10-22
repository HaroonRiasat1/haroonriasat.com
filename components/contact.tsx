"use client";

import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/content";
import { GithubIcon, LinkedinIcon, MediumIcon } from "./icons";
import { Reveal } from "./reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden pt-24 pb-16 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[30rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-2xl" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">Contact</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="contact-title" className="mt-6 max-w-5xl text-[clamp(2.4rem,6.5vw,5.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
            Have an interesting idea? <span className="accent-serif text-gradient">Let&apos;s build something meaningful.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <a href={`mailto:${site.email}`} className="btn btn-primary h-12 px-6 text-base">
              <Mail className="size-4" /> {site.email}
            </a>
            <button type="button" onClick={copy} className="btn btn-ghost h-12" aria-live="polite">
              {copied ? <Check className="size-4 text-strong" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-muted">
            <li>
              <a href={site.linkedin} className="inline-flex items-center gap-2 hover:text-fg">
                <LinkedinIcon className="size-4" /> LinkedIn <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            <li>
              <a href={site.github} className="inline-flex items-center gap-2 hover:text-fg">
                <GithubIcon className="size-4" /> GitHub <ArrowUpRight className="size-3.5" />
              </a>
            </li>
            <li>
              <a href={site.medium} className="inline-flex items-center gap-2 hover:text-fg">
                <MediumIcon className="size-4" /> Medium <ArrowUpRight className="size-3.5" />
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
