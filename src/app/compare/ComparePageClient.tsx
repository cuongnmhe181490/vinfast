"use client";

import { useMemo, useState } from "react";
import type { CarModel } from "@/data/schemas/car.schema";
import { CompareSelector } from "@/components/compare/CompareSelector";
import { CompareTable } from "@/components/compare/CompareTable";
import { DifferenceHighlighter } from "@/components/compare/DifferenceHighlighter";
import { compareCategories, type CompareCategory } from "@/lib/compare";
import { trackEvent } from "@/lib/analytics";

export function ComparePageClient({ cars, initialIds }: { cars: CarModel[]; initialIds: string[] }) {
  const [selectedIds, setSelectedIds] = useState(initialIds);
  const [category, setCategory] = useState<CompareCategory | "all">("all");
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const selectedCars = useMemo(
    () => cars.filter((car) => selectedIds.includes(car.modelId)),
    [cars, selectedIds],
  );

  return (
    <section className="section-shell py-12 md:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">So sánh</p>
      <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">So sánh 2-4 mẫu xe VinFast</h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
        Bảng so sánh highlight khác biệt và giữ trạng thái thiếu dữ liệu minh bạch.
      </p>
      <div className="mt-9">
        <CompareSelector cars={cars} selectedIds={selectedIds} onChange={setSelectedIds} />
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <select
          aria-label="Lọc nhóm thông số"
          value={category}
          onChange={(event) => setCategory(event.target.value as CompareCategory | "all")}
          className="rounded-full border border-line bg-white px-4 py-3 text-sm font-semibold text-accent-strong"
        >
          <option value="all">Tất cả nhóm</option>
          {compareCategories.map((item) => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
        </select>
        <DifferenceHighlighter
          enabled={differencesOnly}
          onChange={(value) => {
            setDifferencesOnly(value);
            trackEvent("compare_view_difference", { enabled: value });
          }}
        />
      </div>
      <div className="mt-6">
        <CompareTable cars={selectedCars} category={category} differencesOnly={differencesOnly} />
      </div>
    </section>
  );
}
