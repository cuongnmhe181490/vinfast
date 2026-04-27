import type { CarModel } from "@/data/schemas/car.schema";

export type CompareCategory = "size" | "performance" | "battery" | "safety" | "interior" | "price";

export const compareCategories: { id: CompareCategory; label: string }[] = [
  { id: "size", label: "Kích thước" },
  { id: "performance", label: "Vận hành" },
  { id: "battery", label: "Pin/Sạc" },
  { id: "safety", label: "An toàn" },
  { id: "interior", label: "Nội thất" },
  { id: "price", label: "Giá" },
];

export type CompareRow = {
  category: CompareCategory;
  label: string;
  values: Record<string, string>;
  isDifferent: boolean;
};

export function buildCompareRows(cars: CarModel[]): CompareRow[] {
  const rows: Omit<CompareRow, "values" | "isDifferent">[] = [
    { category: "price", label: "Giá niêm yết" },
    { category: "performance", label: "Công suất" },
    { category: "performance", label: "Mô-men xoắn" },
    { category: "battery", label: "Quãng đường" },
    { category: "battery", label: "Dung lượng pin" },
    { category: "size", label: "Kích thước" },
    { category: "size", label: "Chiều dài cơ sở" },
    { category: "interior", label: "Số chỗ" },
    { category: "safety", label: "ADAS" },
  ];

  return rows.map((row) => {
    const values = Object.fromEntries(cars.map((car) => [car.modelId, getValue(row.label, car)]));
    return {
      ...row,
      values,
      isDifferent: new Set(Object.values(values)).size > 1,
    };
  });
}

function getValue(label: string, car: CarModel) {
  switch (label) {
    case "Giá niêm yết":
      return car.priceListedVnd ? `${car.priceListedVnd}` : "Đang cập nhật";
    case "Công suất":
      return car.powerKw ? `${car.powerKw} kW` : "Đang cập nhật";
    case "Mô-men xoắn":
      return car.torqueNm ? `${car.torqueNm} Nm` : "Đang cập nhật";
    case "Quãng đường":
      return car.rangeKm ? `${car.rangeKm} km ${car.rangeStandard ?? ""}`.trim() : "Đang cập nhật";
    case "Dung lượng pin":
      return car.batteryKwh ? `${car.batteryKwh} kWh` : "Đang cập nhật";
    case "Kích thước":
      if (!car.dimensions.lengthMm || !car.dimensions.widthMm || !car.dimensions.heightMm) {
        return "Đang cập nhật";
      }
      return `${car.dimensions.lengthMm} x ${car.dimensions.widthMm} x ${car.dimensions.heightMm} mm`;
    case "Chiều dài cơ sở":
      return car.wheelbaseMm ? `${car.wheelbaseMm} mm` : "Đang cập nhật";
    case "Số chỗ":
      return car.seats ? `${car.seats}` : "Đang cập nhật";
    case "ADAS":
      return car.adas.length ? car.adas.join(", ") : "Đang cập nhật";
    default:
      return "Đang cập nhật";
  }
}
