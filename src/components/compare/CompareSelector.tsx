"use client";

import type { CarModel } from "@/data/schemas/car.schema";
import { trackEvent } from "@/lib/analytics";

type CompareSelectorProps = {
  cars: CarModel[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
};

export function CompareSelector({ cars, selectedIds, onChange }: CompareSelectorProps) {
  function toggle(modelId: string) {
    const exists = selectedIds.includes(modelId);
    const next = exists
      ? selectedIds.filter((id) => id !== modelId)
      : [...selectedIds, modelId].slice(0, 4);
    onChange(next);
    if (!exists) trackEvent("compare_add_car", { modelId });
  }

  return (
    <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
      {cars.map((car) => {
        const active = selectedIds.includes(car.modelId);
        return (
          <button
            key={car.modelId}
            type="button"
            aria-pressed={active}
            onClick={() => toggle(car.modelId)}
            className={`min-w-40 rounded-[22px] border p-4 text-left transition ${
              active ? "border-accent bg-accent-strong text-white" : "border-line bg-white text-accent-strong hover:border-accent"
            }`}
          >
            <span className="block text-xs font-semibold uppercase tracking-[0.16em] opacity-75">{car.segment}</span>
            <span className="mt-2 block text-xl font-semibold">{car.name}</span>
          </button>
        );
      })}
    </div>
  );
}
