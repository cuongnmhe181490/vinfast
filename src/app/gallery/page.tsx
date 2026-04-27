import type { Metadata } from "next";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getAllCars } from "@/lib/data-loader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery 3D placeholder",
  description: "Gallery asset manifest hợp pháp cho showroom số demo VinFast.",
  path: "/gallery",
});

export default function GalleryPage() {
  const cars = getAllCars();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Gallery", url: "/gallery" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Gallery</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">Asset demo tách bạch bản quyền</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Website không bundle logo, hình ảnh hay model 3D VinFast có bản quyền. Tất cả khối xe hiện tại là placeholder generated primitives.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cars.map((car) => (
            <Link key={car.modelId} href={`/cars/${car.slug}`} className="rounded-[28px] border border-line bg-white p-5 shadow-sm transition hover:shadow-soft">
              <div className="grid aspect-[1.5] place-items-center rounded-[22px] bg-gradient-to-br from-accent-soft via-white to-surface-soft">
                <span className="text-xl font-semibold text-accent-strong">{car.name}</span>
              </div>
              <p className="mt-4 text-sm text-muted">{car.gallery[0]?.license}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
