import type { CarModel } from "@/data/schemas/car.schema";
import { formatDimensions, formatPrice, formatSpec } from "@/lib/format";

export function CarSpecCard({ car }: { car: CarModel }) {
  const specs = [
    ["Giá niêm yết", formatPrice(car.priceListedVnd)],
    ["Quãng đường", formatSpec(car.rangeKm, `km ${car.rangeStandard ?? ""}`.trim())],
    ["Công suất", formatSpec(car.powerKw, "kW")],
    ["Mô-men xoắn", formatSpec(car.torqueNm, "Nm")],
    ["Dung lượng pin", formatSpec(car.batteryKwh, "kWh")],
    ["Kích thước", formatDimensions(car.dimensions)],
    ["Chiều dài cơ sở", formatSpec(car.wheelbaseMm, "mm")],
    ["Truyền động", car.drivetrain ?? "Đang cập nhật từ nguồn chính thức"],
  ];

  return (
    <section className="rounded-[28px] border border-line bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Thông số chính</p>
      <h2 className="mt-3 text-3xl font-semibold text-accent-strong">{car.name}</h2>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {specs.map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-surface-soft p-4">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-1 text-base font-semibold text-foreground">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
