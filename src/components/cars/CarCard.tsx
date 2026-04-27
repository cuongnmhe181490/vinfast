import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import type { CarModel } from "@/data/schemas/car.schema";
import { formatSpec } from "@/lib/format";

export function CarCard({ car }: { car: CarModel }) {
  return (
    <article className="group rounded-[28px] border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft">
      <div className="relative grid aspect-[1.55] place-items-center overflow-hidden rounded-[22px] bg-gradient-to-br from-accent-soft via-white to-surface-soft">
        <div className="absolute inset-x-8 bottom-8 h-8 rounded-full bg-accent-strong/10 blur-xl" />
        <div className="relative h-20 w-52 rounded-[50%] bg-white shadow-2xl">
          <div className="absolute left-8 top-[-30px] h-16 w-36 rounded-t-[48px] bg-white/90 shadow-lg" />
          <div className="absolute bottom-[-16px] left-8 h-10 w-10 rounded-full bg-accent-strong ring-8 ring-surface-soft" />
          <div className="absolute bottom-[-16px] right-8 h-10 w-10 rounded-full bg-accent-strong ring-8 ring-surface-soft" />
        </div>
      </div>
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
