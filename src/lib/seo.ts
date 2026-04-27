import type { Metadata } from "next";
import type { CarModel } from "@/data/schemas/car.schema";

const siteName = "VF Showcase Demo";
export const baseUrl = "https://vf-silk-seven.vercel.app";

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildCarJsonLd(car: CarModel) {
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Vehicle"],
    name: car.name,
    brand: {
      "@type": "Brand",
      name: "VinFast",
    },
    category: car.segment,
    description: `${car.name} trong showroom số demo, có thông số kèm nguồn chính thức và mô phỏng 3D placeholder.`,
    url: `${baseUrl}/cars/${car.slug}`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Quãng đường", value: car.rangeKm ?? "Đang cập nhật" },
      { "@type": "PropertyValue", name: "Công suất", value: car.powerKw ?? "Đang cập nhật" },
      { "@type": "PropertyValue", name: "Dung lượng pin", value: car.batteryKwh ?? "Đang cập nhật" },
    ],
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}
