"use client";

import { useVehicleStore } from "@/components/three/vehicle-store";
import { trackEvent } from "@/lib/analytics";

const colorMap = [
  { label: "Trắng", value: "#f7fbff" },
  { label: "Xám", value: "#c9d4dc" },
  { label: "Đen", value: "#08111f" },
  { label: "Đỏ", value: "#bd1d2c" },
  { label: "Xanh", value: "#087b9b" },
];

export function CarColorSelector({ modelId }: { modelId: string }) {
  const color = useVehicleStore((state) => state.color);
  const setColor = useVehicleStore((state) => state.setColor);

  return (
    <div className="rounded-[28px] border border-line bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-accent-strong">Màu ngoại thất demo</p>
      <div className="mt-3 flex flex-wrap gap-3">
        {colorMap.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-label={`Chọn màu ${item.label}`}
            onClick={() => {
              setColor(item.value);
              trackEvent("select_color", { modelId, color: item.label });
            }}
            className={`h-10 w-10 rounded-full border shadow-sm ${color === item.value ? "ring-2 ring-accent ring-offset-2" : "border-line"}`}
            style={{ backgroundColor: item.value }}
          />
        ))}
      </div>
    </div>
  );
}
