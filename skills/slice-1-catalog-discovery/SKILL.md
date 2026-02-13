---
name: slice-1-catalog-discovery
description: Implement or refine Slice 1 catalog discovery work in Chase Sets: search, item detail, version path normalization, and deterministic version resolution. Use when building search APIs, version resolve APIs, or web flows for search -> item -> versionId.
---

# Slice 1 Catalog Discovery

## Read First
- `AGENT.md`
- `artifacts/22-slice-1-catalog-discovery.md`
- `domains/catalog/docs/01-version-identity-and-resolution.md`
- `domains/catalog/docs/02-mvp-version-keys-and-facets.md`
- `domains/catalog/docs/15-version-system.md`
- `domains/search/docs/19-search-and-filtering-requirements.md`

## Workflow
1. Lock catalog identity contract first (`itemId + normalizedVersionPath -> versionId`).
2. Ensure stable `optionKey` and `optionValueKey` usage; labels are display-only.
3. Implement server-side normalization and explicit error codes for resolve failures.
4. Keep filter/facet behavior config-driven and category-agnostic.
5. Implement API contracts for:
   - `GET /search`
   - `GET /catalog/items/{itemId}`
   - `POST /versions/resolve`
6. Ensure search ranking preserves exact identifier behavior.
7. Validate end-to-end: search -> item detail -> version resolution.

## Hard Rules
- Do not hardcode domain-specific option names in engine logic.
- Treat version identity as keys, not labels or presentation sort.
- Keep resolve outputs deterministic across environments.
- Keep filter additions/reordering as config changes, not feature-code forks.

## Deliverables
- Deterministic version resolution behavior.
- API contracts and error handling for slice endpoints.
- Search/filter mapping aligned to catalog facet contracts.
- Regression tests for normalization and identifier queries.

## Quick Review Checklist
- Normalization is canonical and server-side.
- `versionId` derives from normalized key-based path.
- Resolve errors are explicit and machine-readable.
- Search exact-match guardrails are preserved.
- Facets and filter config are admin-driven.
