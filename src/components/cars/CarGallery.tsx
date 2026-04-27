import type { CarModel } from "@/data/schemas/car.schema";

export function CarGallery({ car }: { car: CarModel }) {
  return (
    <section className="section-shell py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Gallery</p>
      <h2 className="mt-3 text-3xl font-semibold text-accent-strong">Asset manifest và placeholder hợp pháp</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {car.gallery.map((item) => (
          <figure key={item.label} className="rounded-[28px] border border-line bg-white p-5 shadow-sm">
            <div className="grid aspect-[1.45] place-items-center rounded-[22px] bg-gradient-to-br from-accent-soft via-white to-surface-soft">
              <span className="text-sm font-semibold text-accent-strong">{item.label}</span>
            </div>
            <figcaption className="mt-4 text-sm leading-6 text-muted">{item.alt}</figcaption>
            <p className="mt-3 text-xs font-semibold text-accent-strong">License: {item.license}</p>
          </figure>
        ))}
      </div>
    </section>
  );
}
