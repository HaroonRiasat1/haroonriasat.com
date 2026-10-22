import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x">
        <p aria-hidden className="select-none overflow-hidden whitespace-nowrap bg-gradient-to-b from-line-2 to-transparent bg-clip-text pt-12 text-center text-[clamp(2.5rem,11.2vw,10.5rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-transparent">
          HAROON RIASAT
        </p>
        <div className="flex flex-col gap-3 py-8 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Haroon Riasat · {site.location}</p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={site.cv} download className="hover:text-fg">
              CV (PDF)
            </a>
            <a href={site.askUrl} className="hover:text-fg">
              ask.haroonriasat.com
            </a>
            <a href="#main" className="hover:text-fg">
              Back to top ↑
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
