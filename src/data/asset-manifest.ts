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

export type VehicleAssetManifest = {
  modelId: string;
  renderImageUrl: string;
  productPhoto?: ProductPhotoAsset;
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

export function getVehicleAssetManifest(modelId: string): VehicleAssetManifest {
  return {
    modelId,
    renderImageUrl: `/assets/renders/vehicles/${modelId}.svg`,
    productPhoto: productPhotos[modelId],
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
