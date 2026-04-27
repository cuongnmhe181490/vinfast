"use client";

import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import type { VehicleHotspot } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import { Hotspot } from "@/components/three/Hotspot";
import { InteriorCameraRig } from "@/components/three/InteriorCameraRig";
import { VehicleModel } from "@/components/three/VehicleModel";
import { useVehicleStore } from "@/components/three/vehicle-store";

type VehicleSceneProps = {
  car: CarModel;
  onHotspotSelect: (hotspot: VehicleHotspot) => void;
};

export function VehicleScene({ car, onHotspotSelect }: VehicleSceneProps) {
  const autoRotate = useVehicleStore((state) => state.autoRotate);
  const interiorPreset = useVehicleStore((state) => state.interiorPreset);
  const manifest = getVehicleAssetManifest(car.modelId);

  return (
    <>
      <color attach="background" args={["#eef7fc"]} />
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 3]} intensity={2.6} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4, 2, -3]} intensity={0.8} />
      <Environment preset="city" />
      <VehicleModel car={car} />
      {manifest.hotspots.map((hotspot) => (
        <Hotspot key={hotspot.id} hotspot={hotspot} onSelect={onHotspotSelect} />
      ))}
      <ContactShadows position={[0, -0.95, 0]} opacity={0.35} blur={2.4} scale={8} far={2} />
      <InteriorCameraRig />
      <OrbitControls
        makeDefault
        autoRotate={autoRotate && !interiorPreset}
        autoRotateSpeed={0.9}
        enableDamping
        dampingFactor={0.06}
        minDistance={interiorPreset ? 0.2 : 3.3}
        maxDistance={interiorPreset ? 1.4 : 7.4}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0.1, 0]}
      />
    </>
  );
}
