import Link from "next/link";
import { GitCompare } from "lucide-react";

export function CompareCTA() {
  return (
    <section className="section-shell py-18 md:py-24">
      <div className="grid gap-8 rounded-[28px] bg-accent-strong p-8 text-white shadow-soft md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">So sánh nhanh</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold">Đặt 2-4 mẫu xe cạnh nhau, lọc theo pin, kích thước, an toàn và nội thất.</h2>
        </div>
        <Link href="/compare" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-accent-strong">
          <GitCompare size={17} aria-hidden />
          Mở bảng so sánh
        </Link>
      </div>
    </section>
  );
}
