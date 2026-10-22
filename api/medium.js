// GET /api/medium: latest posts from Haroon's Medium feed for the Writing section.
// Cached at Vercel's edge for an hour; the page ships a static list as fallback.
const FEED = "https://medium.com/feed/@haroonriasatali";

const decode = (s) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&(amp|lt|gt|quot|#39|apos);/g, (m) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" })[m]);

const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]).trim() : "";
};

export function parseFeed(xml, limit = 8) {
  const items = xml.split("<item>").slice(1).map((chunk) => chunk.split("</item>")[0]);
  return items.slice(0, limit).map((item) => {
    const words = tag(item, "content:encoded").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    const date = new Date(tag(item, "pubDate"));
    return {
      title: tag(item, "title"),
      url: tag(item, "link").split("?")[0],
      date: Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }),
      minutes: Math.max(1, Math.round(words / 220)),
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => decode(m[1]).trim()),
    };
  }).filter((p) => p.title && p.url.startsWith("https://medium.com/"));
}

export async function GET() {
  try {
    const res = await fetch(FEED, { headers: { "User-Agent": "haroonriasat.com" } });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const posts = parseFeed(await res.text());
    return Response.json(
      { posts },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (err) {
    console.error("medium feed failed", err);
    return Response.json({ posts: [] }, { status: 502, headers: { "Cache-Control": "public, s-maxage=300" } });
  }
}
