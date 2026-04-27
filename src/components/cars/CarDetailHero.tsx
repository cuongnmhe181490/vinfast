"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, GitCompare } from "lucide-react";
import type { CarModel } from "@/data/schemas/car.schema";
import { Loading3D } from "@/components/three/Loading3D";
import { trackEvent } from "@/lib/analytics";

const VehicleViewer = dynamic(
  () => import("@/components/three/VehicleViewer").then((mod) => mod.VehicleViewer),
  { ssr: false, loading: () => <Loading3D /> },
);

export function CarDetailHero({ car }: { car: CarModel }) {
  return (
    <section className="section-shell grid gap-8 py-8 lg:grid-cols-[0.86fr_1.14fr] lg:py-12">
      <div className="flex flex-col justify-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{car.segment}</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-normal text-accent-strong sm:text-6xl">{car.name}</h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
          Trang chi tiết demo với model 3D CC0, render tự tạo, hotspot kỹ thuật, bảng thông số có nguồn và CTA chuyển tới nguồn chính thức.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`/compare?cars=${car.modelId}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent-strong px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            <GitCompare size={17} aria-hidden />
            So sánh xe này
          </Link>
          <a
            href={car.sourceUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("click_official_source", { modelId: car.modelId })}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-accent-strong transition hover:border-accent"
          >
            Xem nguồn dữ liệu
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </div>
      <VehicleViewer car={car} />
    </section>
  );
}
