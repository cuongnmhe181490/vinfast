import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CarCTA } from "@/components/cars/CarCTA";
import { CarColorSelector } from "@/components/cars/CarColorSelector";
import { CarDetailHero } from "@/components/cars/CarDetailHero";
import { CarGallery } from "@/components/cars/CarGallery";
import { CarSpecCard } from "@/components/cars/CarSpecCard";
import { CarSpecsTable } from "@/components/cars/CarSpecsTable";
import { CarVersionSelector } from "@/components/cars/CarVersionSelector";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FAQJsonLd } from "@/components/seo/FAQJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllCars, getCarBySlug } from "@/lib/data-loader";
import { buildCarJsonLd, buildPageMetadata } from "@/lib/seo";

type CarPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCars().map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};
  return buildPageMetadata({
    title: `${car.name} 3D demo, thông số và nguồn dữ liệu`,
    description: `Khám phá ${car.name} bằng mô phỏng 3D tự tạo, render studio demo, bảng thông số có nguồn và so sánh xe.`,
    path: `/cars/${car.slug}`,
  });
}

export default async function CarDetailPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const faq = [
    {
      question: `${car.name} trong website này có phải model 3D chính thức không?`,
      answer: "Không. Viewer dùng mô phỏng procedural tự dựng bằng Three.js để demo hệ thống 3D, không phải model chính thức của VinFast.",
    },
    {
      question: `Thông số ${car.name} lấy từ đâu?`,
      answer: `Thông số seed ưu tiên nguồn chính thức: ${car.sourceName}, kiểm tra ngày ${car.sourceLastCheckedAt}.`,
    },
  ];

  return (
    <>
      <JsonLd data={buildCarJsonLd(car)} />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Dòng xe", url: "/cars" },
          { name: car.name, url: `/cars/${car.slug}` },
        ]}
      />
      <FAQJsonLd questions={faq} />
      <CarDetailHero car={car} />
      <section className="section-shell grid gap-5 py-6 lg:grid-cols-[1fr_0.65fr_0.65fr]">
        <CarSpecCard car={car} />
        <CarVersionSelector versions={car.versions} />
        <CarColorSelector modelId={car.modelId} />
      </section>
      <CarSpecsTable car={car} />
      <CarGallery car={car} />
      <section className="section-shell py-8">
        <h2 className="text-3xl font-semibold text-accent-strong">FAQ nhanh</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faq.map((item) => (
            <article key={item.question} className="rounded-[28px] border border-line bg-white p-6">
              <h3 className="font-semibold text-accent-strong">{item.question}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
      <CarCTA car={car} />
    </>
  );
}
