"use client";

import { type ReactNode, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Material, MathUtils, Mesh, Vector3 } from "three";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";
import { PartLabel } from "@/components/three/PartLabel";
import { useVehicleStore } from "@/components/three/vehicle-store";

type AnimatedPartProps = {
  base: [number, number, number];
  exploded: [number, number, number];
  children: ReactNode;
  label?: string;
  labelPosition?: [number, number, number];
};

function AnimatedPart({ base, exploded, children, label, labelPosition }: AnimatedPartProps) {
  const ref = useRef<Group>(null);
  const explodeAmount = useVehicleStore((state) => state.explodeAmount);
  const baseVector = useMemo(() => new Vector3(...base), [base]);
  const explodedVector = useMemo(() => new Vector3(...exploded), [exploded]);

  useFrame(() => {
    ref.current?.position.lerpVectors(baseVector, explodedVector, explodeAmount);
  });

  return (
    <group ref={ref}>
      {children}
      {explodeAmount > 0.32 && label && labelPosition ? (
        <PartLabel label={label} position={labelPosition} />
      ) : null}
    </group>
  );
}

function Door({ side }: { side: "left" | "right" }) {
  const ref = useRef<Group>(null);
  const doorsOpen = useVehicleStore((state) => state.doorsOpen);
  const direction = side === "left" ? 1 : -1;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = MathUtils.lerp(
      ref.current.rotation.y,
      doorsOpen ? direction * 0.78 : 0,
      0.08,
    );
  });

  return (
    <group ref={ref} position={[direction * 1.16, -0.02, 0.18]}>
      <mesh castShadow receiveShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[0.08, 0.62, 1.36]} />
        <meshStandardMaterial color="#dce9f1" metalness={0.65} roughness={0.32} />
      </mesh>
      <mesh position={[0.006 * direction, 0.18, 0.02]}>
        <boxGeometry args={[0.04, 0.28, 0.76]} />
        <meshStandardMaterial color="#0f2233" metalness={0.2} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Trunk() {
  const ref = useRef<Group>(null);
  const trunkOpen = useVehicleStore((state) => state.trunkOpen);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, trunkOpen ? -0.62 : 0, 0.08);
  });

  return (
    <group ref={ref} position={[0, 0.04, -1.82]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.62, 0.16]} />
        <meshStandardMaterial color="#e9f2f7" metalness={0.62} roughness={0.32} />
      </mesh>
      <mesh position={[0, -0.09, -0.09]}>
        <boxGeometry args={[1.48, 0.05, 0.04]} />
        <meshStandardMaterial color="#d91f36" emissive="#71000d" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

function Wheel({ x, z }: { x: number; z: number }) {
  return (
    <group position={[x, -0.58, z]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.33, 0.33, 0.26, 36]} />
        <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.035, 24]} />
        <meshStandardMaterial color="#d9e5ec" metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

function getLicensedModelTransform(modelId: string, segment: string) {
  const baseScale = segment.includes("hạng E") ? 1.86 : segment.includes("mini") ? 1.38 : 1.58;
  const customScale: Record<string, number> = {
    "limo-green": 1.7,
    "vf-9": 1.86,
    "vf-e34": 1.42,
  };

  return {
    scale: customScale[modelId] ?? baseScale,
    position: [0, -0.66, 0] as [number, number, number],
    rotation: [0, Math.PI, 0] as [number, number, number],
  };
}

