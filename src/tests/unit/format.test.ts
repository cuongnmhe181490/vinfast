import { describe, expect, it } from "vitest";
import { formatDimensions, formatPrice, formatSpec } from "@/lib/format";

describe("format helpers", () => {
  it("formats missing values as official update status", () => {
    expect(formatSpec(null, "km")).toBe("Đang cập nhật từ nguồn chính thức");
    expect(formatPrice(null)).toBe("Đang cập nhật từ nguồn chính thức");
  });

  it("formats dimensions when complete", () => {
    expect(formatDimensions({ lengthMm: 3190, widthMm: 1679, heightMm: 1622 })).toContain("3.190");
  });
});
