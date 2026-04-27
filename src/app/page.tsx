import { CompareCTA } from "@/components/home/CompareCTA";
import { Hero3DShowcase } from "@/components/home/Hero3DShowcase";
import { ModelHighlights } from "@/components/home/ModelHighlights";
import { SEOContentBlock } from "@/components/home/SEOContentBlock";
import { TechSection } from "@/components/home/TechSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllCars } from "@/lib/data-loader";

export default function Home() {
  const cars = getAllCars();
  const heroCar = cars.find((car) => car.slug === "vf-8") ?? cars[0];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "VF Showcase Demo",
          description: "Showroom số 3D demo cho người dùng tìm hiểu xe điện VinFast.",
          inLanguage: "vi-VN",
        }}
      />
      <Hero3DShowcase car={heroCar} />
      <ModelHighlights cars={cars} />
      <TechSection />
      <CompareCTA />
      <SEOContentBlock />
    </>
  );
}
