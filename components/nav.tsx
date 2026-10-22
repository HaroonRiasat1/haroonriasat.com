"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "ask", label: "Ask my AI" },
  { id: "expertise", label: "Expertise" },
  { id: "fit", label: "Hiring?" },
  { id: "contact", label: "Contact" },
];

export function Nav({ home = true }: { home?: boolean }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in the middle of the viewport.
  useEffect(() => {
    if (!home) return;
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [home]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        solid || open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <motion.div aria-hidden className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-accent to-accent-2" style={{ scaleX: progress }} />
      <nav aria-label="Main" className="container-x flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5 font-medium tracking-tight" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-lg border border-line-2 bg-surface-2 font-mono text-[0.8rem] text-fg transition-colors group-hover:border-accent">
            HR
          </span>
          <span className="hidden sm:inline">Haroon Riasat</span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={href(l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${active === l.id ? "text-fg" : "text-muted hover:text-fg"}`}
              >
                {active === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-surface-2 ring-1 ring-line" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={site.cv} download className="btn btn-ghost hidden h-10 text-sm sm:inline-flex">
            <Download className="size-4" /> CV
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-fg lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <ul className="container-x flex h-[calc(100dvh-4rem)] flex-col gap-1 pb-8 pt-4">
              {links.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a href={href(l.id)} onClick={() => setOpen(false)} className="flex items-baseline justify-between border-b border-line py-4 text-2xl font-medium tracking-tight">
                    {l.label}
                    <span className="font-mono text-xs text-subtle">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li className="mt-6">
                <a href={site.cv} download className="btn btn-primary w-full">
                  <Download className="size-4" /> Download CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
