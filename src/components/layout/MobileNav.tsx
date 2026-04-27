"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type MobileNavProps = {
  items: { href: string; label: string }[];
};

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Đóng menu" : "Mở menu"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-accent-strong"
      >
        {open ? <X size={19} aria-hidden /> : <Menu size={19} aria-hidden />}
      </button>

      {open ? (
        <div className="fixed inset-x-4 top-24 z-50 rounded-[24px] border border-line bg-white p-4 shadow-2xl">
          <nav className="grid gap-2" aria-label="Điều hướng di động">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-foreground transition hover:bg-surface-soft"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link
              href="/cars/vf-8"
              onClick={() => setOpen(false)}
              className="rounded-full bg-accent-strong px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Khám phá 3D
            </Link>
            <Link
              href="/compare"
              onClick={() => setOpen(false)}
              className="rounded-full border border-line px-4 py-3 text-center text-sm font-semibold text-accent-strong"
            >
              So sánh xe
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
