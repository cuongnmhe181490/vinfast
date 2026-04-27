"use client";

import { type ReactNode, useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils, Vector3 } from "three";
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
      {explodeAmount > 0.32 && label && labelPosition ? <PartLabel label={label} position={labelPosition} /> : null}
    </group>
  );
}

function Paint({
  color,
  opacity = 1,
  roughness = 0.24,
}: {
  color: string;
  opacity?: number;
  roughness?: number;
}) {
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.58}
      roughness={roughness}
      clearcoat={0.72}
      clearcoatRoughness={0.16}
      transparent={opacity < 0.98}
      opacity={opacity}
    />
  );
}

function Glass({ opacity = 0.74 }: { opacity?: number }) {
  return (
    <meshPhysicalMaterial
      color="#102338"
      metalness={0.08}
      roughness={0.08}
      clearcoat={1}
      clearcoatRoughness={0.06}
      transparent
      opacity={opacity}
    />
  );
}

function Door({ side, color, opacity }: { side: "left" | "right"; color: string; opacity: number }) {
  const ref = useRef<Group>(null);
  const doorsOpen = useVehicleStore((state) => state.doorsOpen);
  const direction = side === "left" ? 1 : -1;

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y = MathUtils.lerp(ref.current.rotation.y, doorsOpen ? direction * 0.92 : 0, 0.08);
  });

  return (
    <group ref={ref} position={[direction * 1.22, -0.06, 0.1]}>
      <RoundedBox args={[0.08, 0.7, 1.42]} radius={0.04} smoothness={8} castShadow receiveShadow>
        <Paint color={color} opacity={opacity} />
      </RoundedBox>
      <RoundedBox args={[0.045, 0.24, 0.78]} radius={0.03} smoothness={8} position={[0.006 * direction, 0.22, 0.02]}>
        <Glass opacity={opacity * 0.68} />
      </RoundedBox>
      <mesh position={[0.045 * direction, 0.02, 0.58]}>
        <boxGeometry args={[0.018, 0.035, 0.18]} />
        <meshStandardMaterial color="#d8e5ee" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function Trunk({ color, opacity }: { color: string; opacity: number }) {
  const ref = useRef<Group>(null);
  const trunkOpen = useVehicleStore((state) => state.trunkOpen);

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x = MathUtils.lerp(ref.current.rotation.x, trunkOpen ? -0.72 : 0, 0.08);
  });

  return (
    <group ref={ref} position={[0, 0.0, -2.02]}>
      <RoundedBox args={[1.76, 0.62, 0.18]} radius={0.06} smoothness={8} castShadow receiveShadow>
        <Paint color={color} opacity={opacity} />
      </RoundedBox>
      <mesh position={[0, -0.12, -0.11]}>
        <boxGeometry args={[1.36, 0.045, 0.035]} />
        <meshStandardMaterial color="#d91f36" emissive="#8a0010" emissiveIntensity={0.32} />
      </mesh>
    </group>
  );
}

function Wheel({ x, z, explodeSide = 0 }: { x: number; z: number; explodeSide?: number }) {
  return (
    <group position={[x + explodeSide, -0.66, z]}>
      <mesh castShadow receiveShadow rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.36, 0.105, 18, 54]} />
        <meshStandardMaterial color="#07111e" roughness={0.42} metalness={0.12} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.235, 0.235, 0.09, 36]} />
        <meshStandardMaterial color="#e6f0f5" metalness={0.86} roughness={0.22} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.15, 0.018, 12, 32]} />
        <meshStandardMaterial color="#0077c8" metalness={0.4} roughness={0.2} />
      </mesh>
    </group>
  );
}

function TechnicalInterior() {
  return (
    <>
      <mesh position={[-0.38, 0.16, 0.34]} castShadow>
        <boxGeometry args={[0.34, 0.48, 0.42]} />
        <meshStandardMaterial color="#243244" roughness={0.44} />
      </mesh>
      <mesh position={[0.38, 0.16, 0.34]} castShadow>
        <boxGeometry args={[0.34, 0.48, 0.42]} />
        <meshStandardMaterial color="#243244" roughness={0.44} />
      </mesh>
      <mesh position={[0, 0.08, -0.66]} castShadow>
        <boxGeometry args={[1.1, 0.44, 0.44]} />
        <meshStandardMaterial color="#27364a" roughness={0.44} />
      </mesh>
      <mesh position={[0, 0.35, 0.92]} castShadow>
        <boxGeometry args={[1.18, 0.18, 0.18]} />
        <meshStandardMaterial color="#111827" roughness={0.35} />
      </mesh>
      <mesh position={[0.36, 0.48, 0.82]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.018, 12, 32]} />
        <meshStandardMaterial color="#0b1220" roughness={0.3} />
      </mesh>
      <mesh position={[-0.32, 0.52, 0.79]}>
        <boxGeometry args={[0.42, 0.24, 0.04]} />
        <meshStandardMaterial color="#07111e" emissive="#0077c8" emissiveIntensity={0.14} />
      </mesh>
    </>
  );
}

