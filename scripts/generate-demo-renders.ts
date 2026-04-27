import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type RenderSpec = {
  modelId: string;
  name: string;
  segment: string;
  body: "mini" | "hatchback" | "crossover" | "suv" | "mpv";
  color: string;
  accent: string;
};

const renders: RenderSpec[] = [
  { modelId: "herio-green", name: "Herio Green", segment: "Xe điện dịch vụ đô thị", body: "crossover", color: "#e8f7ef", accent: "#0f8f68" },
  { modelId: "limo-green", name: "Limo Green", segment: "MPV điện dịch vụ", body: "mpv", color: "#eff6ff", accent: "#0077c8" },
  { modelId: "minio-green", name: "Minio Green", segment: "Xe điện đô thị cỡ nhỏ", body: "mini", color: "#f7fbff", accent: "#18a4c7" },
  { modelId: "nerio-green", name: "Nerio Green", segment: "Xe điện đô thị cỡ vừa", body: "crossover", color: "#edfdf8", accent: "#0f8f68" },
  { modelId: "vf-3", name: "VF 3", segment: "Ô tô điện mini đô thị", body: "mini", color: "#f7fbff", accent: "#0077c8" },
  { modelId: "vf-5", name: "VF 5", segment: "SUV hạng A", body: "crossover", color: "#eef6fb", accent: "#0b5c7a" },
  { modelId: "vf-6", name: "VF 6", segment: "SUV hạng B", body: "crossover", color: "#f8fbff", accent: "#087b9b" },
  { modelId: "vf-7", name: "VF 7", segment: "SUV hạng C", body: "suv", color: "#edf4fb", accent: "#bd1d2c" },
  { modelId: "vf-8", name: "VF 8", segment: "SUV hạng D", body: "suv", color: "#f1f7fb", accent: "#042f5f" },
  { modelId: "vf-9", name: "VF 9", segment: "SUV hạng E", body: "suv", color: "#f3f8fb", accent: "#0b2239" },
  { modelId: "vf-e34", name: "VF e34", segment: "SUV điện đô thị", body: "hatchback", color: "#f4fbff", accent: "#0077c8" },
];

const bodyShape: Record<RenderSpec["body"], { roof: string; body: string; rear: string; front: string; wheelGap: number }> = {
  mini: {
    roof: "M332 268 C382 202 512 190 592 246 L660 314 L292 314 Z",
    body: "M224 324 C246 274 315 252 406 252 H612 C714 252 806 296 840 356 L876 420 H174 L192 360 C198 342 209 331 224 324 Z",
    rear: "M250 350 L332 306",
    front: "M740 314 C798 326 840 354 862 400",
    wheelGap: 438,
  },
  hatchback: {
    roof: "M312 282 C382 196 548 192 654 282 L732 342 H264 Z",
    body: "M188 370 C224 306 304 278 432 278 H682 C780 278 872 328 908 410 L928 462 H128 L148 406 C156 386 170 376 188 370 Z",
    rear: "M220 392 L308 318",
    front: "M766 318 C842 340 892 382 912 444",
    wheelGap: 512,
  },
  crossover: {
    roof: "M292 278 C370 186 580 184 710 284 L806 358 H230 Z",
    body: "M150 386 C196 304 290 272 446 272 H720 C838 272 936 334 972 430 L990 490 H94 L122 420 C130 402 140 392 150 386 Z",
    rear: "M188 406 L288 322",
    front: "M820 326 C902 350 952 398 974 468",
    wheelGap: 575,
  },
  suv: {
    roof: "M276 276 C352 178 618 174 780 290 L860 374 H220 Z",
    body: "M118 402 C164 316 276 274 462 274 H760 C898 274 1002 348 1032 454 L1048 520 H68 L98 442 C104 424 110 410 118 402 Z",
    rear: "M160 420 L276 326",
    front: "M848 334 C936 362 1002 418 1026 492",
    wheelGap: 638,
  },
  mpv: {
    roof: "M238 280 C330 178 684 176 844 304 L928 398 H172 Z",
    body: "M92 408 C144 318 274 282 498 282 H806 C962 282 1060 362 1088 476 L1098 532 H40 L72 448 C78 428 84 416 92 408 Z",
    rear: "M138 432 L250 326",
    front: "M902 350 C994 378 1062 430 1084 506",
    wheelGap: 710,
  },
};

