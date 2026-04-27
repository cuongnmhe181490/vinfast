export const UNKNOWN_VALUE = "Đang cập nhật từ nguồn chính thức";

export function formatNumber(value: number | null, suffix = "") {
  if (value === null || Number.isNaN(value)) return UNKNOWN_VALUE;
  return `${new Intl.NumberFormat("vi-VN").format(value)}${suffix}`;
}

export function formatPrice(value: number | null) {
  if (value === null) return UNKNOWN_VALUE;
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatSpec(
  value: number | string | null,
  unit?: string,
  fallback = UNKNOWN_VALUE,
) {
  if (value === null || value === "") return fallback;
  if (typeof value === "number") return formatNumber(value, unit ? ` ${unit}` : "");
  return value;
}

export function formatDimensions(dimensions: {
  lengthMm: number | null;
  widthMm: number | null;
  heightMm: number | null;
}) {
  const { lengthMm, widthMm, heightMm } = dimensions;
  if (!lengthMm || !widthMm || !heightMm) return UNKNOWN_VALUE;
  return `${formatNumber(lengthMm)} x ${formatNumber(widthMm)} x ${formatNumber(heightMm)} mm`;
}

export function compactList(values: string[]) {
  return values.length ? values.join(", ") : UNKNOWN_VALUE;
}
