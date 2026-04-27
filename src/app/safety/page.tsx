import type { Metadata } from "next";
import { Radar, ShieldCheck, Siren } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "An toàn và ADAS",
  description: "Tổng quan hệ thống an toàn, ADAS và nguyên tắc xác thực nguồn cho xe VinFast.",
  path: "/safety",
});

export default function SafetyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "An toàn", url: "/safety" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">An toàn</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">An toàn phải được đọc theo phiên bản và nguồn chính thức</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            [ShieldCheck, "An toàn chủ động", "Phanh, cân bằng điện tử và cảnh báo được liệt kê theo nguồn."],
            [Radar, "ADAS", "Tính năng hỗ trợ lái có thể thay đổi theo phiên bản và phần mềm."],
            [Siren, "Cảnh báo dữ liệu", "Nếu nguồn mâu thuẫn, hệ thống ưu tiên nguồn chính thức và đưa vào report."],
          ].map(([Icon, title, body]) => {
            const TypedIcon = Icon as typeof ShieldCheck;
            return (
              <article key={title as string} className="rounded-[28px] border border-line bg-white p-6 shadow-sm">
                <TypedIcon size={28} className="text-accent" aria-hidden />
                <h2 className="mt-5 text-2xl font-semibold text-accent-strong">{title as string}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{body as string}</p>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
