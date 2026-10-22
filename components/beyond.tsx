import { BookOpen, Mountain, PawPrint, Plane } from "lucide-react";
import { beyond } from "@/lib/content";
import { Reveal } from "./reveal";

const icons = { plane: Plane, mountain: Mountain, book: BookOpen, paw: PawPrint };

export function Beyond() {
  return (
    <section aria-labelledby="beyond-title" className="py-20 sm:py-24">
      <div className="container-x">
        <div className="card overflow-hidden p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <Reveal>
              <p className="eyebrow">Personal</p>
              <h2 id="beyond-title" className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Beyond the <span className="accent-serif text-gradient">code</span>
              </h2>
              <p className="mt-4 max-w-sm leading-relaxed text-muted">When I&apos;m not shipping, I&apos;m usually somewhere with a view, a book, or a cat.</p>
            </Reveal>
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {beyond.map((b, i) => {
                const Icon = icons[b.icon as keyof typeof icons];
                return (
                  <Reveal as="li" key={b.title} delay={i * 0.06} className="group rounded-2xl border border-line bg-bg-2/60 p-4 transition-colors hover:border-line-2 sm:p-5">
                    <Icon className="size-5 text-accent-text transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]" strokeWidth={1.6} />
                    <p className="mt-4 font-medium">{b.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{b.text}</p>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
