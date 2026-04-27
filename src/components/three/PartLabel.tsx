"use client";

import { Html } from "@react-three/drei";

type PartLabelProps = {
  label: string;
  position: [number, number, number];
};

export function PartLabel({ label, position }: PartLabelProps) {
  return (
    <Html position={position} center distanceFactor={9}>
      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-accent-strong shadow">
        {label}
      </span>
    </Html>
  );
}
