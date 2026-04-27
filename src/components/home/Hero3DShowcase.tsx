"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitCompare, Orbit, SplitSquareHorizontal } from "lucide-react";
import type { CarModel } from "@/data/schemas/car.schema";
import { Loading3D } from "@/components/three/Loading3D";
import { useVehicleStore } from "@/components/three/vehicle-store";
import { formatSpec } from "@/lib/format";

const VehicleViewer = dynamic(
  () => import("@/components/three/VehicleViewer").then((mod) => mod.VehicleViewer),
  { ssr: false, loading: () => <Loading3D /> },
);

export function Hero3DShowcase({ car }: { car: CarModel }) {
  const setExplodeAmount = useVehicleStore((state) => state.setExplodeAmount);
  const setInteriorPreset = useVehicleStore((state) => state.setInteriorPreset);
  const setAutoRotate = useVehicleStore((state) => state.setAutoRotate);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_18%,#dff4ff_0%,#f7fbff_42%,#ffffff_100%)]">
      <div className="section-shell grid min-h-[calc(100svh-80px)] items-center gap-8 py-8 lg:grid-cols-[0.76fr_1.24fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Showroom số 3D demo</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-normal text-accent-strong sm:text-7xl">
            VF Showcase Demo
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Khám phá các dòng xe VinFast qua mô phỏng 3D tương tác, dữ liệu có nguồn và luồng so sánh rõ ràng.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cars/vf-8" className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent">
              <Orbit size={18} aria-hidden />
              Khám phá 3D
            </Link>
            <Link href="/compare" className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-5 py-3 text-sm font-semibold text-accent-strong transition hover:border-accent">
              <GitCompare size={18} aria-hidden />
              So sánh xe
            </Link>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute -left-3 top-8 z-20 hidden rounded-[22px] border border-white/70 bg-white/78 p-4 shadow-soft backdrop-blur md:block">
            <p className="text-xs text-muted">Quãng đường</p>
            <p className="mt-1 text-xl font-semibold text-accent-strong">{formatSpec(car.rangeKm, "km")}</p>
          </div>
          <div className="absolute -right-2 top-16 z-20 hidden rounded-[22px] border border-white/70 bg-white/78 p-4 shadow-soft backdrop-blur md:block">
            <p className="text-xs text-muted">Công suất</p>
            <p className="mt-1 text-xl font-semibold text-accent-strong">{formatSpec(car.powerKw, "kW")}</p>
          </div>
          <div className="absolute bottom-28 left-8 z-20 hidden rounded-[22px] border border-white/70 bg-white/78 p-4 shadow-soft backdrop-blur md:block">
            <p className="text-xs text-muted">Số chỗ</p>
            <p className="mt-1 text-xl font-semibold text-accent-strong">{formatSpec(car.seats, "chỗ")}</p>
          </div>
          <VehicleViewer car={car} compact />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" onClick={() => setExplodeAmount(1)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent-strong shadow-sm">
              <SplitSquareHorizontal size={16} aria-hidden />
              Tách linh kiện
            </button>
            <button type="button" onClick={() => setInteriorPreset("driver")} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent-strong shadow-sm">
              Xem nội thất
            </button>
            <button type="button" onClick={() => setAutoRotate(true)} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent-strong shadow-sm">
              Xem 360°
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
