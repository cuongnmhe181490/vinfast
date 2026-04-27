"use client";

import { Canvas } from "@react-three/fiber";
import { Component, Suspense, useState, type ReactNode } from "react";
import {
  Box,
  CarFront,
  Gauge,
  Maximize2,
  Move3D,
  Orbit,
  Paintbrush,
  RotateCcw,
  SplitSquareHorizontal,
} from "lucide-react";
import type { VehicleHotspot } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";
import { ExplodedViewController } from "@/components/three/ExplodedViewController";
import { Fallback3DCard } from "@/components/three/Fallback3DCard";
import { Loading3D } from "@/components/three/Loading3D";
import { VehicleScene } from "@/components/three/VehicleScene";
import { useVehicleStore } from "@/components/three/vehicle-store";
import { formatSpec } from "@/lib/format";
import { trackEvent } from "@/lib/analytics";

const colors = ["#f7fbff", "#c9d4dc", "#08111f", "#bd1d2c", "#087b9b"];

type VehicleViewerProps = {
  car: CarModel;
  compact?: boolean;
};

export function VehicleViewer({ car, compact = false }: VehicleViewerProps) {
  const [webglReady] = useState(detectWebglSupport);
  const [selectedHotspot, setSelectedHotspot] = useState<VehicleHotspot | null>(null);
  const {
    autoRotate,
    doorsOpen,
    trunkOpen,
    xray,
    lowPower,
    interiorPreset,
    color,
    setAutoRotate,
    setDoorsOpen,
    setTrunkOpen,
    setXray,
    setLowPower,
    setExplodeAmount,
    setInteriorPreset,
    setColor,
    reset,
  } = useVehicleStore();

  if (!webglReady || lowPower) {
    return <Fallback3DCard car={car} reason={lowPower ? "Bạn đang bật chế độ nhẹ." : undefined} />;
  }

  return (
    <section
      data-testid="vehicle-viewer"
      className={`relative overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-soft ${
        compact ? "min-h-[460px]" : "min-h-[620px]"
      }`}
      aria-label={`Trình xem 3D demo cho ${car.name}`}
    >
      <div className="absolute left-5 top-5 z-10 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong backdrop-blur">
        3D demo placeholder
      </div>
      <ViewerErrorBoundary fallback={<Fallback3DCard car={car} reason="Trình 3D gặp lỗi runtime, fallback thông số đã được kích hoạt." />}>
        <Canvas
          shadows
          camera={{ position: [4.2, 2.4, 5.2], fov: 42 }}
          dpr={[1, 1.7]}
          gl={{ antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true }}
          className="min-h-[460px]"
        >
          <Suspense fallback={null}>
            <VehicleScene
              car={car}
              onHotspotSelect={(hotspot) => {
                setSelectedHotspot(hotspot);
              }}
            />
          </Suspense>
        </Canvas>
      </ViewerErrorBoundary>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 grid gap-4 p-4 md:grid-cols-[1fr_auto] md:p-6">
        <div className="pointer-events-auto grid gap-3 rounded-[24px] border border-white/70 bg-white/82 p-3 backdrop-blur-xl md:max-w-[560px]">
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            <Metric label="Quãng đường" value={formatSpec(car.rangeKm, "km")} />
            <Metric label="Công suất" value={formatSpec(car.powerKw, "kW")} />
            <Metric label="Pin" value={formatSpec(car.batteryKwh, "kWh")} />
            <Metric label="Số chỗ" value={formatSpec(car.seats, "chỗ")} />
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            <ControlButton
              label={autoRotate ? "Dừng xoay 360" : "Xem 360 độ"}
              active={autoRotate}
              icon={<Orbit size={16} aria-hidden />}
              onClick={() => {
                setAutoRotate(!autoRotate);
                trackEvent("interact_3d_rotate", { modelId: car.modelId, enabled: !autoRotate });
              }}
            />
            <ControlButton
              label={doorsOpen ? "Đóng cửa" : "Mở cửa"}
              active={doorsOpen}
              icon={<CarFront size={16} aria-hidden />}
              onClick={() => setDoorsOpen(!doorsOpen)}
            />
            <ControlButton
              label={trunkOpen ? "Đóng cốp" : "Mở cốp"}
              active={trunkOpen}
              icon={<Box size={16} aria-hidden />}
              onClick={() => setTrunkOpen(!trunkOpen)}
            />
            <ControlButton
              label="Exploded View"
              active={false}
              icon={<SplitSquareHorizontal size={16} aria-hidden />}
              onClick={() => {
                setExplodeAmount(1);
                trackEvent("interact_3d_explode", { modelId: car.modelId, amount: 1 });
              }}
            />
            <ControlButton
              label="Interior View"
              active={Boolean(interiorPreset)}
              icon={<Move3D size={16} aria-hidden />}
              onClick={() => {
                const next = interiorPreset ? null : "driver";
                setInteriorPreset(next);
                trackEvent("interact_3d_interior", { modelId: car.modelId, preset: next ?? "off" });
              }}
            />
            <ControlButton
              label="X-Ray View"
              active={xray}
              icon={<Gauge size={16} aria-hidden />}
              onClick={() => setXray(!xray)}
            />
            <ControlButton
              label="Reset camera"
              active={false}
              icon={<RotateCcw size={16} aria-hidden />}
              onClick={() => {
                reset();
                setSelectedHotspot(null);
              }}
            />
            <ControlButton
              label="Chế độ nhẹ"
              active={lowPower}
              icon={<Maximize2 size={16} aria-hidden />}
              onClick={() => setLowPower(true)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted">
              <Paintbrush size={15} aria-hidden />
              Màu xe
            </span>
            {colors.map((item) => (
              <button
                key={item}
                type="button"
                aria-label={`Chọn màu ${item}`}
                onClick={() => {
                  setColor(item);
                  trackEvent("select_color", { modelId: car.modelId, color: item });
                }}
                className={`h-8 w-8 rounded-full border shadow-sm ${color === item ? "ring-2 ring-accent ring-offset-2" : "border-line"}`}
                style={{ backgroundColor: item }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(["driver", "dashboard", "rear", "cargo"] as const).map((preset) => (
              <button
                key={preset}
                type="button"
                aria-label={`Chuyển camera tới ${preset}`}
                onClick={() => setInteriorPreset(preset)}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                  interiorPreset === preset ? "bg-accent-strong text-white" : "bg-surface-soft text-accent-strong"
                }`}
              >
                {preset === "driver" ? "Ghế lái" : preset === "dashboard" ? "Dashboard" : preset === "rear" ? "Hàng ghế sau" : "Khoang hành lý"}
              </button>
            ))}
          </div>
        </div>

        <div className="pointer-events-auto self-end">
          <ExplodedViewController />
        </div>
      </div>

      {selectedHotspot ? (
        <div className="absolute right-5 top-20 z-20 w-[min(330px,calc(100%-40px))] rounded-[24px] border border-white/75 bg-white/90 p-5 shadow-soft backdrop-blur">
          <button
            type="button"
            aria-label="Đóng hotspot"
            onClick={() => setSelectedHotspot(null)}
            className="absolute right-4 top-4 rounded-full px-2 text-sm font-semibold text-muted"
          >
            Đóng
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Hotspot</p>
          <h3 className="mt-2 text-xl font-semibold text-accent-strong">{selectedHotspot.label}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{selectedHotspot.description}</p>
          {selectedHotspot.sourceField ? (
            <p className="mt-4 rounded-2xl bg-surface-soft p-3 text-xs text-muted">
              Trường dữ liệu liên quan: <span className="font-semibold text-accent-strong">{selectedHotspot.sourceField}</span>. Nguồn: {car.sourceName}.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={<Loading3D />} />
      </div>
    </section>
  );
}

function detectWebglSupport() {
  if (typeof document === "undefined") return true;
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl"));
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface-soft/90 p-3">
      <p className="text-muted">{label}</p>
      <p className="mt-1 font-semibold text-accent-strong">{value}</p>
    </div>
  );
}

function ControlButton({
  label,
  active,
  icon,
  onClick,
}: {
  label: string;
  active: boolean;
  icon: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-3 text-xs font-semibold transition ${
        active ? "bg-accent-strong text-white" : "bg-white text-accent-strong shadow-sm hover:bg-accent-soft"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

class ViewerErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
