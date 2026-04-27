"use client";

import { Html } from "@react-three/drei";
import type { VehicleHotspot } from "@/data/asset-manifest";

type HotspotProps = {
  hotspot: VehicleHotspot;
  onSelect: (hotspot: VehicleHotspot) => void;
};

export function Hotspot({ hotspot, onSelect }: HotspotProps) {
  return (
    <Html position={hotspot.position} center distanceFactor={8} zIndexRange={[20, 0]}>
      <button
        type="button"
        aria-label={`Xem hotspot ${hotspot.label}`}
        onClick={() => onSelect(hotspot)}
        className="grid h-9 w-9 place-items-center rounded-full border border-white/80 bg-accent text-sm font-bold text-white shadow-xl ring-4 ring-accent/20 transition hover:scale-110"
      >
        i
      </button>
    </Html>
  );
}
