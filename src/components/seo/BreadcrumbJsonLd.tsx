import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/seo";

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return <JsonLd data={buildBreadcrumbJsonLd(items)} />;
}
