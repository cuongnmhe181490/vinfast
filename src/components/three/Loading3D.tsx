export function Loading3D() {
  return (
    <div className="grid h-full min-h-[360px] place-items-center rounded-[28px] bg-surface-soft text-center">
      <div>
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
        <p className="mt-4 text-sm font-semibold text-accent-strong">Đang tải showroom 3D</p>
        <p className="mt-1 text-xs text-muted">Đang tải model demo nhẹ và asset kỹ thuật.</p>
      </div>
    </div>
  );
}
