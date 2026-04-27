import Image from "next/image";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";

export function CarGallery({ car }: { car: CarModel }) {
  const manifest = getVehicleAssetManifest(car.modelId);

  return (
    <section className="section-shell py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Gallery</p>
      <h2 className="mt-3 text-3xl font-semibold text-accent-strong">Render demo và asset hợp pháp</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {car.gallery.map((item) => (
          <figure key={item.label} className="rounded-[28px] border border-line bg-white p-5 shadow-sm">
            <div className="relative grid aspect-[1.45] place-items-center overflow-hidden rounded-[22px] bg-gradient-to-br from-accent-soft via-white to-surface-soft">
              <Image
                src={item.url ?? manifest.renderImageUrl}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/82 px-3 py-1 text-xs font-semibold text-accent-strong backdrop-blur">
                {item.label}
              </span>
            </div>
            <figcaption className="mt-4 text-sm leading-6 text-muted">{item.alt}</figcaption>
            <p className="mt-3 text-xs font-semibold text-accent-strong">License: {item.license}</p>
          </figure>
        ))}
        <figure className="rounded-[28px] border border-line bg-white p-5 shadow-sm">
          <div className="grid aspect-[1.45] place-items-center rounded-[22px] bg-accent-strong p-6 text-white">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">3D source</p>
              <p className="mt-3 text-xl font-semibold">Kenney Car Kit CC0</p>
              <p className="mt-2 text-sm leading-6 text-white/74">
                Model GLB generic dùng để demo viewer, không phải model chính thức của VinFast.
              </p>
            </div>
          </div>
          <figcaption className="mt-4 text-sm leading-6 text-muted">
            Viewer dùng GLB CC0 làm exterior demo và các cụm procedural để mô phỏng pin, nội thất, cửa, cốp và exploded view.
          </figcaption>
          <p className="mt-3 text-xs font-semibold text-accent-strong">License: {manifest.license}</p>
        </figure>
      </div>
    </section>
  );
}
