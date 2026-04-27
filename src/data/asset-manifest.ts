export type VehicleHotspot = {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  sourceField?: string;
};

export type VehicleAssetManifest = {
  modelId: string;
  exteriorModelUrl: string | null;
  interiorModelUrl: string | null;
  partsModelUrl: string | null;
  lowPolyModelUrl: string | null;
  textureSet: string | null;
  hotspots: VehicleHotspot[];
  animations: string[];
  license: string;
  source: string;
  assetStatus: "placeholder" | "licensed-production";
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

export function getVehicleAssetManifest(modelId: string): VehicleAssetManifest {
  return {
    modelId,
    exteriorModelUrl: null,
    interiorModelUrl: null,
    partsModelUrl: null,
    lowPolyModelUrl: null,
    textureSet: null,
    hotspots: defaultHotspots,
    animations: ["rotate360", "explode", "interiorCamera", "xray", "doorOpen", "trunkOpen"],
    license: "Generated primitives in-app; no VinFast copyrighted 3D assets are bundled.",
    source: "VF Showcase Demo placeholder asset system",
    assetStatus: "placeholder",
  };
}
