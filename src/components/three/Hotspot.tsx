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
        className="grid h-7 w-7 place-items-center rounded-full border border-white/80 bg-accent text-xs font-bold text-white shadow-xl ring-[5px] ring-accent/20 transition hover:scale-110"
      >
        i
      </button>
    </Html>
  );
}
