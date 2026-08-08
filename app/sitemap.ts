import type { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { projects } from "@/lib/portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://velinno.com";

  const servicePages = services.map((service) => ({
    url: `${base}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const projectPages = projects.map((project) => ({
    url: `${base}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...servicePages,
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...projectPages,
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.7 },
  ];
}
