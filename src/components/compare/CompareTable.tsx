"use client";

import type { CarModel } from "@/data/schemas/car.schema";
import { buildCompareRows, type CompareCategory } from "@/lib/compare";

type CompareTableProps = {
  cars: CarModel[];
  category: CompareCategory | "all";
  differencesOnly: boolean;
};

export function CompareTable({ cars, category, differencesOnly }: CompareTableProps) {
  const rows = buildCompareRows(cars)
    .filter((row) => category === "all" || row.category === category)
    .filter((row) => !differencesOnly || row.isDifferent);

  if (cars.length < 2) {
    return (
      <div className="rounded-[28px] border border-line bg-white p-8 text-center text-muted">
        Chọn ít nhất 2 xe để bắt đầu so sánh.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[28px] border border-line bg-white shadow-sm">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line bg-surface-soft">
            <th className="w-52 px-5 py-4 text-accent-strong">Hạng mục</th>
            {cars.map((car) => (
              <th key={car.modelId} className="px-5 py-4 text-accent-strong">{car.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className={row.isDifferent ? "bg-accent-soft/30" : ""}>
              <th className="border-b border-line px-5 py-4 font-semibold text-accent-strong">{row.label}</th>
              {cars.map((car) => (
                <td key={car.modelId} className="border-b border-line px-5 py-4 text-muted">
                  {row.values[car.modelId]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
