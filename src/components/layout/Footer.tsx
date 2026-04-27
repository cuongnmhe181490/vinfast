import Link from "next/link";
import { navItems } from "@/components/layout/Header";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong">
            VF Showcase Demo
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
            Website demo/portfolio, không phải website chính thức của VinFast. Thông tin cần được kiểm chứng với nguồn chính thức trước khi ra quyết định mua xe.
          </p>
        </div>
        <nav className="grid grid-cols-2 gap-3 text-sm text-muted sm:grid-cols-3" aria-label="Liên kết footer">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-accent-strong">
              {item.label}
            </Link>
          ))}
          <Link href="/blog/cach-doc-thong-so-quang-duong-di-chuyen-xe-dien" className="transition hover:text-accent-strong">
            Cách đọc thông số
          </Link>
        </nav>
      </div>
    </footer>
  );
}
