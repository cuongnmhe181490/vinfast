# VF Showcase Demo

Premium Next.js showroom demo for exploring VinFast vehicle lines with a 3D placeholder viewer, sourced seed data, SEO routes and enterprise-style documentation.

This is a portfolio/demo website. It is not the official VinFast website and does not bundle official VinFast logos, photos or 3D models.

## Stack

- Next.js App Router
- TypeScript strict
- Tailwind CSS
- Framer Motion
- Three.js, React Three Fiber, Drei
- Zustand
- Zod
- Vitest
- Playwright

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run validate:data
npm run test
npm run build
npm run test:e2e
```

## Add A New Vehicle

1. Add `src/data/cars/{slug}.json`.
2. Follow `src/data/schemas/car.schema.ts`.
3. Include source metadata: `sourceUrl`, `sourceName`, `sourceLastCheckedAt`, `confidenceScore`, `notes`.
4. Add or extend the matching asset entry in `src/data/asset-manifest.ts`.
5. Run `npm run validate:data`.

No core route logic needs to change if the JSON record is valid.

## Replace Placeholder 3D With Licensed Models

1. Acquire licensed `.glb` or `.gltf` files.
2. Prefer Draco compression and KTX2 textures.
3. Update `src/data/asset-manifest.ts` with exterior, interior, parts and low-poly URLs.
4. Map part groups in `src/components/three/VehicleModel.tsx`.
5. Keep fallback mode for mobile and unsupported WebGL devices.

## Important Docs

- `docs/PRODUCT_STRATEGY.md`
- `docs/DATA_GOVERNANCE.md`
- `docs/SEO_PLAN.md`
- `docs/SECURITY_CHECKLIST.md`
- `docs/QA_TEST_PLAN.md`
- `docs/ASSET_PIPELINE.md`
- `docs/ROADMAP.md`
- `docs/data-validation-report.md`
