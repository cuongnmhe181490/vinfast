import { describe, expect, it } from "vitest";
import { buildCompareRows } from "@/lib/compare";
import { getAllCars } from "@/lib/data-loader";

describe("compare logic", () => {
  it("marks different rows when selected cars have different specs", () => {
    const cars = getAllCars().filter((car) => ["vf-3", "vf-5"].includes(car.modelId));
    const rows = buildCompareRows(cars);
    expect(rows.some((row) => row.isDifferent)).toBe(true);
    expect(rows.find((row) => row.label === "Số chỗ")?.isDifferent).toBe(true);
  });
});
