import type { CarModel } from "@/data/schemas/car.schema";

export type ValidationIssue = {
  modelId: string;
  field: string;
  severity: "warning" | "error";
  message: string;
};

const criticalFields: (keyof CarModel)[] = [
  "sourceUrl",
  "sourceName",
  "sourceLastCheckedAt",
  "confidenceScore",
];

const importantSpecs: (keyof CarModel)[] = [
  "priceListedVnd",
  "rangeKm",
  "powerKw",
  "torqueNm",
  "batteryKwh",
  "wheelbaseMm",
  "seats",
  "drivetrain",
];

export function validateGovernance(cars: CarModel[]) {
  const issues: ValidationIssue[] = [];

  for (const car of cars) {
    for (const field of criticalFields) {
      if (car[field] === null || car[field] === "") {
        issues.push({
          modelId: car.modelId,
          field,
          severity: "error",
          message: "Thiếu metadata nguồn bắt buộc.",
        });
      }
    }

    if (car.confidenceScore < 0.6) {
      issues.push({
        modelId: car.modelId,
        field: "confidenceScore",
        severity: "error",
        message: "Nguồn dưới ngưỡng sử dụng cho thông số chính.",
      });
    }

    for (const field of importantSpecs) {
      if (car[field] === null) {
        issues.push({
          modelId: car.modelId,
          field,
          severity: "warning",
          message: "Thông số đang thiếu, UI phải hiển thị trạng thái đang cập nhật.",
        });
      }
    }

    if (!Object.keys(car.fieldSources).length) {
      issues.push({
        modelId: car.modelId,
        field: "fieldSources",
        severity: "error",
        message: "Thiếu nguồn cấp trường dữ liệu.",
      });
    }
  }

  return issues;
}
