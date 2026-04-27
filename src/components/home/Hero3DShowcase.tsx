"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitCompare, Orbit, SplitSquareHorizontal } from "lucide-react";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";
import { formatSpec } from "@/lib/format";

export function Hero3DShowcase({ car }: { car: CarModel }) {
  const manifest = getVehicleAssetManifest(car.modelId);
  const heroVisual = manifest.productPhoto ?? {
    url: manifest.renderImageUrl,
    alt: `Render demo tự tạo cho ${car.name}`,
    sourceName: "VF Showcase Demo",
    license: "Generated render",
  };

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_58%_16%,#dff4ff_0%,#f7fbff_40%,#ffffff_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-white/80" />
      <div className="section-shell grid min-h-[calc(100svh-80px)] items-center gap-8 py-8 lg:grid-cols-[0.58fr_1.42fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">Showroom số 3D demo</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-normal text-accent-strong sm:text-7xl lg:text-8xl">
            VF Showcase Demo
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
            Trải nghiệm showroom số với mô phỏng EV 3D tự tạo, render sản phẩm sạch và dữ liệu xe có nguồn kiểm chứng.
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
          <div className="absolute -left-2 top-10 z-20 hidden rounded-[22px] border border-white/70 bg-white/78 p-4 shadow-soft backdrop-blur md:block">
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
          <div className="relative grid min-h-[520px] overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-soft lg:-mr-10 lg:min-h-[620px]">
            <Image
              src={heroVisual.url}
              alt={heroVisual.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent-strong/26 via-transparent to-white/10" />
            <div className="absolute left-5 top-5 rounded-full bg-white/84 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong backdrop-blur">
              Ảnh sản phẩm có license
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-white/70 bg-white/82 p-4 backdrop-blur-xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">Hero model</p>
                <p className="mt-1 text-2xl font-semibold text-accent-strong">{car.name}</p>
                <p className="mt-1 text-xs text-muted">{heroVisual.sourceName} · {heroVisual.license}</p>
              </div>
              <Link href={`/cars/${car.slug}`} className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent">
                <Orbit size={16} aria-hidden />
                Mở mô phỏng 3D
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Link href={`/cars/${car.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent-strong shadow-sm">
              <SplitSquareHorizontal size={16} aria-hidden />
              Tách linh kiện
            </Link>
            <Link href={`/cars/${car.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent-strong shadow-sm">
              Xem nội thất
            </Link>
            <Link href={`/cars/${car.slug}`} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-accent-strong shadow-sm">
              Xem 360°
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
