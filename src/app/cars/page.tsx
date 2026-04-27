import type { Metadata } from "next";
import { CarCard } from "@/components/cars/CarCard";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getAllCars } from "@/lib/data-loader";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Dòng xe VinFast có trải nghiệm 3D demo",
  description: "Danh sách xe VinFast trong showroom số demo, dữ liệu có nguồn và trạng thái xác thực.",
  path: "/cars",
});

export default function CarsPage() {
  const cars = getAllCars();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Dòng xe", url: "/cars" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Dòng xe</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">Tất cả mẫu xe trong VF Showcase Demo</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Mỗi record có source URL, ngày kiểm tra và confidence score. Trường thiếu sẽ hiển thị đang cập nhật thay vì tự suy đoán.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.modelId} car={car} />
          ))}
        </div>
      </section>
    </>
  );
}
