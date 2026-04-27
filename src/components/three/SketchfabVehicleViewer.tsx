import { Box, ExternalLink, Info } from "lucide-react";
import type { PreciseModelAsset } from "@/data/asset-manifest";
import type { CarModel } from "@/data/schemas/car.schema";

type SketchfabVehicleViewerProps = {
  car: CarModel;
  model: PreciseModelAsset;
};

export function SketchfabVehicleViewer({ car, model }: SketchfabVehicleViewerProps) {
  return (
    <section
      data-testid="licensed-3d-viewer"
      className="relative overflow-hidden rounded-[30px] border border-white/70 bg-[#edf8ff] shadow-soft"
      aria-label={`Trình xem 3D chi tiết cho ${car.name}`}
    >
      <div className="absolute left-5 top-5 z-10 rounded-full bg-white/86 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong backdrop-blur">
        Model 3D chi tiết
      </div>
      <div className="absolute right-5 top-5 z-10 hidden rounded-full bg-white/86 px-4 py-2 text-xs font-semibold text-muted backdrop-blur sm:block">
        Kéo để xoay · cuộn để zoom
      </div>
      <div className="aspect-[1.2] min-h-[520px] w-full sm:aspect-[1.55] lg:min-h-[700px]">
        <iframe
          title={`${car.name} 3D model by ${model.author}`}
          src={model.embedUrl}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <div className="border-t border-white/80 bg-white/90 p-4 backdrop-blur-xl md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              <Box size={15} aria-hidden />
              {model.title}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-accent-strong">{car.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Nguồn model: {model.author} trên Sketchfab. {model.notes}
            </p>
          </div>
          <a
            href={model.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent-strong px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Xem nguồn model
            <ExternalLink size={16} aria-hidden />
          </a>
        </div>
        <div className="mt-4 grid gap-2 text-xs text-muted sm:grid-cols-3">
          <p className="rounded-2xl bg-surface-soft/90 p-3">
            <span className="font-semibold text-accent-strong">License:</span> {model.license}
          </p>
          <p className="rounded-2xl bg-surface-soft/90 p-3">
            <span className="font-semibold text-accent-strong">Phạm vi:</span>{" "}
            {model.scope === "exterior-only" ? "Ngoại thất" : "Toàn xe"}
          </p>
          <p className="rounded-2xl bg-surface-soft/90 p-3">
            <span className="font-semibold text-accent-strong">Độ chi tiết:</span> {model.triangles ?? "Đang cập nhật"}
          </p>
        </div>
        <p className="mt-3 inline-flex gap-2 rounded-2xl bg-white/78 p-3 text-xs leading-5 text-muted">
          <Info size={15} aria-hidden className="mt-0.5 shrink-0 text-accent" />
          Model public hiện chưa có CAD nội thất, pin, mô-tơ và exploded-view chính xác. Các chế độ kỹ thuật cần asset licensed riêng từ nhà thiết kế hoặc quét 3D.
        </p>
      </div>
    </section>
  );
}
