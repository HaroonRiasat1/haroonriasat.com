import { Reveal } from "./reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl sm:mb-14">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 id={id} className="h-section mt-4">
          {title}
        </h2>
      </Reveal>
      {lede && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
