"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
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
  showHotspots?: boolean;
};

export function VehicleScene({ car, onHotspotSelect, showHotspots = true }: VehicleSceneProps) {
  const autoRotate = useVehicleStore((state) => state.autoRotate);
  const interiorPreset = useVehicleStore((state) => state.interiorPreset);
  const manifest = getVehicleAssetManifest(car.modelId);

  return (
    <>
      <color attach="background" args={["#f4fbff"]} />
      <ambientLight intensity={1.1} />
      <directionalLight position={[4.5, 7, 4]} intensity={3} castShadow shadow-mapSize={[1536, 1536]} />
      <directionalLight position={[-5, 3, -4]} intensity={0.95} />
      <pointLight position={[0, 2.2, 4.6]} intensity={1.1} color="#dff7ff" />
      <VehicleModel car={car} />
      {showHotspots ? manifest.hotspots.map((hotspot) => (
        <Hotspot key={hotspot.id} hotspot={hotspot} onSelect={onHotspotSelect} />
      )) : null}
      <ContactShadows position={[0, -0.98, 0]} opacity={0.42} blur={2.9} scale={9.5} far={2.4} />
      <InteriorCameraRig />
      <OrbitControls
        makeDefault
        autoRotate={autoRotate && !interiorPreset}
        autoRotateSpeed={0.75}
        enableDamping
        dampingFactor={0.06}
        minDistance={interiorPreset ? 0.24 : 3.7}
        maxDistance={interiorPreset ? 1.5 : 8.2}
        minPolarAngle={0.15}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, -0.12, 0]}
      />
    </>
  );
}
