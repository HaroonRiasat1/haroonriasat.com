import type { MetadataRoute } from "next";
import { projects, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
