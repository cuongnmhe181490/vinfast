"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowUpRight, GitCompare } from "lucide-react";
import { getVehicleAssetManifest } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";
import { Loading3D } from "@/components/three/Loading3D";
import { SketchfabVehicleViewer } from "@/components/three/SketchfabVehicleViewer";
import { trackEvent } from "@/lib/analytics";

const VehicleViewer = dynamic(
  () => import("@/components/three/VehicleViewer").then((mod) => mod.VehicleViewer),
  { ssr: false, loading: () => <Loading3D /> },
);

export function CarDetailHero({ car }: { car: CarModel }) {
  const manifest = getVehicleAssetManifest(car.modelId);

  return (
    <section className="bg-[radial-gradient(circle_at_55%_0%,#e3f7ff_0%,#f7fbff_38%,#ffffff_100%)]">
      <div className="section-shell py-6 md:py-8">
        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{car.segment}</p>
            <h1 className="mt-3 text-5xl font-semibold tracking-normal text-accent-strong sm:text-6xl">
              {car.name} 3D chi tiết
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted md:text-lg">
              {manifest.preciseModel
                ? "Model ngoại thất chi tiết từ nguồn public có attribution, đặt làm trải nghiệm chính của trang xe."
                : "Mô phỏng 3D tự tạo, render studio hợp pháp, hotspot kỹ thuật và bảng thông số có nguồn."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            {manifest.preciseModel ? (
              <a
                href={manifest.preciseModel.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-3 text-sm font-semibold text-accent-strong transition hover:border-accent"
              >
                Nguồn model
                <ArrowUpRight size={17} aria-hidden />
              </a>
            ) : null}
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
        {manifest.preciseModel ? (
          <>
            <SketchfabVehicleViewer car={car} model={manifest.preciseModel} />
            <div className="mt-4 grid gap-3 rounded-[24px] border border-line bg-white/80 p-4 text-xs leading-5 text-muted backdrop-blur md:grid-cols-3">
              <p>
                <span className="font-semibold text-accent-strong">License:</span> {manifest.preciseModel.license}
              </p>
              <p>
                <span className="font-semibold text-accent-strong">Độ chi tiết:</span>{" "}
                {manifest.preciseModel.triangles ?? "Đang cập nhật"}
              </p>
              <p>
                <span className="font-semibold text-accent-strong">Giới hạn:</span> Chưa có CAD nội thất, pin, mô-tơ và exploded-view chuẩn.
              </p>
            </div>
          </>
        ) : (
          <VehicleViewer car={car} />
        )}
      </div>
    </section>
  );
}
