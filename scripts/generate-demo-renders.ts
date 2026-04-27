import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type BodyStyle = "mini" | "hatchback" | "crossover" | "suv" | "mpv";

type RenderSpec = {
  modelId: string;
  name: string;
  body: BodyStyle;
  paint: string;
  accent: string;
};

type BodyShape = {
  roof: string;
  body: string;
  glass: string;
  shoulder: string;
  wheelRearX: number;
  wheelFrontX: number;
  wheelY: number;
  wheelR: number;
};

const renders: RenderSpec[] = [
  { modelId: "herio-green", name: "Herio Green", body: "crossover", paint: "#eef8f4", accent: "#0f8f68" },
  { modelId: "limo-green", name: "Limo Green", body: "mpv", paint: "#edf6ff", accent: "#0077c8" },
  { modelId: "minio-green", name: "Minio Green", body: "mini", paint: "#f8fcff", accent: "#18a4c7" },
  { modelId: "nerio-green", name: "Nerio Green", body: "crossover", paint: "#effdf8", accent: "#0f8f68" },
  { modelId: "vf-3", name: "VF 3", body: "mini", paint: "#f7fbff", accent: "#0077c8" },
  { modelId: "vf-5", name: "VF 5", body: "crossover", paint: "#edf6fb", accent: "#0b5c7a" },
  { modelId: "vf-6", name: "VF 6", body: "crossover", paint: "#f8fbff", accent: "#087b9b" },
  { modelId: "vf-7", name: "VF 7", body: "suv", paint: "#edf4fb", accent: "#bd1d2c" },
  { modelId: "vf-8", name: "VF 8", body: "suv", paint: "#f1f7fb", accent: "#042f5f" },
  { modelId: "vf-9", name: "VF 9", body: "suv", paint: "#f3f8fb", accent: "#0b2239" },
  { modelId: "vf-e34", name: "VF e34", body: "hatchback", paint: "#f4fbff", accent: "#0077c8" },
];

const bodies: Record<BodyStyle, BodyShape> = {
  mini: {
    roof: "M462 408 C535 292 744 282 880 402 C920 438 960 474 1008 536 L350 536 C382 486 419 442 462 408 Z",
    body: "M268 538 C310 448 424 405 608 405 H902 C1048 405 1160 492 1200 626 L1230 710 H206 L238 604 C244 578 254 556 268 538 Z",
    glass: "M502 430 C578 345 742 345 852 432 L910 512 H424 C444 478 468 450 502 430 Z",
    shoulder: "M294 590 C434 548 820 536 1128 598",
    wheelRearX: 448,
    wheelFrontX: 1012,
    wheelY: 704,
    wheelR: 86,
  },
  hatchback: {
    roof: "M412 416 C510 292 792 292 950 430 C996 470 1038 512 1098 586 L334 586 C350 520 376 462 412 416 Z",
    body: "M212 584 C264 476 406 428 626 428 H930 C1108 428 1240 526 1282 682 L1302 748 H154 L188 646 C194 620 202 598 212 584 Z",
    glass: "M474 446 C574 350 778 352 912 456 L980 560 H388 C406 512 430 474 474 446 Z",
    shoulder: "M250 636 C452 582 812 576 1200 642",
    wheelRearX: 436,
    wheelFrontX: 1068,
    wheelY: 742,
    wheelR: 92,
  },
  crossover: {
    roof: "M380 420 C496 286 838 284 1028 438 C1090 488 1142 540 1204 612 H308 C324 532 348 468 380 420 Z",
    body: "M160 610 C218 488 380 430 644 430 H1000 C1194 430 1340 540 1380 704 L1398 778 H94 L130 668 C136 644 146 624 160 610 Z",
    glass: "M458 450 C562 346 800 350 972 470 L1050 584 H350 C372 524 404 478 458 450 Z",
    shoulder: "M198 660 C444 594 864 592 1296 668",
    wheelRearX: 418,
    wheelFrontX: 1132,
    wheelY: 770,
    wheelR: 98,
  },
  suv: {
    roof: "M350 420 C464 276 894 274 1114 462 C1172 512 1220 560 1288 644 H276 C294 544 318 472 350 420 Z",
    body: "M112 636 C170 502 348 432 658 432 H1050 C1272 432 1434 562 1472 736 L1486 812 H58 L92 704 C98 676 104 654 112 636 Z",
    glass: "M430 448 C548 340 842 344 1038 494 L1116 616 H320 C344 538 378 482 430 448 Z",
    shoulder: "M154 690 C432 612 914 612 1378 698",
    wheelRearX: 406,
    wheelFrontX: 1196,
    wheelY: 802,
    wheelR: 106,
  },
  mpv: {
    roof: "M298 424 C438 278 982 280 1200 486 C1264 546 1310 606 1364 676 H220 C244 554 268 476 298 424 Z",
    body: "M72 654 C144 510 344 440 708 440 H1122 C1338 440 1486 584 1514 760 L1524 832 H38 L62 728 C66 696 68 674 72 654 Z",
    glass: "M388 452 C520 348 908 350 1116 514 L1204 648 H274 C300 560 334 494 388 452 Z",
    shoulder: "M120 706 C432 622 998 628 1418 720",
    wheelRearX: 420,
    wheelFrontX: 1258,
    wheelY: 820,
    wheelR: 104,
  },
};

