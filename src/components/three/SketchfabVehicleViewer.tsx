import { Box, ExternalLink } from "lucide-react";
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
      className="relative overflow-hidden rounded-[30px] border border-white/70 bg-[#0b1220] shadow-soft"
      aria-label={`Trình xem 3D chi tiết cho ${car.name}`}
    >
      <div className="absolute left-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent-strong backdrop-blur md:left-5 md:top-5">
        Model 3D chi tiết: {car.name}
      </div>
      <div className="absolute right-4 top-4 z-10 hidden rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-muted backdrop-blur sm:block md:right-5 md:top-5">
        Kéo để xoay · cuộn để zoom
      </div>
      <div className="h-[min(76svh,840px)] min-h-[560px] w-full md:min-h-[680px]">
        <iframe
          title={`${car.name} 3D model by ${model.author}`}
          src={model.embedUrl}
          allow="autoplay; fullscreen; xr-spatial-tracking"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <div className="absolute inset-x-4 bottom-4 z-10 rounded-[22px] border border-white/70 bg-white/88 p-3 shadow-soft backdrop-blur-xl md:inset-x-5 md:bottom-5 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              <Box size={15} aria-hidden />
              {model.title}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-accent-strong">{car.name}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              Nguồn model: {model.author} trên Sketchfab. {model.scope === "exterior-only" ? "Ngoại thất chi tiết." : "Toàn xe."}
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
      </div>
    </section>
  );
}
