import type { CarModel } from "@/data/schemas/car.schema";
import { compactList, formatDimensions, formatPrice, formatSpec } from "@/lib/format";

export function CarSpecsTable({ car }: { car: CarModel }) {
  const rows = [
    ["Phiên bản", car.versions.join(", ")],
    ["Giá niêm yết", formatPrice(car.priceListedVnd)],
    ["Quãng đường di chuyển", formatSpec(car.rangeKm, `km ${car.rangeStandard ?? ""}`.trim())],
    ["Công suất", formatSpec(car.powerKw, "kW")],
    ["Mô-men xoắn", formatSpec(car.torqueNm, "Nm")],
    ["Dung lượng pin", formatSpec(car.batteryKwh, "kWh")],
    ["Thời gian sạc", car.chargingTime],
    ["Kích thước dài/rộng/cao", formatDimensions(car.dimensions)],
    ["Chiều dài cơ sở", formatSpec(car.wheelbaseMm, "mm")],
    ["Số chỗ ngồi", formatSpec(car.seats, "chỗ")],
    ["Truyền động", car.drivetrain ?? "Đang cập nhật từ nguồn chính thức"],
    ["Hệ thống an toàn", compactList(car.safety)],
    ["ADAS", compactList(car.adas)],
    ["Tiện nghi nội thất", compactList(car.interiorComfort)],
    ["Màu ngoại thất", compactList(car.exteriorColors)],
  ];

  return (
    <section className="section-shell py-12">
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Bảng dữ liệu</p>
        <h2 className="mt-3 text-3xl font-semibold text-accent-strong">Thông số kỹ thuật và nguồn</h2>
      </div>
      <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-sm">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label} className="border-b border-line last:border-b-0">
                <th className="w-64 bg-surface-soft px-5 py-4 font-semibold text-accent-strong">{label}</th>
                <td className="px-5 py-4 text-muted">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-muted">
        Nguồn chính: <a className="font-semibold text-accent-strong underline" href={car.sourceUrl} target="_blank" rel="noreferrer">{car.sourceName}</a>, kiểm tra ngày {car.sourceLastCheckedAt}.
      </p>
    </section>
  );
}
