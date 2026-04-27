# Asset Pipeline

## Phase 1

- Use generated primitive placeholder vehicles in React Three Fiber.
- No official VinFast logos, photos or 3D models are bundled.
- Asset records live in `src/data/asset-manifest.ts`.

## Production Model Requirements

- Format: `.glb` or `.gltf`.
- Compression: Draco for geometry.
- Textures: KTX2 where possible.
- Separate exterior, interior and parts model URLs.
- Store license, source, author, acquisition date and allowed usage.

## Part Naming

Production assets should expose named groups:

- `bodyShell`
- `doors`
- `hood`
- `trunk`
- `wheels`
- `batteryPack`
- `motorUnit`
- `inverter`
- `suspension`
- `seats`
- `dashboard`
- `steeringWheel`
- `infotainment`

## Replacement Steps

1. Add licensed model files or CDN URLs.
2. Update `src/data/asset-manifest.ts` for the target `modelId`.
3. Map model group names in `VehicleModel`.
4. Keep placeholder fallback for unsupported devices.
