import { z } from "zod";

export const sourceTraceSchema = z.object({
  sourceUrl: z.string().url(),
  sourceName: z.string().min(2),
  sourceLastCheckedAt: z.string().date(),
  confidenceScore: z.number().min(0).max(1),
  status: z.enum(["verified", "pending", "conflicting"]),
  notes: z.string().optional(),
});

export const galleryItemSchema = z.object({
  type: z.enum(["render-placeholder", "diagram", "official-link"]),
  label: z.string().min(2),
  alt: z.string().min(8),
  url: z.string().nullable(),
  license: z.string().min(2),
  source: z.string().min(2),
});

export const dimensionSchema = z.object({
  lengthMm: z.number().nullable(),
  widthMm: z.number().nullable(),
  heightMm: z.number().nullable(),
});

export const carSchema = z.object({
  modelId: z.string().min(2),
  slug: z.string().min(2),
  name: z.string().min(2),
  segment: z.string().min(2),
  bodyStyle: z.string().min(2),
  versions: z.array(z.string().min(2)).min(1),
  priceListedVnd: z.number().nullable(),
  rangeKm: z.number().nullable(),
  rangeStandard: z.string().nullable(),
  powerKw: z.number().nullable(),
  torqueNm: z.number().nullable(),
  batteryKwh: z.number().nullable(),
  chargingTime: z.string().nullable(),
  dimensions: dimensionSchema,
  wheelbaseMm: z.number().nullable(),
  seats: z.number().nullable(),
  drivetrain: z.string().nullable(),
  safety: z.array(z.string()),
  adas: z.array(z.string()),
  interiorComfort: z.array(z.string()),
  exteriorColors: z.array(z.string()),
  gallery: z.array(galleryItemSchema),
  sourceUrl: z.string().url(),
  sourceName: z.string().min(2),
  sourceLastCheckedAt: z.string().date(),
  confidenceScore: z.number().min(0).max(1),
  notes: z.array(z.string()),
  fieldSources: z.record(z.string(), sourceTraceSchema),
});

export const carCollectionSchema = z.array(carSchema);

export type CarModel = z.infer<typeof carSchema>;
export type SourceTrace = z.infer<typeof sourceTraceSchema>;