function renderWheel(id: string, x: number, y: number, r: number, accent: string) {
  const spoke = Array.from({ length: 10 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 10;
    const x2 = x + Math.cos(angle) * r * 0.48;
    const y2 = y + Math.sin(angle) * r * 0.48;
    return `<line x1="${x}" y1="${y}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#dfeaf0" stroke-width="${Math.max(7, r * 0.075).toFixed(1)}" stroke-linecap="round"/>`;
  }).join("");

  return `<g>
    <circle cx="${x}" cy="${y}" r="${r}" fill="#07111e"/>
    <circle cx="${x}" cy="${y}" r="${r * 0.72}" fill="url(#rim_${id})"/>
    <circle cx="${x}" cy="${y}" r="${r * 0.5}" fill="#0b1726"/>
    ${spoke}
    <circle cx="${x}" cy="${y}" r="${r * 0.2}" fill="${accent}"/>
  </g>`;
}

function renderSvg(spec: RenderSpec) {
  const id = spec.modelId.replaceAll("-", "_");
  const shape = bodies[spec.body];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000" role="img" aria-labelledby="title_${id} desc_${id}">
  <title id="title_${id}">${spec.name} studio demo render</title>
  <desc id="desc_${id}">Render studio tự tạo cho website demo, không phải ảnh sản phẩm chính thức của VinFast.</desc>
  <defs>
    <linearGradient id="bg_${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="46%" stop-color="#eef9ff"/>
      <stop offset="100%" stop-color="#f8fbff"/>
    </linearGradient>
    <radialGradient id="halo_${id}" cx="50%" cy="34%" r="58%">
      <stop offset="0%" stop-color="${spec.accent}" stop-opacity="0.18"/>
      <stop offset="70%" stop-color="${spec.accent}" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="${spec.accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="paint_${id}" x1="0" y1="0.05" x2="1" y2="0.95">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="42%" stop-color="${spec.paint}"/>
      <stop offset="78%" stop-color="#d9e8f0"/>
      <stop offset="100%" stop-color="#f8fbff"/>
    </linearGradient>
    <linearGradient id="glass_${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e9fbff"/>
      <stop offset="44%" stop-color="#6ea6c8"/>
      <stop offset="100%" stop-color="#07111e"/>
    </linearGradient>
    <linearGradient id="rim_${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#b9c9d4"/>
      <stop offset="100%" stop-color="#eef6fb"/>
    </linearGradient>
    <filter id="shadow_${id}" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="42" stdDeviation="32" flood-color="#08213b" flood-opacity="0.22"/>
    </filter>
    <filter id="floor_${id}" x="-20%" y="-30%" width="140%" height="160%">
      <feGaussianBlur stdDeviation="28"/>
    </filter>
  </defs>
  <rect width="1600" height="1000" rx="64" fill="url(#bg_${id})"/>
  <rect width="1600" height="1000" rx="64" fill="url(#halo_${id})"/>
  <path d="M160 826 C470 744 1104 742 1450 828" fill="none" stroke="#cbe8f6" stroke-width="3" opacity="0.62"/>
  <ellipse cx="812" cy="838" rx="612" ry="82" fill="#08213b" opacity="0.12" filter="url(#floor_${id})"/>
  <g filter="url(#shadow_${id})">
    <path d="${shape.roof}" fill="url(#paint_${id})"/>
    <path d="${shape.body}" fill="url(#paint_${id})"/>
    <path d="${shape.roof}" fill="#ffffff" opacity="0.24"/>
    <path d="${shape.glass}" fill="url(#glass_${id})" opacity="0.9"/>
    <path d="${shape.glass}" fill="#ffffff" opacity="0.14"/>
    <path d="${shape.shoulder}" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" opacity="0.5"/>
    <path d="${shape.shoulder}" fill="none" stroke="${spec.accent}" stroke-width="7" stroke-linecap="round" opacity="0.92"/>
    <path d="M246 672 H1378" stroke="#0b1726" stroke-width="28" stroke-linecap="round" opacity="0.18"/>
    <path d="M1030 612 C1138 626 1228 662 1304 724" fill="none" stroke="#e8fbff" stroke-width="16" stroke-linecap="round"/>
    <path d="M154 648 H256" fill="none" stroke="#e8fbff" stroke-width="14" stroke-linecap="round"/>
    <path d="M468 452 L432 612" stroke="#ffffff" stroke-width="9" opacity="0.62"/>
    <path d="M692 388 L688 614" stroke="#ffffff" stroke-width="9" opacity="0.62"/>
    ${renderWheel(id, shape.wheelRearX, shape.wheelY, shape.wheelR, spec.accent)}
    ${renderWheel(id, shape.wheelFrontX, shape.wheelY, shape.wheelR, spec.accent)}
  </g>
  <path d="M410 874 C650 920 984 920 1208 874" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.7"/>
</svg>
`;
}

const outDir = join(process.cwd(), "public", "assets", "renders", "vehicles");
mkdirSync(outDir, { recursive: true });

for (const spec of renders) {
  writeFileSync(join(outDir, `${spec.modelId}.svg`), renderSvg(spec), "utf8");
}

console.log(`Generated ${renders.length} demo vehicle renders in ${outDir}`);
