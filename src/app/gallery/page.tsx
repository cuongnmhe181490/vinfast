import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import { getAllCars } from "@/lib/data-loader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Gallery render và 3D demo hợp pháp",
  description: "Gallery render tự tạo và model 3D CC0 cho showroom số demo VinFast.",
  path: "/gallery",
});

export default function GalleryPage() {
  const cars = getAllCars();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Gallery", url: "/gallery" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Gallery</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">Render demo và 3D CC0, tách bạch bản quyền</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Website dùng render tự tạo và GLB generic CC0 để trình diễn trải nghiệm showroom số. Đây không phải ảnh, logo hay model 3D chính thức của VinFast.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cars.map((car) => {
            const manifest = getVehicleAssetManifest(car.modelId);

            return (
              <Link key={car.modelId} href={`/cars/${car.slug}`} className="group rounded-[28px] border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
                <div className="relative grid aspect-[1.5] place-items-center overflow-hidden rounded-[22px] bg-gradient-to-br from-accent-soft via-white to-surface-soft">
                  <Image
                    src={manifest.renderImageUrl}
                    alt={`Ảnh render demo tự tạo cho ${car.name}, không phải ảnh chính thức của VinFast`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/82 px-3 py-1 text-xs font-semibold text-accent-strong backdrop-blur">
                    {car.name}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted">{manifest.license}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
