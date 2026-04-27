import { ArrowUpRight } from "lucide-react";
import type { CarModel } from "@/data/schemas/car.schema";

export function CarCTA({ car }: { car: CarModel }) {
  return (
    <section className="section-shell py-12">
      <div className="rounded-[28px] bg-accent-strong p-8 text-white shadow-soft md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Bước tiếp theo</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold">Kiểm chứng thông tin {car.name} tại nguồn chính thức trước khi ra quyết định.</h2>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={car.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-accent-strong">
            Mở nguồn chính thức
            <ArrowUpRight size={17} aria-hidden />
          </a>
          <a href={car.sourceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white">
            Đăng ký lái thử tại nguồn chính thức
            <ArrowUpRight size={17} aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
