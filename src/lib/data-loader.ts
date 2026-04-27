import fs from "node:fs";
import path from "node:path";
import { carCollectionSchema, carSchema, type CarModel } from "@/data/schemas/car.schema";

const carsDir = path.join(process.cwd(), "src", "data", "cars");
const showcaseOrder = new Map(
  ["vf-3", "vf-5", "vf-6", "vf-7", "vf-8", "vf-9", "vf-e34"].map((modelId, index) => [modelId, index]),
);

function readJsonFile(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
}

export function getAllCars(): CarModel[] {
  const files = fs
    .readdirSync(carsDir)
    .filter((file) => file.endsWith(".json"))
    .sort();
  const rawCars = files.map((file) => readJsonFile(path.join(carsDir, file)));
  return carCollectionSchema.parse(rawCars).sort((a, b) => {
    const orderA = showcaseOrder.get(a.modelId) ?? 99;
    const orderB = showcaseOrder.get(b.modelId) ?? 99;
    if (orderA !== orderB) return orderA - orderB;
    return a.name.localeCompare(b.name, "vi");
  });
}

export function getCarBySlug(slug: string) {
  return getAllCars().find((car) => car.slug === slug) ?? null;
}

export function validateCarRecord(raw: unknown) {
  return carSchema.safeParse(raw);
}
