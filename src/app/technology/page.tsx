import type { Metadata } from "next";
import { Battery, Cpu, Gauge, Zap } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Công nghệ xe điện",
  description: "Mô phỏng hệ thống pin, inverter, mô-tơ và bánh xe trong showroom số demo.",
  path: "/technology",
});

export default function TechnologyPage() {
  const flow = [
    { icon: Battery, label: "Pin", text: "Lưu trữ năng lượng dưới sàn." },
    { icon: Zap, label: "Inverter", text: "Chuyển đổi năng lượng cho mô-tơ." },
    { icon: Cpu, label: "Mô-tơ", text: "Tạo mô-men xoắn tức thời." },
    { icon: Gauge, label: "Bánh xe", text: "Truyền lực tới mặt đường." },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Công nghệ", url: "/technology" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Công nghệ EV</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">Từ pin tới bánh xe, mô phỏng ngắn gọn và dễ kiểm chứng</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          Diagram này mang tính minh họa. Thông số kỹ thuật chi tiết vẫn cần đối chiếu tại trang xe và nguồn chính thức.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {flow.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="relative rounded-[28px] border border-line bg-white p-6 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent-strong">
                  <Icon size={24} aria-hidden />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-accent-strong">{item.label}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
                {index < flow.length - 1 ? (
                  <span className="absolute -right-4 top-1/2 hidden h-px w-8 bg-accent md:block" aria-hidden />
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
