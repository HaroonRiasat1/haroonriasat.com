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

export function FridgeVisual() {
  const items = [
    { w: "58%", due: "Today", tone: "bg-gap/15 text-gap" },
    { w: "44%", due: "2 days", tone: "bg-partial/15 text-partial" },
    { w: "66%", due: "5 days", tone: "bg-strong/15 text-strong" },
  ];
  return (
    <div className="flex size-full items-center justify-center gap-4 p-6 sm:p-8">
      <div className="w-48 shrink-0 rounded-[1.6rem] border border-line-2 bg-bg-2 p-3 shadow-card">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-line-2" />
        <Label>Expiring soon</Label>
        <div className="space-y-1.5">
          {items.map((it) => (
            <div key={it.due} className="flex items-center gap-2 rounded-lg border border-line px-2 py-1">
              <span className="size-4 shrink-0 rounded bg-accent/30" />
              <Skeleton w={it.w} />
              <span className={`ml-auto whitespace-nowrap rounded-full px-1.5 py-px font-mono text-[0.55rem] ${it.tone}`}>{it.due}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden w-36 rounded-xl border border-line-2 bg-bg-2 p-3 shadow-card sm:block">
        <Label>Recipe idea</Label>
        <div className="mb-3 h-12 rounded-lg bg-gradient-to-br from-accent/40 to-accent-2/40" />
        <div className="space-y-2">
          <Skeleton w="80%" accent />
          <Skeleton w="95%" />
          <Skeleton w="60%" />
        </div>
      </div>
    </div>
  );
}

export const visuals = { transcript: TranscriptVisual, inspection: InspectionVisual, salesforce: SalesforceVisual, fridge: FridgeVisual };
