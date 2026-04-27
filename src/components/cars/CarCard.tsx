import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";
import { formatSpec } from "@/lib/format";

export function CarCard({ car, priority = false }: { car: CarModel; priority?: boolean }) {
  const manifest = getVehicleAssetManifest(car.modelId);
  const visual = manifest.productPhoto ?? {
    url: manifest.renderImageUrl,
    alt: `Ảnh render demo tự tạo cho ${car.name}, không phải ảnh chính thức của VinFast`,
    license: "Generated demo render",
  };

  return (
    <article className="group rounded-[28px] border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative grid aspect-[1.55] place-items-center overflow-hidden rounded-[22px] bg-gradient-to-br from-accent-soft via-white to-surface-soft">
        <Image
          src={visual.url}
          alt={visual.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-accent-strong backdrop-blur">
          {manifest.productPhoto ? "Ảnh CC" : "Demo render"}
        </span>
      </div>
      <p className="mt-3 truncate text-xs text-muted">
        {manifest.productPhoto ? `${manifest.productPhoto.sourceName} · ${manifest.productPhoto.license}` : visual.license}
      </p>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{car.segment}</p>
          <h2 className="mt-2 text-2xl font-semibold text-accent-strong">{car.name}</h2>
        </div>
        <span className="rounded-full bg-surface-soft px-3 py-1 text-xs font-semibold text-muted">
          {car.versions[0]}
        </span>
      </div>
      <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <Spec label="Quãng đường" value={formatSpec(car.rangeKm, "km")} />
        <Spec label="Công suất" value={formatSpec(car.powerKw, "kW")} />
        <Spec label="Pin" value={formatSpec(car.batteryKwh, "kWh")} />
        <Spec label="Số chỗ" value={formatSpec(car.seats, "chỗ")} />
      </dl>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted">
          <ShieldCheck size={15} aria-hidden />
          Confidence {car.confidenceScore.toFixed(1)}
        </span>
        <Link
          href={`/cars/${car.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-accent"
        >
          Xem chi tiết
          <ArrowRight size={16} aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-soft p-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="mt-1 font-semibold text-accent-strong">{value}</dd>
    </div>
  );
}
