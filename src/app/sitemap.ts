import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog";
import { getAllCars } from "@/lib/data-loader";

const baseUrl = "https://vf-showcase-demo.local";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/cars", "/compare", "/technology", "/battery-charging", "/safety", "/gallery", "/blog"];
  const carRoutes = getAllCars().map((car) => `/cars/${car.slug}`);
  const blogRoutes = blogPosts.map((post) => `/blog/${post.slug}`);

  return [...staticRoutes, ...carRoutes, ...blogRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-04-27"),
    changeFrequency: route.includes("/blog") ? "monthly" : "weekly",
    priority: route === "" ? 1 : route.startsWith("/cars/") ? 0.85 : 0.7,
  }));
}
