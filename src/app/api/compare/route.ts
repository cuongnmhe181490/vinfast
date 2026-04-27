import { NextResponse } from "next/server";
import { z } from "zod";
import { getAllCars } from "@/lib/data-loader";
import { buildCompareRows } from "@/lib/compare";

const querySchema = z.object({
  ids: z
    .string()
    .min(1)
    .transform((value) => value.split(",").map((id) => id.trim()).filter(Boolean).slice(0, 4)),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({ ids: url.searchParams.get("ids") ?? "" });

  if (!parsed.success) {
    return NextResponse.json({ error: "Cần truyền ids dạng vf-3,vf-5" }, { status: 400 });
  }

  const allCars = getAllCars();
  const allowedIds = new Set(allCars.map((car) => car.modelId));
  const ids = parsed.data.ids.filter((id) => allowedIds.has(id));
  const cars = allCars.filter((car) => ids.includes(car.modelId));

  if (cars.length < 2) {
    return NextResponse.json({ error: "Cần ít nhất 2 xe hợp lệ để so sánh" }, { status: 400 });
  }

  return NextResponse.json({ cars, rows: buildCompareRows(cars) });
}
