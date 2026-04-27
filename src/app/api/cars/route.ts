import { NextResponse } from "next/server";
import { z } from "zod";
import { getAllCars } from "@/lib/data-loader";

const querySchema = z.object({
  segment: z.string().max(80).optional(),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = querySchema.safeParse({
    segment: url.searchParams.get("segment") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Query không hợp lệ" }, { status: 400 });
  }

  const cars = getAllCars().filter((car) =>
    parsed.data.segment ? car.segment.toLowerCase().includes(parsed.data.segment.toLowerCase()) : true,
  );

  return NextResponse.json({ cars });
}
