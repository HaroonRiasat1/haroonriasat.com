// The AI features call the resume-chatbot backend (ask.haroonriasat.com), which
// allows haroonriasat.com and localhost:5195 through CORS. In local development the
// backend runs on port 5190.
export function apiBase(): string {
  if (typeof window !== "undefined" && window.location.hostname === "localhost") return "http://localhost:5190";
  return "https://ask.haroonriasat.com";
}

const escapeHtml = (t: string) =>
  t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Tiny markdown for AI answers: paragraphs, bullet lists and **bold**. Everything is
// escaped first, so model output can never inject HTML.
export function renderMarkdown(text: string): string {
  const out: string[] = [];
  let list: string[] = [];
  const inline = (t: string) => escapeHtml(t).replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  const flush = () => {
    if (list.length) out.push(`<ul>${list.map((l) => `<li>${inline(l)}</li>`).join("")}</ul>`);
    list = [];
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    const m = line.match(/^[-*•]\s+(.*)/);
    if (m) list.push(m[1]);
    else {
      flush();
      if (line) out.push(`<p>${inline(line)}</p>`);
    }
  }
  flush();
  return out.join("");
}
