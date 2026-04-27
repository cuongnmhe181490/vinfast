export type VehicleHotspot = {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  sourceField?: string;
};

export type ProductPhotoAsset = {
  url: string;
  alt: string;
  license: string;
  sourceName: string;
  sourceUrl: string;
  attribution: string;
};

export type PreciseModelAsset = {
  provider: "sketchfab";
  uid: string;
  title: string;
  sourceUrl: string;
  embedUrl: string;
  author: string;
  license: string;
  scope: "exterior-only" | "full-vehicle";
  triangles?: string;
  notes: string;
};

export type VehicleAssetManifest = {
  modelId: string;
  renderImageUrl: string;
  productPhoto?: ProductPhotoAsset;
  preciseModel?: PreciseModelAsset;
  exteriorModelUrl: string | null;
  interiorModelUrl: string | null;
  partsModelUrl: string | null;
  lowPolyModelUrl: string | null;
  textureSet: string | null;
  hotspots: VehicleHotspot[];
  animations: string[];
  license: string;
  source: string;
  assetStatus: "placeholder" | "generated-demo" | "licensed-demo" | "licensed-production";
};

const defaultHotspots: VehicleHotspot[] = [
  {
    id: "battery",
    label: "Pin",
    description: "Khối pin đặt thấp dưới sàn trong mô phỏng, giúp hạ trọng tâm xe điện.",
    position: [0, -0.55, 0.05],
    sourceField: "batteryKwh",
  },
  {
    id: "motor",
    label: "Mô-tơ điện",
    description: "Cụm mô-tơ minh họa truyền lực tới bánh, không phải bố trí kỹ thuật chính xác.",
    position: [1.35, -0.25, 0.15],
    sourceField: "powerKw",
  },
  {
    id: "adas",
    label: "ADAS",
    description: "Các cảm biến và camera được minh họa bằng hotspot để giải thích chức năng hỗ trợ lái.",
    position: [0, 0.7, -1.95],
    sourceField: "adas",
  },
  {
    id: "interior",
    label: "Nội thất",
    description: "Khu vực ghế lái, màn hình, vô lăng và ghế sau trong tour nội thất.",
    position: [-0.25, 0.55, 0.08],
    sourceField: "interiorComfort",
  },
  {
    id: "charging-port",
    label: "Cổng sạc",
    description: "Vị trí cổng sạc mang tính minh họa, dùng để dẫn người dùng tới nội dung pin và trạm sạc.",
    position: [-1.28, 0.1, -1.1],
  },
];

const productPhotos: Record<string, ProductPhotoAsset> = {
  "vf-3": {
    url: "/assets/photos/commons/vf-3.jpg",
    alt: "Ảnh xe VinFast VF 3 chụp góc trước trái, nguồn Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2025_VinFast_VF_3,_front_left.jpg",
    attribution: "Ethan Llamas, Own work",
  },
  "vf-5": {
    url: "/assets/photos/commons/vf-5.jpg",
    alt: "Ảnh xe VinFast VF 5 chụp góc trước trái, nguồn Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2024_VinFast_VF5,_front_left,_06-14-2024.jpg",
    attribution: "Ethan Llamas, Own work",
  },
  "vf-6": {
    url: "/assets/photos/commons/vf-6.jpg",
    alt: "Ảnh xe VinFast VF 6 màu đỏ, nguồn Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:NewOne_-_red_electric_Suv_VinFast_VF_6.jpg",
    attribution: "Newone, Own work",
  },
  "vf-7": {
    url: "/assets/photos/commons/vf-7.jpg",
    alt: "Ảnh xe VinFast VF 7 màu xanh, nguồn Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2025_VinFast_VF_7_in_Vinfast_Blue,_front_right.jpg",
    attribution: "Ethan Llamas, Own work",
  },
  "vf-8": {
    url: "/assets/photos/commons/vf-8-front.jpg",
    alt: "Ảnh xe VinFast VF 8 màu đen chụp góc trước, nguồn Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2022_Vinfast_VF8_front_view.jpg",
    attribution: "m.kienthuc.net.vn",
  },
  "vf-9": {
    url: "/assets/photos/commons/vf-9.jpg",
    alt: "Ảnh xe VinFast VF 9 chụp góc trước trái, nguồn Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2024_VinFast_VF9,_front_left,_06-11-2024.jpg",
    attribution: "Ethan Llamas, Own work",
  },
  "vf-e34": {
    url: "/assets/photos/commons/vf-e34.jpg",
    alt: "Ảnh xe VinFast VF e34, nguồn Wikimedia Commons",
    license: "CC BY-SA 4.0",
    sourceName: "Wikimedia Commons",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Horizontal_shot_of_VinFast_VF_e34.jpg",
    attribution: "Baoothersks, Own work",
  },
};

