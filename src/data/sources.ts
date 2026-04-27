import type { SourceTrace } from "@/data/schemas/car.schema";

export const DATA_LAST_CHECKED_AT = "2026-04-27";

export const officialSource = (
  sourceUrl: string,
  notes = "Nguồn công khai chính thức của VinFast. Cần kiểm tra lại trước quyết định mua xe.",
): SourceTrace => ({
  sourceUrl,
  sourceName: "VinFast Việt Nam",
  sourceLastCheckedAt: DATA_LAST_CHECKED_AT,
  confidenceScore: 1,
  status: "verified",
  notes,
});

export const pendingOfficialSource = (
  sourceUrl: string,
  notes = "Chưa trích xuất đủ dữ liệu có thể đối chiếu tự động từ nguồn chính thức.",
): SourceTrace => ({
  sourceUrl,
  sourceName: "VinFast Việt Nam",
  sourceLastCheckedAt: DATA_LAST_CHECKED_AT,
  confidenceScore: 1,
  status: "pending",
  notes,
});

export const OFFICIAL_SOURCES = {
  vf3: "https://shop.vinfastauto.com/vn_vi/dat-coc-xe-dien-vf3.html",
  vf5: "https://shop.vinfastauto.com/vn_vi/dat-coc-xe-dien-vf5.html",
  vf6: "https://shop.vinfastauto.com/vn_vi/dat-coc-xe-dien-vf6.html",
  vf7: "https://shop.vinfastauto.com/vn_vi/dat-coc-xe-dien-vf7.html",
  vf8: "https://shop.vinfastauto.com/vn_vi/dat-coc-xe-vf8.html",
  vf9: "https://shop.vinfastauto.com/vn_vi/dat-coc-xe-vf9.html",
  vfe34: "https://vinfastauto.com/vn_vi/vfe34",
  green:
    "https://vinfastauto.com/vn_vi/vinfast-cong-bo-dong-xe-dien-green",
} as const;
