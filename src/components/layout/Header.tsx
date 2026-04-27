import Link from "next/link";
import { Box, GitCompare, Orbit } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";

export const navItems = [
  { href: "/cars", label: "Dòng xe" },
  { href: "/compare", label: "So sánh" },
  { href: "/technology", label: "Công nghệ" },
  { href: "/battery-charging", label: "Pin & Sạc" },
  { href: "/safety", label: "An toàn" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/78 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Về trang chủ VF Showcase Demo">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent-strong text-white">
            <Box size={20} aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold uppercase tracking-[0.18em] text-accent-strong">
              VF Showcase
            </span>
            <span className="block text-xs text-muted">Demo portfolio</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted lg:flex" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-accent-strong">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/cars/vf-8"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-semibold text-accent-strong shadow-sm transition hover:border-accent"
          >
            <Orbit size={17} aria-hidden />
            Khám phá 3D
          </Link>
          <Link
            href="/compare"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-strong px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-accent"
          >
            <GitCompare size={17} aria-hidden />
            So sánh xe
          </Link>
        </div>

        <MobileNav items={navItems} />
      </div>
    </header>
  );
}
