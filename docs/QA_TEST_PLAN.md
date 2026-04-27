# QA Test Plan

## Automated Checks

- `npm run lint`
- `npm run typecheck`
- `npm run validate:data`
- `npm run test`
- `npm run build`
- `npm run test:e2e`

## Unit Coverage

- Car schema loading and validation.
- Formatting helpers for missing specs and dimensions.
- Compare logic and difference detection.

## E2E Coverage

- Home page loads.
- Cars listing loads.
- Car detail page loads and fallback does not crash.
- Compare page supports selecting cars and filtering differences.
- Mobile viewport has no horizontal overflow.

## Accessibility Smoke

- Buttons use accessible names.
- Focus states are present through global CSS.
- 3D has fallback table/card content.
- Reduced motion is respected in global CSS.
