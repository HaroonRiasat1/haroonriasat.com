// Latest posts from Haroon's Medium feed, fetched on the server and revalidated hourly.
// The static list is the fallback if Medium is unreachable at build or revalidation time.

export interface Post {
  title: string;
  url: string;
  date: string;
  minutes: number;
}

const FEED = "https://medium.com/feed/@haroonriasatali";

const fallback: Post[] = [
  { title: "Discovering the World of DevOps: A Journey through a DevOps Course at FAST NU", url: "https://medium.com/@haroonriasatali/discovering-the-world-of-devops-a-journey-through-a-devops-course-at-fast-nu-a005b531a627", date: "Jun 2023", minutes: 2 },
  { title: "Seamlessly Integrating Buildah and Kubernetes: A Comprehensive Guide", url: "https://medium.com/@haroonriasatali/seamlessly-integrating-buildah-and-kubernetes-a-comprehensive-guide-c7e3d20c3a0", date: "May 2023", minutes: 2 },
  { title: "Buildah: Crafting Containers Without Dockerfiles", url: "https://medium.com/@haroonriasatali/title-buildah-crafting-containers-without-dockerfiles-699fe331e86c", date: "Mar 2023", minutes: 3 },
  { title: "Swift UI Programming", url: "https://medium.com/@haroonriasatali/swift-ui-programming-50b8973a9fc9", date: "Mar 2023", minutes: 4 },
  { title: "Creating and Accessing a Cloud-hosted Linux Virtual Machine using Digital Ocean", url: "https://medium.com/@haroonriasatali/creating-and-accessing-a-cloud-hosted-linux-virtual-machine-using-digital-ocean-5d0e0e1e1141", date: "Feb 2023", minutes: 3 },
  { title: "Kaniko: Daemon Less Savior", url: "https://medium.com/@haroonriasatali/kaniko-daemon-less-savior-de0f356fa1b7", date: "Feb 2023", minutes: 2 },
];

const decode = (s: string) =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&(amp|lt|gt|quot|#39|apos);/g, (m) => ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&apos;": "'" })[m]!);

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1]).trim() : "";
};

export function parseFeed(xml: string, limit = 6): Post[] {
  return xml
    .split("<item>")
    .slice(1)
    .map((chunk) => chunk.split("</item>")[0])
    .slice(0, limit)
    .map((item) => {
      const words = tag(item, "content:encoded").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
      const date = new Date(tag(item, "pubDate"));
      return {
        title: tag(item, "title"),
        url: tag(item, "link").split("?")[0],
        date: Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" }),
        minutes: Math.max(1, Math.round(words / 220)),
      };
    })
    .filter((p) => p.title && p.url.startsWith("https://medium.com/"));
}

export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(FEED, { headers: { "User-Agent": "haroonriasat.com" }, next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    const posts = parseFeed(await res.text());
    return posts.length ? posts : fallback;
  } catch {
    return fallback;
  }
}
