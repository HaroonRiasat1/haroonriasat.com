import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/content";
import type { Post } from "@/lib/medium";
import { MediumIcon } from "./icons";
import { Reveal } from "./reveal";

export function Writing({ posts }: { posts: Post[] }) {
  return (
    <section id="writing" aria-labelledby="writing-title" className="py-20 sm:py-24">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow">Writing</p>
          <h2 id="writing-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Notes from <span className="accent-serif text-gradient">the terminal</span>
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed text-muted">Short pieces on DevOps, containers and iOS, written while I was learning them.</p>
          <a href={site.medium} className="mt-6 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
            <MediumIcon className="size-4" /> All posts on Medium <ArrowUpRight className="size-3.5" />
          </a>
        </Reveal>
        <ul className="border-t border-line">
          {posts.map((p, i) => (
            <Reveal as="li" key={p.url} delay={i * 0.04}>
              <a href={p.url} className="group grid grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-4 transition-colors hover:bg-surface sm:grid-cols-[5.5rem_1fr_auto] sm:px-2">
                <span className="font-mono text-xs text-subtle">{p.date}</span>
                <span className="font-medium leading-snug transition-colors group-hover:text-accent-text">{p.title}</span>
                <span className="inline-flex items-center gap-1 whitespace-nowrap font-mono text-xs text-subtle">
                  {p.minutes} min <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
