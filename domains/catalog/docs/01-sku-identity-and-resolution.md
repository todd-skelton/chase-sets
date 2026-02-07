# Catalog — SKU Identity, VariantPath Normalization, and Resolution (MVP)

## Purpose

Define the **deterministic contract** for:

- Variant model keys (dimension/option identifiers)
- `VariantPath` normalization
- `skuId` derivation
- Flattened facets used by Search, Marketplace, Inventory, and Orders

Goal: make `skuId` a stable referential identifier across event streams and projections.

This is requirements/spec only (no implementation).

---

## Canonical references

- Glossary: [../../../artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md)
- Variant system principles: [15-variant-system.md](15-variant-system.md)
- Slice 1 spec: [../../../artifacts/22-slice-1-catalog-discovery.md](../../../artifacts/22-slice-1-catalog-discovery.md)

---

## Definitions (canonical)

- `catalogItemId`: identifies the curated catalog item.
- `variantModelKey`: stable identifier for the variant model template applied to a catalog item.
- `dimensionKey`: stable identifier for a variant dimension (admin-defined data; e.g., `type`, `size`, `color`, `language`).
- `optionKey`: stable identifier for an option within a dimension (admin-defined data; e.g., `graded`, `m`, `red`, `en`).
- `VariantPath`: the ordered list of selected (`dimensionKey`, `optionKey`) pairs (type name).
- `variantPath`: the ordered list of selected (`dimensionKey`, `optionKey`) pairs (field/property name).
- `skuId`: stable identifier for `CatalogItem + VariantPath`.

In MVP, VariantPath supports **staged selection** (multi-step paths): selecting an early option (e.g., “Type”) enables the next required dimension(s).

Important: names like “Type”, “Graded”, “Condition”, “Size”, and “Color” are not special-cased in code. They are authored in the variant-system admin UI as VariantModel data (dimensions, options, constraints, facet rules). The contract here is the normalization + identity algorithm and the stability rules.

---

## Hard rules (MVP)

### R1) Keys are stable; labels can change

- `dimensionKey` and `optionKey` MUST be stable over time.
- Human labels (`label`) may change without changing meaning.
- Renaming a key is treated as a breaking change requiring an explicit migration plan.

### R2) A SKU is defined by keys, not labels

A SKU is defined by:

- `catalogItemId`
- normalized `VariantPath` consisting of stable keys

### R3) VariantPath is normalized server-side

The API MUST accept a VariantPath in a user-friendly form, validate it against the Variant Model, and then **normalize** it to a canonical ordering.

The API returns the normalized path and uses it for `skuId` derivation.

### R4) Facets are stable contracts

Flattened facets emitted by resolution MUST use stable facet keys, suitable for:

- search filtering
- market segmentation (per-SKU order book)
- inventory balances

---

## Canonical Variant Model shape (doc-only schema)

This is the minimum shape we need to define in docs to unblock API/Web work.

### VariantModel

- `variantModelKey: string` (stable)
- `version: number` (monotonic, informational; not used for SKU identity)
- `rootDimensions: DimensionKey[]` (entry points)
- `dimensions: Record<DimensionKey, VariantDimension>`
- `constraints: VariantConstraint[]` (optional)
- `facetRules: FacetRule[]` (how to materialize flattened facets)

### VariantDimension

- `dimensionKey: string` (stable)
- `label: string`
- `sortOrder?: number` (presentation-only; does not affect SKU identity)
- `required: boolean`
- `selection: "single" | "multi"`
- `options: VariantOption[]`
- `visibilityRules?: VisibilityRule[]` (optional)

### VariantOption

- `optionKey: string` (stable)
- `label: string`
- `sortOrder?: number` (presentation-only; does not affect SKU identity)
- `childDimensions?: DimensionKey[]` (optional)
- `facetOverrides?: Record<string, string | number | boolean>` (optional)

Notes:

- The model supports conditional trees/DAGs by attaching `childDimensions` to options.
- Visibility rules can be implemented later; for MVP, we can keep it simple but the keys must exist.

---

## VariantPath normalization (canonical algorithm)

