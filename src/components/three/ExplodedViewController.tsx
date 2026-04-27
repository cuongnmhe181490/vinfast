"use client";

import { SplitSquareHorizontal } from "lucide-react";
import { useVehicleStore } from "@/components/three/vehicle-store";
import { trackEvent } from "@/lib/analytics";

export function ExplodedViewController() {
  const explodeAmount = useVehicleStore((state) => state.explodeAmount);
  const setExplodeAmount = useVehicleStore((state) => state.setExplodeAmount);

  return (
    <label className="grid gap-2 rounded-2xl border border-line bg-white/80 p-3 text-xs font-semibold text-accent-strong">
      <span className="flex items-center gap-2">
        <SplitSquareHorizontal size={16} aria-hidden />
        Mức tách linh kiện
      </span>
      <input
        aria-label="Mức tách linh kiện"
        type="range"
        min="0"
        max="100"
        value={Math.round(explodeAmount * 100)}
        onChange={(event) => {
          const nextValue = Number(event.target.value) / 100;
          setExplodeAmount(nextValue);
          trackEvent("interact_3d_explode", { amount: nextValue });
        }}
        className="accent-accent"
      />
    </label>
  );
}