const preciseModels: Record<string, PreciseModelAsset> = {
  "vf-3": sketchfabModel({
    uid: "8751c1412f4a4ebba789e8245c28f929",
    title: "Vinfast VF3",
    author: "Leo Tran",
    license: "Sketchfab embed; exterior-only model, contact creator for commercial/download licensing",
    scope: "exterior-only",
    triangles: "1.3M",
    notes: "High-detail exterior model based on public references. Interior is not included.",
  }),
  "vf-5": sketchfabModel({
    uid: "1e016aeca166429fa442c9e6f25e8f1d",
    title: "Vinfast VF5",
    author: "Leo Tran",
    license: "Sketchfab embed; exterior-only model, contact creator for commercial/download licensing",
    scope: "exterior-only",
    triangles: "1.2M",
    notes: "High-detail exterior model based on public references. Interior is not included.",
  }),
  "vf-6": sketchfabModel({
    uid: "aa05ba4d64334f218386fb51c1e3eecd",
    title: "Vinfast VF6",
    author: "Leo Tran",
    license: "Sketchfab embed; exterior-only model, contact creator for commercial/download licensing",
    scope: "exterior-only",
    triangles: "1.2M",
    notes: "High-detail exterior model based on public references. Interior is not included.",
  }),
  "vf-7": sketchfabModel({
    uid: "0267de9d28c3420db5fc525b9d241007",
    title: "Vinfast VF7",
    author: "Leo Tran",
    license: "Sketchfab embed; exterior-only model, contact creator for commercial/download licensing",
    scope: "exterior-only",
    triangles: "1.8M",
    notes: "High-detail exterior model based on public references. Interior is not included.",
  }),
  "vf-8": sketchfabModel({
    uid: "510ee60176644d89a35ff9e270088c88",
    title: "Vinfast VF8 concept",
    author: "Leo Tran",
    license: "Sketchfab embed; exterior-only model, contact creator for commercial/download licensing",
    scope: "exterior-only",
    triangles: "3M",
    notes: "High-detail exterior concept model. Interior is not included.",
  }),
  "vf-9": sketchfabModel({
    uid: "eb0bf6c601944289aac22f99485af0f5",
    title: "Vinfast VF9",
    author: "Leo Tran",
    license: "Sketchfab embed; exterior-only model, contact creator for commercial/download licensing",
    scope: "exterior-only",
    triangles: "1.9M",
    notes: "High-detail exterior model based on public references. Interior is not included.",
  }),
  "vf-e34": sketchfabModel({
    uid: "a24da5d6c3c74dc4af63563e96b7f6a5",
    title: "Vf E34",
    author: "thangnguyen.solutionspace",
    license: "CC Attribution via Sketchfab",
    scope: "exterior-only",
    triangles: "418.8k",
    notes: "User-contributed downloadable model; verify quality before production use.",
  }),
};

function sketchfabModel({
  uid,
  title,
  author,
  license,
  scope,
  triangles,
  notes,
}: Omit<PreciseModelAsset, "provider" | "sourceUrl" | "embedUrl">): PreciseModelAsset {
  return {
    provider: "sketchfab",
    uid,
    title,
    sourceUrl: `https://sketchfab.com/3d-models/${title.toLowerCase().replaceAll(" ", "-")}-${uid}`,
    embedUrl: `https://sketchfab.com/models/${uid}/embed?autostart=1&preload=1&ui_infos=0&ui_ar=0&ui_help=0&ui_settings=0&ui_watermark=1`,
    author,
    license,
    scope,
    triangles,
    notes,
  };
}

export function getVehicleAssetManifest(modelId: string): VehicleAssetManifest {
  return {
    modelId,
    renderImageUrl: `/assets/renders/vehicles/${modelId}.svg`,
    productPhoto: productPhotos[modelId],
    preciseModel: preciseModels[modelId],
    exteriorModelUrl: null,
    interiorModelUrl: null,
    partsModelUrl: null,
    lowPolyModelUrl: null,
    textureSet: null,
    hotspots: defaultHotspots,
    animations: ["rotate360", "explode", "interiorCamera", "xray", "doorOpen", "trunkOpen"],
    license:
      "3D viewer and vehicle renders are generated in-code by VF Showcase Demo as generic EV demo assets. No VinFast copyrighted images, logo, or official 3D assets are bundled.",
    source: "Generated in src/components/three/VehicleModel.tsx and scripts/generate-demo-renders.ts",
    assetStatus: "generated-demo",
  };
}
