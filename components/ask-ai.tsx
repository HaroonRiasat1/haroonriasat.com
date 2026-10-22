"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { apiBase, renderMarkdown } from "@/lib/api";
import { askExamples, site } from "@/lib/content";
import { Reveal, ease } from "./reveal";

interface Turn {
  q: string;
  a: string;
  status: "waiting" | "streaming" | "done" | "error";
  sources?: string[];
}

export function AskAI() {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const history = useRef<{ role: "user" | "assistant"; content: string }[]>([]);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [turns]);

  const update = (i: number, patch: Partial<Turn>) => setTurns((t) => t.map((x, k) => (k === i ? { ...x, ...patch } : x)));

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setBusy(true);
    setInput("");
    const index = turns.length;
    setTurns((t) => [...t, { q, a: "", status: "waiting" }]);
    try {
      const res = await fetch(`${apiBase()}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, history: history.current.slice(-4) }),
      });
      if (!res.ok || !res.body) throw new Error(res.status === 429 ? "busy" : "down");
      const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
      let text = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        text += value;
        update(index, { a: text, status: "streaming" });
      }
      let sources: string[] = [];
      try {
        sources = JSON.parse(decodeURIComponent(res.headers.get("X-Sources") || "[]"));
      } catch {
        // header missing or malformed: just skip sources
      }
      const refused = /I don't know|I can only answer/.test(text);
      update(index, { a: text, status: "done", sources: refused ? [] : sources });
      history.current.push({ role: "user", content: q }, { role: "assistant", content: text });
    } catch (err) {
      update(index, {
        status: "error",
        a:
          (err as Error).message === "busy"
            ? "That's a lot of questions at once. Give it a minute, or email me."
            : "The AI isn't reachable right now. Try the full chat at ask.haroonriasat.com, or email me.",
      });
    }
    setBusy(false);
  }

  return (
    <section id="ask" aria-labelledby="ask-title" className="relative py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-[28rem] max-w-4xl rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)] blur-3xl" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">AI resume assistant</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 id="ask-title" className="h-section mt-4">
              Curious about my experience? <span className="accent-serif text-gradient">Ask my AI.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              This is the real assistant I built, not a demo. It answers only from my resume, cites the sections it used, and says &ldquo;I
              don&apos;t know&rdquo; rather than guess.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-strong" /> Grounded with hybrid vector and keyword retrieval
              </li>
              <li className="flex gap-3">
                <Sparkles className="mt-0.5 size-4 shrink-0 text-accent-text" /> Streams answers from OpenAI, with open-source fallbacks
              </li>
            </ul>
            <a href={site.askUrl} className="btn btn-ghost mt-8">
              Open the full experience <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="card flex h-[34rem] flex-col overflow-hidden bg-bg-2/80 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-semibold text-white">
                  HR
                </span>
                <div>
                  <p className="text-sm font-medium leading-tight">Haroon&apos;s resume</p>
                  <p className="flex items-center gap-1.5 text-xs text-subtle">
                    <span className="live-dot !size-1.5" aria-hidden /> Online · answers from the resume only
                  </p>
                </div>
              </div>
            </div>

            <div ref={threadRef} className="flex-1 space-y-5 overflow-y-auto px-5 py-6" aria-live="polite" aria-label="Conversation">
              {turns.length === 0 && (
                <div className="flex h-full flex-col justify-end">
                  <p className="mb-4 text-sm text-subtle">Try one of these:</p>
                  <div className="flex flex-col items-start gap-2">
                    {askExamples.map((q, i) => (
                      <motion.button
                        key={q}
                        type="button"
                        onClick={() => ask(q)}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 + i * 0.07, ease }}
                        className="rounded-2xl rounded-bl-md border border-line-2 bg-surface px-4 py-2.5 text-left text-sm text-fg/90 transition-colors hover:border-accent/60 hover:bg-surface-2"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
              <AnimatePresence initial={false}>
                {turns.map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className="space-y-3">
                    <div className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-sm text-on-accent">{t.q}</div>
                    <div
                      className={`max-w-[92%] rounded-2xl rounded-bl-md border px-4 py-3 text-sm leading-relaxed ${
                        t.status === "error" ? "border-gap/40 text-gap" : "border-line bg-surface text-muted"
                      }`}
                    >
                      {t.status === "waiting" ? (
                        <span className="inline-flex items-center gap-2 text-subtle">
                          Reading my resume <span className="caret" />
                        </span>
                      ) : t.status === "error" ? (
                        t.a
                      ) : (
                        <div className="prose-chat" dangerouslySetInnerHTML={{ __html: renderMarkdown(t.a) }} />
                      )}
                      {t.sources && t.sources.length > 0 && (
                        <p className="mt-3 border-t border-line pt-2 font-mono text-[0.7rem] text-subtle">From: {t.sources.join(" · ")}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form
              className="flex items-center gap-2 border-t border-line p-3"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <label htmlFor="ask-input" className="sr-only">
                Ask a question about Haroon
              </label>
              <input
                id="ask-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={400}
                autoComplete="off"
                placeholder="Ask about projects, skills, experience…"
                className="field h-11 rounded-full px-4 text-[0.95rem]"
              />
              <button type="submit" disabled={busy || !input.trim()} aria-label="Send question" className="btn btn-primary size-11 shrink-0 !px-0">
                <ArrowUp className="size-4" />
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
