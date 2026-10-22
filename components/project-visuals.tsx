// Abstract previews for confidential client projects. They show the shape of the
// system, not the product, and are labelled as illustrations.

const bars = [8, 18, 30, 14, 26, 40, 22, 12, 34, 20, 44, 16, 28, 10, 36, 24, 14, 30, 18, 8, 26, 38, 16, 22];

function Skeleton({ w, accent = false }: { w: string; accent?: boolean }) {
  return <div className={`h-1.5 rounded-full ${accent ? "bg-accent/60" : "bg-line-2"}`} style={{ width: w }} />;
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">{children}</p>;
}

export function TranscriptVisual() {
  return (
    <div className="flex size-full items-center gap-4 p-6 sm:gap-6 sm:p-8">
      <div className="min-w-0 flex-1">
        <Label>Hearing audio</Label>
        <div className="flex h-14 items-center gap-[3px]">
          {bars.map((h, i) => (
            <span
              key={i}
              className="wave w-full max-w-1.5 rounded-full bg-gradient-to-t from-accent to-accent-2"
              style={{ height: `${h + 6}px`, animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
        <div className="mt-4 flex gap-2 font-mono text-[0.65rem] text-subtle">
          <span className="chip">Deepgram</span>
          <span className="chip">Claude</span>
        </div>
      </div>
      <div className="text-subtle" aria-hidden>
        →
      </div>
      <div className="w-[44%] shrink-0 rounded-xl border border-line-2 bg-bg-2 p-4 shadow-card">
        <Label>Structured notes</Label>
        <div className="space-y-2.5">
          <Skeleton w="45%" accent />
          <Skeleton w="92%" />
          <Skeleton w="80%" />
          <Skeleton w="38%" accent />
          <Skeleton w="88%" />
          <Skeleton w="64%" />
        </div>
      </div>
    </div>
  );
}

export function InspectionVisual() {
  return (
    <div className="flex size-full items-center gap-4 p-6 sm:p-8">
      <div className="flex-1 space-y-2.5">
        <Label>Checklist</Label>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg border border-line bg-bg-2/60 px-3 py-2">
            <span className={`grid size-4 place-items-center rounded ${i < 3 ? "bg-strong/80 text-[0.6rem] text-bg" : "border border-line-2"}`}>{i < 3 ? "✓" : ""}</span>
            <Skeleton w={`${[70, 55, 80, 45][i]}%`} />
          </div>
        ))}
      </div>
      <div className="w-[42%] shrink-0 rounded-xl border border-line-2 bg-bg-2 p-4 shadow-card">
        <Label>Generated report</Label>
        <div className="space-y-2.5">
          <Skeleton w="50%" accent />
          <Skeleton w="95%" />
          <Skeleton w="85%" />
          <Skeleton w="90%" />
          <Skeleton w="60%" />
        </div>
      </div>
    </div>
  );
}

export function SalesforceVisual() {
  return (
    <div className="flex size-full items-center justify-center gap-3 p-6 sm:gap-5 sm:p-8">
      <div className="rounded-xl border border-line-2 bg-bg-2 px-4 py-3 text-center shadow-card">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">CRM</p>
        <p className="mt-1 font-medium">Salesforce</p>
      </div>
      <div className="flex flex-col items-center gap-1 text-subtle">
        <span className="chip">OAuth</span>
        <span aria-hidden className="font-mono text-xs">⇄</span>
      </div>
      <div className="rounded-xl border border-accent/40 bg-bg-2 px-4 py-3 text-center shadow-[0_0_40px_-12px_var(--accent)]">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-subtle">React · Express</p>
        <p className="mt-1 font-medium">SCRUB</p>
        <div className="mt-2 flex items-end justify-center gap-1">
          {[10, 16, 12, 20, 14].map((h, i) => (
            <span key={i} className="w-1.5 rounded-sm bg-accent-2/70" style={{ height: h }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClinicVisual() {
  const rows = [
    { t: "09:00", w: "62%", tag: "Vitals" },
    { t: "10:30", w: "48%", tag: "Labs" },
    { t: "13:15", w: "70%", tag: "Procedure" },
  ];
  return (
    <div className="flex size-full items-center justify-center p-6 sm:p-8">
      <div className="w-full max-w-sm rounded-2xl border border-line-2 bg-bg-2 p-4 shadow-card">
        <div className="flex items-center justify-between">
          <Label>Today</Label>
          <span className="mb-3 font-mono text-[0.6rem] text-subtle">Room 2</span>
        </div>
        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.t} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2">
              <span className="font-mono text-[0.65rem] text-subtle">{r.t}</span>
              <Skeleton w={r.w} />
              <span className="ml-auto whitespace-nowrap rounded-full bg-accent/15 px-2 py-px font-mono text-[0.55rem] text-accent-text">{r.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const visuals = { transcript: TranscriptVisual, inspection: InspectionVisual, salesforce: SalesforceVisual, clinic: ClinicVisual };
