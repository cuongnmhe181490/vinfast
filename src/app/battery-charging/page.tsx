import type { Metadata } from "next";
import { BatteryCharging, MapPinned, PlugZap } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pin và trạm sạc",
  description: "Trang giải thích pin, sạc và cách đọc thông số xe điện VinFast trong demo.",
  path: "/battery-charging",
});

export default function BatteryChargingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Trang chủ", url: "/" }, { name: "Pin & Sạc", url: "/battery-charging" }]} />
      <section className="section-shell py-12 md:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Pin & Sạc</p>
        <h1 className="mt-4 max-w-4xl text-5xl font-semibold text-accent-strong">Đọc thông số pin theo nguồn, không suy diễn thời gian sạc khi thiếu dữ liệu</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            [BatteryCharging, "Dung lượng pin", "Hiển thị kWh nếu nguồn chính thức có công bố rõ."],
            [PlugZap, "Thời gian sạc", "Giữ trạng thái đang cập nhật nếu thiếu mốc sạc hoặc điều kiện thử nghiệm."],
            [MapPinned, "Trạm sạc", "CTA nên dẫn tới nguồn chính thức, không tự cam kết hạ tầng theo thời gian thực."],
          ].map(([Icon, title, body]) => {
            const TypedIcon = Icon as typeof BatteryCharging;
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