function renderSvg(spec: RenderSpec) {
  const shape = bodyShape[spec.body];
  const rearWheel = 266;
  const frontWheel = rearWheel + shape.wheelGap;
  const nameId = spec.modelId.replaceAll("-", "_");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" role="img" aria-labelledby="title_${nameId} desc_${nameId}">
  <title id="title_${nameId}">${spec.name} demo render</title>
  <desc id="desc_${nameId}">Ảnh render tự tạo cho website demo, không phải ảnh sản phẩm chính thức của VinFast.</desc>
  <defs>
    <linearGradient id="bg_${nameId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f7fbff"/>
      <stop offset="48%" stop-color="#e7f6ff"/>
      <stop offset="100%" stop-color="#ffffff"/>
    </linearGradient>
    <linearGradient id="paint_${nameId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="52%" stop-color="${spec.color}"/>
      <stop offset="100%" stop-color="#dbeaf2"/>
    </linearGradient>
    <linearGradient id="glass_${nameId}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#dff4ff"/>
      <stop offset="100%" stop-color="#0b2239"/>
    </linearGradient>
    <filter id="shadow_${nameId}" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="30" stdDeviation="26" flood-color="#08213b" flood-opacity="0.20"/>
    </filter>
    <filter id="soft_${nameId}" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="22"/>
    </filter>
  </defs>
  <rect width="1200" height="760" rx="54" fill="url(#bg_${nameId})"/>
  <circle cx="990" cy="145" r="210" fill="${spec.accent}" opacity="0.07"/>
  <circle cx="250" cy="615" r="190" fill="#0077c8" opacity="0.06"/>
  <ellipse cx="596" cy="584" rx="462" ry="58" fill="#072a4a" opacity="0.12" filter="url(#soft_${nameId})"/>
  <g filter="url(#shadow_${nameId})">
    <path d="${shape.roof}" fill="url(#paint_${nameId})"/>
    <path d="${shape.body}" fill="url(#paint_${nameId})"/>
    <path d="${shape.roof}" fill="#ffffff" opacity="0.28"/>
    <path d="M342 286 C414 222 564 222 656 294 L716 352 H290 Z" fill="url(#glass_${nameId})" opacity="0.86"/>
    <path d="M514 242 L514 354" stroke="#ffffff" stroke-width="10" opacity="0.72"/>
    <path d="${shape.rear}" stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity="0.52"/>
    <path d="${shape.front}" stroke="#ffffff" stroke-width="12" stroke-linecap="round" opacity="0.52"/>
    <path d="M242 472 H954" stroke="${spec.accent}" stroke-width="8" stroke-linecap="round" opacity="0.95"/>
    <path d="M786 412 H914" stroke="#e8fbff" stroke-width="10" stroke-linecap="round"/>
    <path d="M168 430 H236" stroke="#e8fbff" stroke-width="10" stroke-linecap="round"/>
    <g>
      <circle cx="${rearWheel}" cy="516" r="78" fill="#07111e"/>
      <circle cx="${rearWheel}" cy="516" r="48" fill="#e7f3f8"/>
      <circle cx="${rearWheel}" cy="516" r="25" fill="${spec.accent}"/>
      <circle cx="${frontWheel}" cy="516" r="78" fill="#07111e"/>
      <circle cx="${frontWheel}" cy="516" r="48" fill="#e7f3f8"/>
      <circle cx="${frontWheel}" cy="516" r="25" fill="${spec.accent}"/>
    </g>
  </g>
  <g transform="translate(76 82)">
    <rect width="310" height="96" rx="28" fill="#ffffff" opacity="0.74"/>
    <text x="28" y="36" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="800" letter-spacing="4" fill="#0077c8">${spec.segment.toUpperCase()}</text>
    <text x="28" y="76" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="850" fill="#042f5f">${spec.name}</text>
  </g>
  <g transform="translate(788 618)">
    <rect width="328" height="54" rx="27" fill="#ffffff" opacity="0.78"/>
    <circle cx="34" cy="27" r="10" fill="${spec.accent}"/>
    <text x="56" y="34" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="750" fill="#042f5f">Demo render tự tạo - không chính thức</text>
  </g>
</svg>
`;
}

const outDir = join(process.cwd(), "public", "assets", "renders", "vehicles");
mkdirSync(outDir, { recursive: true });

for (const spec of renders) {
  writeFileSync(join(outDir, `${spec.modelId}.svg`), renderSvg(spec), "utf8");
}

console.log(`Generated ${renders.length} demo vehicle renders in ${outDir}`);
