import type { Metadata } from "next";
import { ComparePageClient } from "@/app/compare/ComparePageClient";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getAllCars } from "@/lib/data-loader";
import { buildPageMetadata } from "@/lib/seo";

type ComparePageProps = {
  searchParams: Promise<{ cars?: string }>;
};

export const metadata: Metadata = buildPageMetadata({
  title: "So sánh xe VinFast",
  description: "So sánh 2-4 mẫu xe VinFast theo kích thước, vận hành, pin, an toàn, nội thất và giá.",
  path: "/compare",
});

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { cars: carsParam } = await searchParams;
  const cars = getAllCars();
  const allowedIds = new Set(cars.map((car) => car.modelId));
  const initialIds =
    carsParam
      ?.split(",")
      .map((id) => id.trim())
      .filter((id) => allowedIds.has(id))
      .slice(0, 4) ?? [];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "So sánh", url: "/compare" }]} />
      <ComparePageClient cars={cars} initialIds={initialIds} />
    </>
  );
}