function LicensedExteriorModel({
  url,
  modelId,
  segment,
  opacity,
}: {
  url: string;
  modelId: string;
  segment: string;
  opacity: number;
}) {
  const { scene } = useGLTF(url);
  const transform = getLicensedModelTransform(modelId, segment);
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!(child instanceof Mesh)) return;
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      const clonedMaterials = materials.map((material) => {
        const cloned = material.clone();
        cloned.transparent = opacity < 0.98;
        cloned.opacity = opacity;
        cloned.depthWrite = opacity > 0.45;
        if (cloned instanceof Material) cloned.needsUpdate = true;
        return cloned;
      });

      child.material = Array.isArray(child.material) ? clonedMaterials : clonedMaterials[0];
      child.castShadow = true;
      child.receiveShadow = true;
    });

    return clone;
  }, [opacity, scene]);

  return (
    <group position={transform.position} rotation={transform.rotation} scale={transform.scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function VehicleModel({ car }: { car: CarModel }) {
  const color = useVehicleStore((state) => state.color);
  const xray = useVehicleStore((state) => state.xray);
  const explodeAmount = useVehicleStore((state) => state.explodeAmount);
  const manifest = getVehicleAssetManifest(car.modelId);
  const scale = car.segment.includes("hạng E") ? 1.12 : car.segment.includes("mini") ? 0.82 : 1;
  const materialOpacity = xray ? 0.32 : 1;
  const showTechnicalShell = !manifest.exteriorModelUrl || xray || explodeAmount > 0.08;

  return (
    <group scale={scale}>
      {manifest.exteriorModelUrl ? (
        <AnimatedPart base={[0, 0, 0]} exploded={[0, 0.18, 0]} label="Model 3D CC0" labelPosition={[0, 1.42, 0]}>
          <LicensedExteriorModel
            url={manifest.exteriorModelUrl}
            modelId={car.modelId}
            segment={car.segment}
            opacity={xray ? 0.2 : explodeAmount > 0.08 ? 0.62 : 1}
          />
        </AnimatedPart>
      ) : null}

      {showTechnicalShell ? (
        <AnimatedPart base={[0, 0, 0]} exploded={[0, 0.08, 0]} label="Thân xe" labelPosition={[0, 1.25, 0]}>
          <mesh castShadow receiveShadow position={[0, -0.04, 0]}>
            <boxGeometry args={[2.08, 0.7, 3.75]} />
            <meshStandardMaterial color={color} transparent opacity={materialOpacity * 0.72} metalness={0.64} roughness={0.28} />
          </mesh>
          <mesh castShadow receiveShadow position={[0, 0.48, -0.14]}>
            <boxGeometry args={[1.56, 0.74, 1.64]} />
            <meshStandardMaterial color="#e8f3f8" transparent opacity={xray ? 0.18 : 0.42} metalness={0.2} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0.62, 0.03]}>
            <boxGeometry args={[1.38, 0.42, 1.28]} />
            <meshStandardMaterial color="#102338" transparent opacity={xray ? 0.12 : 0.34} metalness={0.15} roughness={0.15} />
          </mesh>
          <mesh position={[0, -0.1, 1.92]}>
            <boxGeometry args={[1.36, 0.07, 0.05]} />
            <meshStandardMaterial color="#e8fbff" emissive="#80ecff" emissiveIntensity={0.35} />
          </mesh>
        </AnimatedPart>
      ) : null}

      <AnimatedPart base={[0, 0, 0]} exploded={[0, -0.72, 0]} label="Pin sàn" labelPosition={[0, -0.72, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.58, -0.08]}>
          <boxGeometry args={[1.42, 0.18, 2.42]} />
          <meshStandardMaterial color="#0b5c7a" transparent opacity={xray ? 0.88 : 1} metalness={0.35} roughness={0.34} />
        </mesh>
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, 0.92, 0]} label="Nội thất" labelPosition={[0, 1.2, -0.25]}>
        <mesh position={[-0.38, 0.18, 0.32]} castShadow>
          <boxGeometry args={[0.34, 0.48, 0.42]} />
          <meshStandardMaterial color="#243244" roughness={0.44} />
        </mesh>
        <mesh position={[0.38, 0.18, 0.32]} castShadow>
          <boxGeometry args={[0.34, 0.48, 0.42]} />
          <meshStandardMaterial color="#243244" roughness={0.44} />
        </mesh>
        <mesh position={[0, 0.1, -0.62]} castShadow>
          <boxGeometry args={[1.12, 0.46, 0.44]} />
          <meshStandardMaterial color="#27364a" roughness={0.44} />
        </mesh>
        <mesh position={[0, 0.35, 0.9]} castShadow>
          <boxGeometry args={[1.18, 0.2, 0.18]} />
          <meshStandardMaterial color="#111827" roughness={0.35} />
        </mesh>
        <mesh position={[0.36, 0.48, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.15, 0.018, 12, 32]} />
          <meshStandardMaterial color="#0b1220" roughness={0.3} />
        </mesh>
        <mesh position={[-0.32, 0.52, 0.78]}>
          <boxGeometry args={[0.42, 0.24, 0.04]} />
          <meshStandardMaterial color="#07111e" emissive="#0077c8" emissiveIntensity={0.12} />
        </mesh>
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, 0, 0]} label="Cửa" labelPosition={[1.65, 0.55, 0.2]}>
        <Door side="left" />
        <Door side="right" />
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, 0.35, -0.78]} label="Cốp" labelPosition={[0, 0.9, -2.2]}>
        <Trunk />
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, -0.02, 0]} label="Bánh xe" labelPosition={[-1.62, -0.2, 1.24]}>
        <Wheel x={-1.1} z={1.2} />
        <Wheel x={1.1} z={1.2} />
        <Wheel x={-1.1} z={-1.22} />
        <Wheel x={1.1} z={-1.22} />
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, -0.1, 1.06]} label="Mô-tơ và inverter" labelPosition={[0, 0.02, 2.4]}>
        <mesh castShadow receiveShadow position={[0.42, -0.38, 1.48]}>
          <boxGeometry args={[0.5, 0.32, 0.48]} />
          <meshStandardMaterial color="#145a70" metalness={0.55} roughness={0.25} />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.32, -0.34, 1.44]}>
          <boxGeometry args={[0.42, 0.22, 0.36]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.75} roughness={0.22} />
        </mesh>
      </AnimatedPart>
    </group>
  );
}
