import type { MetadataRoute } from "next";
import { CLIPageRoutes, UIPageRoutes } from "@/lib/pageroutes";
import { Settings } from "@/lib/meta";

const PageRoutes = CLIPageRoutes.concat(UIPageRoutes);

export default function sitemap(): MetadataRoute.Sitemap {
  return PageRoutes.map((page) => ({
    url: `${Settings.metadataBase}${page.href}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));
}
