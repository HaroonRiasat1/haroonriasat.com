import { ArrowUpRight, Brain, Cloud, Database, Layers, Server } from "lucide-react";
import { expertise, learning } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const icons = { layout: Layers, server: Server, brain: Brain, database: Database, cloud: Cloud };
// AI Engineering gets the wide tile; the rest share the grid.
const spans = ["md:col-span-2 lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];
const layout = [2, 0, 1, 3, 4];

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="expertise-title"
          eyebrow="Technical expertise"
          title={
            <>
              Tools I&apos;ve <span className="accent-serif text-gradient">shipped</span> with, not just tried.
            </>
          }
          lede="No percentages. Each group shows where I've actually used it."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {layout.map((k, i) => {
            const g = expertise[k];
            const Icon = icons[g.icon as keyof typeof icons];
            return (
              <Reveal key={g.group} delay={(i % 3) * 0.06} className={`card glow-card flex flex-col p-6 sm:p-7 ${spans[i]}`}>
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl border border-line-2 bg-surface-2 text-accent-text">
                    <Icon className="size-[1.15rem]" strokeWidth={1.6} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{g.group}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${g.group} core tools`}>
                  {g.core.map((t) => (
                    <li key={t} className="rounded-lg border border-line-2 bg-bg-2 px-3 py-1.5 text-[0.95rem] font-medium">
                      {t}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-subtle">Also: {g.also.join(" · ")}</p>
                <div className="flex-1" />
                <p className="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-muted">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent-text">In practice </span>
                  {g.usage}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-5">
          <div className="rounded-[1.25rem] border border-dashed border-line-2 p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="chip border-partial/30 text-partial">
                <span aria-hidden className="size-1.5 rounded-full bg-partial" /> Currently learning
              </span>
              <a href={learning.url} className="group inline-flex items-center gap-1 font-medium hover:text-accent-text">
                {learning.course}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="text-sm text-subtle">{learning.by}</span>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">{learning.summary}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {learning.groups.map((g) => (
                <div key={g.name}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-subtle">{g.name}</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {g.tools.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