export function VehicleModel({ car }: { car: CarModel }) {
  const color = useVehicleStore((state) => state.color);
  const xray = useVehicleStore((state) => state.xray);
  const explodeAmount = useVehicleStore((state) => state.explodeAmount);
  const scale = car.segment.includes("hạng E") ? 1.1 : car.segment.includes("mini") ? 0.86 : 1;
  const opacity = xray ? 0.28 : 1;
  const techOpacity = xray ? 0.9 : explodeAmount > 0.08 ? 1 : 0;

  return (
    <group scale={scale} rotation={[0, -0.16, 0]}>
      <AnimatedPart base={[0, 0, 0]} exploded={[0, 0.12, 0]} label="Thân xe" labelPosition={[0, 1.28, 0]}>
        <RoundedBox args={[2.28, 0.74, 4.18]} radius={0.22} smoothness={18} position={[0, -0.22, 0]} castShadow receiveShadow>
          <Paint color={color} opacity={opacity} />
        </RoundedBox>
        <RoundedBox args={[1.92, 0.4, 3.42]} radius={0.26} smoothness={18} position={[0, 0.05, -0.04]} castShadow receiveShadow>
          <Paint color={color} opacity={opacity} roughness={0.2} />
        </RoundedBox>
        <mesh position={[0, 0.45, -0.18]} scale={[0.92, 0.42, 0.86]} castShadow receiveShadow>
          <sphereGeometry args={[1, 48, 24]} />
          <meshPhysicalMaterial
            color="#f4fbff"
            metalness={0.25}
            roughness={0.18}
            clearcoat={0.75}
            transparent
            opacity={xray ? 0.12 : 0.92}
          />
        </mesh>
        <RoundedBox args={[1.58, 0.38, 1.18]} radius={0.08} smoothness={12} position={[0, 0.52, 0.0]}>
          <Glass opacity={xray ? 0.16 : 0.78} />
        </RoundedBox>
        <RoundedBox args={[1.42, 0.08, 0.052]} radius={0.03} smoothness={8} position={[0, 0.0, 2.1]}>
          <meshStandardMaterial color="#e8fbff" emissive="#88ecff" emissiveIntensity={0.45} />
        </RoundedBox>
        <RoundedBox args={[1.42, 0.07, 0.045]} radius={0.03} smoothness={8} position={[0, -0.02, -2.12]}>
          <meshStandardMaterial color="#e11d3f" emissive="#8a0010" emissiveIntensity={0.32} />
        </RoundedBox>
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[2.38, 0.08, 3.36]} />
          <meshStandardMaterial color="#07111e" metalness={0.3} roughness={0.34} transparent opacity={xray ? 0.22 : 0.72} />
        </mesh>
        <mesh position={[0, 0.12, 1.15]}>
          <boxGeometry args={[1.74, 0.022, 0.9]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.35} />
        </mesh>
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, -0.82, 0]} label="Pin sàn" labelPosition={[0, -0.72, 0]}>
        <mesh castShadow receiveShadow position={[0, -0.62, -0.08]}>
          <boxGeometry args={[1.48, 0.18, 2.52]} />
          <meshStandardMaterial
            color="#0b5c7a"
            transparent
            opacity={xray ? 0.88 : Math.max(techOpacity, 0.04)}
            metalness={0.35}
            roughness={0.34}
          />
        </mesh>
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, 0.96, 0]} label="Nội thất" labelPosition={[0, 1.22, -0.25]}>
        <group visible={xray || explodeAmount > 0.08}>
          <TechnicalInterior />
        </group>
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, 0, 0]} label="Cửa" labelPosition={[1.65, 0.55, 0.2]}>
        <Door side="left" color={color} opacity={opacity} />
        <Door side="right" color={color} opacity={opacity} />
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, 0.38, -0.82]} label="Cốp" labelPosition={[0, 0.9, -2.2]}>
        <Trunk color={color} opacity={opacity} />
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, -0.02, 0]} label="Bánh xe" labelPosition={[-1.62, -0.2, 1.24]}>
        <Wheel x={-1.14} z={1.32} explodeSide={explodeAmount > 0.08 ? -0.22 : 0} />
        <Wheel x={1.14} z={1.32} explodeSide={explodeAmount > 0.08 ? 0.22 : 0} />
        <Wheel x={-1.14} z={-1.32} explodeSide={explodeAmount > 0.08 ? -0.22 : 0} />
        <Wheel x={1.14} z={-1.32} explodeSide={explodeAmount > 0.08 ? 0.22 : 0} />
      </AnimatedPart>

      <AnimatedPart base={[0, 0, 0]} exploded={[0, -0.1, 1.12]} label="Mô-tơ và inverter" labelPosition={[0, 0.02, 2.4]}>
        <mesh castShadow receiveShadow position={[0.42, -0.42, 1.55]}>
          <boxGeometry args={[0.52, 0.32, 0.46]} />
          <meshStandardMaterial color="#145a70" transparent opacity={xray ? 0.9 : Math.max(techOpacity, 0.04)} metalness={0.55} roughness={0.25} />
        </mesh>
        <mesh castShadow receiveShadow position={[-0.32, -0.38, 1.5]}>
          <boxGeometry args={[0.42, 0.22, 0.36]} />
          <meshStandardMaterial color="#94a3b8" transparent opacity={xray ? 0.9 : Math.max(techOpacity, 0.04)} metalness={0.75} roughness={0.22} />
        </mesh>
      </AnimatedPart>
    </group>
  );
}
