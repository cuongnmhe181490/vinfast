import { describe, expect, it } from "vitest";
import { getAllCars } from "@/lib/data-loader";

describe("car data schema", () => {
  it("loads and validates all seed records", () => {
    const cars = getAllCars();
    expect(cars.length).toBeGreaterThanOrEqual(7);
    expect(cars.every((car) => car.sourceUrl.startsWith("https://"))).toBe(true);
  });
});
