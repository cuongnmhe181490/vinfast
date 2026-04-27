import { BatteryCharging, Cpu, Radar, ShieldCheck } from "lucide-react";

const items = [
  {
    icon: BatteryCharging,
    title: "Pin và quản lý năng lượng",
    body: "Mô phỏng luồng pin tới inverter, mô-tơ và bánh xe với disclaimer minh họa.",
  },
  {
    icon: Cpu,
    title: "Mô-tơ điện",
    body: "Hotspot giải thích công suất, mô-men xoắn và truyền động theo nguồn dữ liệu.",
  },
  {
    icon: Radar,
    title: "ADAS",
    body: "Các lớp hỗ trợ lái được hiển thị bằng hotspot và bảng an toàn riêng.",
  },
  {
    icon: ShieldCheck,
    title: "An toàn",
    body: "Nội dung ưu tiên nguồn chính thức, tránh dùng dữ liệu đại lý không rõ ràng.",
  },
];

export function TechSection() {
  return (
    <section className="bg-white py-18 md:py-24">
      <div className="section-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Công nghệ xe điện</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-semibold text-accent-strong">Một lớp trình bày kỹ thuật dễ hiểu, không đánh đổi tính xác thực.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="rounded-[28px] border border-line bg-surface-soft p-6">
                <Icon size={26} className="text-accent" aria-hidden />
                <h3 className="mt-5 text-xl font-semibold text-accent-strong">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
