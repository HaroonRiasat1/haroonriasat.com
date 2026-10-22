import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { GithubIcon } from "@/components/icons";
import { Nav } from "@/components/nav";
import { visuals } from "@/components/project-visuals";
import { Reveal } from "@/components/reveal";
import { projects, site } from "@/lib/content";

const withCase = projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return withCase.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = withCase.find((x) => x.slug === slug);
  if (!p) return {};
  const description = `${p.caseStudy!.intro} ${p.problem}`;
  return {
    title: `${p.name} case study`,
    description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: `${p.name} · Haroon Riasat`, description, url: `${site.url}/projects/${p.slug}`, type: "article" },
  };
}

function Block({ title, children, index }: { title: string; children: React.ReactNode; index: number }) {
  return (
    <Reveal as="section" className="grid gap-4 border-t border-line py-10 md:grid-cols-[14rem_1fr] md:gap-10">
      <h2 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight">
        <span className="font-mono text-xs text-subtle">{String(index).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="max-w-2xl space-y-4 leading-relaxed text-muted">{children}</div>
    </Reveal>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = withCase.find((x) => x.slug === slug);
  if (!p?.caseStudy) notFound();
  const cs = p.caseStudy;
  const next = withCase[(withCase.indexOf(p) + 1) % withCase.length];
  const Visual = p.visual ? visuals[p.visual] : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: cs.intro,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/projects/${p.slug}`,
    keywords: p.tech.join(", "),
    ...(p.demo ? { sameAs: p.demo } : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav home={false} />
      <main id="main" className="pt-28 sm:pt-36">
        <article className="container-x">
          <Reveal>
            <Link href="/#work" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              <ArrowLeft className="size-4" /> All work
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-10 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-accent-text">{p.category}</span>
              <span className="text-subtle">·</span>
              <span className="text-muted">{p.kind}</span>
            </p>
            <h1 className="mt-4 text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.045em]">{p.name}</h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted">{cs.intro}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="mt-10 grid gap-6 border-y border-line py-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-subtle">Role</dt>
                <dd className="mt-2 text-sm leading-relaxed">{p.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-subtle">Stack</dt>
                <dd className="mt-2 text-sm leading-relaxed">{p.tech.join(", ")}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-wider text-subtle">Links</dt>
                <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {p.demo && (
                    <a href={p.demo} className="inline-flex items-center gap-1 text-accent-text hover:text-fg">
                      Live <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} className="inline-flex items-center gap-1.5 text-accent-text hover:text-fg">
                      <GithubIcon className="size-3.5" /> Code
                    </a>
                  )}
                  {p.confidential && (
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <Lock className="size-3.5" /> Under NDA
                    </span>
                  )}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="card relative mt-10 aspect-[16/10] overflow-hidden bg-bg-2 sm:aspect-[16/8]">
              {p.image ? (
                <Image src={p.image} alt={p.imageAlt ?? ""} fill priority sizes="(min-width: 1216px) 1152px, 100vw" className="object-cover object-top" />
              ) : (
                Visual && (
                  <>
                    <div className="absolute inset-0 grid place-items-center">
                      <div className="h-full w-full max-w-3xl">
                        <Visual />
                      </div>
                    </div>
                    <span className="absolute right-4 top-4 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">Illustration</span>
                  </>
                )
              )}
            </div>
          </Reveal>

          <div className="mt-16">
            <Block index={1} title="The problem">
              {cs.problem.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>
            <Block index={2} title="The solution">
              {cs.solution.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>
            <Block index={3} title="Architecture">
              <ol className="relative space-y-5 border-l border-line pl-6">
                {cs.architecture.map((a) => (
                  <li key={a.step} className="relative">
                    <span aria-hidden className="absolute -left-[1.72rem] top-1.5 size-2.5 rounded-full border-2 border-bg bg-accent-2" />
                    <p className="font-medium text-fg">{a.step}</p>
                    <p className="mt-1">{a.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>
            <Block index={4} title="Engineering challenges">
              <div className="grid gap-4 sm:grid-cols-2">
                {cs.challenges.map((c) => (
                  <div key={c.title} className="rounded-xl border border-line bg-surface p-4">
                    <p className="font-medium text-fg">{c.title}</p>
                    <p className="mt-1.5 text-sm">{c.text}</p>
                  </div>
                ))}
              </div>
            </Block>
            <Block index={5} title="My responsibilities">
              <ul className="flex flex-wrap gap-2">
                {cs.responsibilities.map((r) => (
                  <li key={r} className="chip text-sm">
                    {r}
                  </li>
                ))}
              </ul>
            </Block>
            <Block index={6} title="Outcome">
              {cs.outcome.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>
          </div>

          <Link href={`/projects/${next.slug}`} className="card glow-card group mt-10 mb-24 flex items-center justify-between gap-6 p-6 sm:p-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-subtle">Next case study</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{next.name}</p>
            </div>
            <ArrowRight className="size-6 shrink-0 text-accent-text transition-transform group-hover:translate-x-1" />
          </Link>
        </article>
      </main>
      <Footer />
    </>
  );
}
