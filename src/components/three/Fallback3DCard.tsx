import type { CarModel } from "@/data/schemas/car.schema";
import { formatSpec } from "@/lib/format";

type Fallback3DCardProps = {
  car: CarModel;
  reason?: string;
};

export function Fallback3DCard({ car, reason = "Thiết bị đang dùng chế độ nhẹ hoặc không hỗ trợ WebGL ổn định." }: Fallback3DCardProps) {
  return (
    <div
      data-testid="viewer-fallback"
      className="grid h-full min-h-[360px] place-items-center rounded-[28px] border border-line bg-gradient-to-br from-white to-accent-soft/50 p-6"
    >
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Fallback 3D</p>
        <h2 className="mt-3 text-3xl font-semibold text-accent-strong">{car.name}</h2>
        <p className="mt-3 text-sm leading-6 text-muted">{reason}</p>
        <dl className="mt-6 grid grid-cols-2 gap-3 text-left text-sm">
          <div className="rounded-2xl bg-white/75 p-4">
            <dt className="text-muted">Quãng đường</dt>
            <dd className="font-semibold">{formatSpec(car.rangeKm, "km")}</dd>
          </div>
          <div className="rounded-2xl bg-white/75 p-4">
            <dt className="text-muted">Công suất</dt>
            <dd className="font-semibold">{formatSpec(car.powerKw, "kW")}</dd>
          </div>
          <div className="rounded-2xl bg-white/75 p-4">
            <dt className="text-muted">Số chỗ</dt>
            <dd className="font-semibold">{formatSpec(car.seats, "chỗ")}</dd>
          </div>
          <div className="rounded-2xl bg-white/75 p-4">
            <dt className="text-muted">Pin</dt>
            <dd className="font-semibold">{formatSpec(car.batteryKwh, "kWh")}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
