"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { cameraPresets } from "@/components/three/CameraPresets";
import { useVehicleStore } from "@/components/three/vehicle-store";

export function InteriorCameraRig() {
  const preset = useVehicleStore((state) => state.interiorPreset);
  const { camera } = useThree();

  useFrame(() => {
    if (!preset) return;
    const target = new Vector3(...cameraPresets[preset]);
    camera.position.lerp(target, 0.08);
    camera.lookAt(0, 0.72, 0.1);
  });

  return null;
}
