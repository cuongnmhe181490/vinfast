import type { CarModel } from "@/data/schemas/car.schema";
import { CarCard } from "@/components/cars/CarCard";

export function ModelHighlights({ cars }: { cars: CarModel[] }) {
  return (
    <section className="section-shell py-18 md:py-24">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Chọn dòng xe</p>
          <h2 className="mt-3 text-4xl font-semibold text-accent-strong">Danh mục xe có nguồn dữ liệu rõ ràng</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted">
          Thêm model mới bằng JSON record và asset manifest, không cần sửa logic core.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cars.slice(0, 6).map((car, index) => (
          <CarCard key={car.modelId} car={car} priority={index < 3} />
        ))}
      </div>
    </section>
  );
}
