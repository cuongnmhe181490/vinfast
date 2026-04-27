import type { InteriorPreset } from "@/components/three/vehicle-store";

export const cameraPresets: Record<Exclude<InteriorPreset, null>, [number, number, number]> = {
  driver: [0.25, 0.72, 0.92],
  rear: [-0.2, 0.78, -0.45],
  cargo: [0, 0.62, -1.92],
  dashboard: [0.05, 0.9, 1.35],
};