### Inputs

- `catalogItemId`
- proposed `variantPath[]`: list of `{ dimensionKey, optionKey }`
- the Variant Model associated with the catalog item

### Output

- `normalizedVariantPath[]` in canonical order

### Canonical ordering rule

1. Start at `rootDimensions` in the order defined by the Variant Model.
2. For each dimension in traversal order:
   - ensure a valid selection exists if `required=true`
   - validate the selected `optionKey` exists for that dimension
   - append `{dimensionKey, optionKey}` to the normalized output
   - enqueue that option's `childDimensions` (in the order defined by the model) and continue

3. Dimensions not reachable from the selected path MUST be ignored (or rejected if provided).

### Staged (multi-step) paths

This algorithm intentionally models flows like:

- `Type: Graded → Company: PSA → Grade: 10 GEM MT`
- `Type: Conditioned → Condition: Near Mint`
- `Type: Sealed`

Important identity rule:

- The SKU is defined by the **leaf outcome** (e.g., “Sealed” or “Graded+PSA+10”) and therefore includes **all selected options along the enabled path**.
- Intermediate selections are not “temporary”; they are part of the canonical VariantPath keys that define SKU identity.

### Validation rules

- Missing required dimensions → error
- Unknown `dimensionKey`/`optionKey` → error
- Invalid combination (constraint violation) → error
- Multi-select dimensions (if used) must normalize to a stable ordering rule:
  - MVP rule: sort selected `optionKey`s lexicographically for that dimension

---

## `skuId` derivation (deterministic)

### Goal

Given the same `catalogItemId` and the same normalized VariantPath keys, the system MUST derive the same `skuId` forever.

### Canonical `skuIdentityString`

Define:

- `skuIdentityString = catalogItemId + ":" + join(
  normalizedVariantPath.map(p => p.dimensionKey + "=" + p.optionKey),
  ";"
)`

Example:

- `cat_01...:type=graded;company=psa;grade=10`

Additional examples (illustrative; exact keys come from the Catalog variant config):

- Sealed:
  - `cat_01...:type=sealed`
- Conditioned (raw single):
  - `cat_01...:type=conditioned;condition=nm`
- Apparel (multi-dimension):
  - `cat_01...:size=m;color=red`

### Canonical `skuId`

- `skuId = "sku_" + base32(sha256(skuIdentityString))` (prefix is illustrative)

Constraints:

- The encoding must be URL-safe and case-stable.
- `skuId` MUST be treated as an opaque identifier externally.

### Consequences

- Reordering labels or adding optional dimensions does not change existing SKU IDs.
- Changing keys changes SKU identity and requires a deliberate migration.

---

## Flattened facets materialization

Resolution returns `flattenedFacets` derived from the VariantPath.

Facet keys are defined by the VariantModel’s `facetRules` (config/data).

Common examples (illustrative; not hardcoded):

- `type` (e.g., `conditioned | sealed | graded`)
- `language`
- `finish`
- `condition`
- `company` / `gradingCompany`
- `grade` / `gradeLabel`
- `size`, `color`

Rules:

- Facets must use stable keys.
- Facet values must be stable (prefer keys; labels are display-only).

---

## API contract implications (doc-only)

When we implement `POST /skus/resolve`, it must:

- validate + normalize VariantPath
- return `skuId`, `normalizedVariantPath`, and `flattenedFacets`
- return explicit error codes (below)

### Error codes (MVP)

- `INVALID_DIMENSION`
- `INVALID_OPTION`
- `MISSING_REQUIRED_DIMENSION`
- `INVALID_COMBINATION`
- `UNREACHABLE_DIMENSION`

---

## Open questions (to answer before implementation)

- Are there any SKU identity exceptions for Pokémon-specific quirks (e.g., promos, reprints), or is CatalogItem identity sufficient?
- Do we need facet materialization to support conditional/computed facets beyond direct option→facet mapping (MVP default: direct mapping; see [02-mvp-variant-keys-and-facets.md](02-mvp-variant-keys-and-facets.md))?
- Do we ever want SKU equivalence classes (not in MVP)?
