import Link from "next/link";

const links = [
  ["So sánh VF 3 và VF 5", "/blog/so-sanh-vf-3-va-vf-5"],
  ["Nên chọn VF 6 hay VF 7?", "/blog/nen-chon-vf-6-hay-vf-7"],
  ["ADAS trên xe điện VinFast là gì?", "/blog/adas-tren-xe-dien-vinfast-la-gi"],
];

export function SEOContentBlock() {
  return (
    <section className="bg-white py-18 md:py-24">
      <div className="section-shell grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Bài viết tư vấn</p>
          <h2 className="mt-3 text-4xl font-semibold text-accent-strong">SEO content đi cùng internal link rõ ý định tìm kiếm.</h2>
        </div>
        <div className="grid gap-3">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-[24px] border border-line bg-surface-soft p-5 text-lg font-semibold text-accent-strong transition hover:border-accent hover:bg-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
