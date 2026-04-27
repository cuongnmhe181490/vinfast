import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import { getAllCars } from "@/lib/data-loader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery ảnh xe và 3D demo hợp pháp",
  description: "Gallery ảnh xe có license, render studio tự tạo và mô phỏng 3D procedural cho showroom số demo VinFast.",
  path: "/gallery",
});

export default function GalleryPage() {
  const cars = getAllCars();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Gallery", url: "/gallery" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Gallery</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">Ảnh xe có license và mô phỏng 3D</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Website dùng ảnh xe từ Wikimedia Commons khi license phù hợp, kết hợp render studio và mô phỏng procedural. Đây không phải ảnh, logo hay model 3D chính thức của VinFast.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cars.map((car) => {
            const manifest = getVehicleAssetManifest(car.modelId);
            const visual = manifest.productPhoto ?? {
              url: manifest.renderImageUrl,
              alt: `Render demo tự tạo cho ${car.name}`,
              license: "Generated demo render",
              sourceName: "VF Showcase Demo",
              attribution: "Generated in repository",
            };

            return (
              <Link key={car.modelId} href={`/cars/${car.slug}`} className="group rounded-[28px] border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="relative grid aspect-[1.5] place-items-center overflow-hidden rounded-[22px] bg-gradient-to-br from-accent-soft via-white to-surface-soft">
                  <Image
                    src={visual.url}
                    alt={visual.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/82 px-3 py-1 text-xs font-semibold text-accent-strong backdrop-blur">
                    {car.name}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">
                  {visual.sourceName} · {visual.license}. {visual.attribution}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
