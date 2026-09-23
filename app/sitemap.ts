import { MetadataRoute } from "next";
import { departments } from "@/data/departments";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jerichosda.church";

  // List all regular public pages
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/bulletin",
    "/giving",
    "/estates",
    "/care",
    "/camp-meeting",
    "/events",
    "/ministries",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "/bulletin" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Automatically adds all 17 department pages into Google's map
  const departmentRoutes: MetadataRoute.Sitemap = departments.map((dept) => ({
    url: `${baseUrl}/departments/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...departmentRoutes];
}