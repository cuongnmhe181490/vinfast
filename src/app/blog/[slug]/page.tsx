import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPosts, getBlogPost } from "@/data/blog";
import { getAllCars } from "@/lib/data-loader";
import { buildPageMetadata } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildPageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const cars = getAllCars().filter((car) => post.relatedCars.includes(car.modelId));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          inLanguage: "vi-VN",
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />
      <article className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Tư vấn</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">{post.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{post.description}</p>
        <div className="mt-10 grid max-w-3xl gap-5 text-lg leading-8 text-foreground">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-12 rounded-[28px] border border-line bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-accent-strong">Xe liên quan</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {cars.map((car) => (
              <Link key={car.modelId} href={`/cars/${car.slug}`} className="rounded-full bg-surface-soft px-4 py-2 text-sm font-semibold text-accent-strong">
                {car.name}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
