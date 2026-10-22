import { Brain, Cloud, Database, Layers, Server } from "lucide-react";
import { expertise } from "@/lib/content";
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
      </div>
    </section>
  );
}
