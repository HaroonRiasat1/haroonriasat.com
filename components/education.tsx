import { ArrowUpRight, Award, GraduationCap, Users } from "lucide-react";
import { awards, certifications, education, leadership } from "@/lib/content";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="education-title"
          eyebrow="Education, leadership & achievements"
          title={
            <>
              Learning, leading, and the odd <span className="accent-serif text-gradient">trophy</span>.
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.degree} delay={i * 0.08} className="card glow-card p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <GraduationCap className="size-6 text-accent-text" strokeWidth={1.5} />
                <span className="font-mono text-xs text-subtle">{e.years}</span>
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{e.degree}</h3>
              <p className="mt-1 text-muted">
                {e.school} · {e.place}
              </p>
              <p className="mt-1 font-mono text-sm text-cyan-text">{e.grade}</p>
              <p className="mt-4 leading-relaxed text-muted">{e.text}</p>
              {e.link && (
                <a href={e.link.href} className="relative z-10 mt-4 inline-flex items-center gap-1 text-sm text-accent-text hover:text-fg">
                  {e.link.label} <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Reveal>
              <h3 className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-wider text-muted">
                <Users className="size-4 text-accent-text" /> Leadership
              </h3>
            </Reveal>
            <ol className="mt-5 border-t border-line">
              {leadership.map((l, i) => (
                <Reveal as="li" key={l.title} delay={i * 0.05} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[7rem_1fr] sm:gap-6">
                  <span className="font-mono text-xs text-subtle sm:pt-1">{l.when}</span>
                  <div>
                    <p className="font-medium leading-snug">{l.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{l.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div>
            <Reveal>
              <h3 className="flex items-center gap-2.5 text-sm font-medium uppercase tracking-wider text-muted">
                <Award className="size-4 text-accent-text" /> Awards & recognition
              </h3>
            </Reveal>
            <ol className="mt-5 border-t border-line">
              {awards.map((a, i) => (
                <Reveal as="li" key={a.title} delay={i * 0.05} className="flex gap-4 border-b border-line py-5">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-accent to-accent-2" />
                  <div>
                    <p className="font-medium leading-snug">{a.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal>
              <p className="mt-5 text-sm text-subtle">Certifications: {certifications.join(" · ")}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
