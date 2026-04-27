import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { blogPosts } from "@/data/blog";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog tư vấn xe điện VinFast",
  description: "Các bài viết SEO demo về so sánh xe, ADAS và cách đọc thông số xe điện.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Blog", url: "/blog" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Blog SEO</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">Bài viết tư vấn có internal link tới xe liên quan</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-[28px] border border-line bg-white p-6 shadow-sm transition hover:shadow-soft">
              <h2 className="text-2xl font-semibold text-accent-strong">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{post.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
