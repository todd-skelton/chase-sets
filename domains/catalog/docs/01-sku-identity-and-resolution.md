# Catalog — SKU Identity, Version Path Normalization, and Resolution (MVP)

## Purpose

Define the **deterministic contract** for:

- Version model keys (option/option value identifiers)
- `VersionPath` normalization
- `skuId` derivation
- Flattened facets used by Search, Marketplace, Inventory, and Orders

Goal: make `skuId` a stable referential identifier across event streams and projections.

This is requirements/spec only (no implementation).

---

## Canonical references

- Glossary: [../../../artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md)
- Version system principles: [15-version-system.md](15-version-system.md)
- Slice 1 spec: [../../../artifacts/22-slice-1-catalog-discovery.md](../../../artifacts/22-slice-1-catalog-discovery.md)

---

## Terminology alignment

This spec uses version-system schema names and follows the Catalog terminology for concepts:

- **Item** = the curated catalog entity (referenced by `itemId`).
- **Option** = the selectable characteristic (represented by `optionKey`).
- **Option Value** = the selectable value (represented by `optionValueKey`).
- **Version** = the resolved selection of Option Values (represented by `VersionPath`).
- **SKU** = the stable identifier for an Item + Version (`skuId`).

---

## Definitions (canonical)

- `itemId`: identifies the curated Item.
- `versionModelKey`: stable identifier for the version model template applied to an Item.
- `optionKey`: stable identifier for an Option (admin-defined data; e.g., `type`, `size`, `color`, `language`).
- `optionValueKey`: stable identifier for an Option Value within an Option (admin-defined data; e.g., `graded`, `m`, `red`, `en`).
- `VersionPath`: the ordered list of selected (`optionKey`, `optionValueKey`) pairs (type name).
- `versionPath`: the ordered list of selected (`optionKey`, `optionValueKey`) pairs (field/property name).
- `skuId`: stable identifier for `Item + VersionPath`.

In MVP, VersionPath supports **staged selection** (multi-step paths): selecting an early option (e.g., “Type”) enables the next required option(s).

Important: names like “Type”, “Graded”, “Condition”, “Size”, and “Color” are not special-cased in code. They are authored in the version-system admin UI as VersionModel data (options, option values, constraints, facet rules). The contract here is the normalization + identity algorithm and the stability rules.

---

## Hard rules (MVP)

### R1) Keys are stable; labels can change

- `optionKey` and `optionValueKey` MUST be stable over time.
- Human labels (`label`) may change without changing meaning.
- Renaming a key is treated as a breaking change requiring an explicit migration plan.

### R2) A SKU is defined by keys, not labels

A SKU is defined by:

- `itemId`
- normalized `VersionPath` consisting of stable keys

### R3) VersionPath is normalized server-side

The API MUST accept a VersionPath in a user-friendly form, validate it against the Version Model, and then **normalize** it to a canonical ordering.

The API returns the normalized path and uses it for `skuId` derivation.

### R4) Facets are stable contracts

Flattened facets emitted by resolution MUST use stable facet keys, suitable for:

- search filtering
- market segmentation (per-SKU order book)
- inventory balances

---

## Canonical Version Model shape (doc-only schema)

This is the minimum shape we need to define in docs to unblock API/Web work.

### VersionModel

- `versionModelKey: string` (stable)
- `version: number` (monotonic, informational; not used for SKU identity)
- `rootOptions: OptionKey[]` (entry points)
- `options: Record<OptionKey, Option>`
- `constraints: VersionConstraint[]` (optional)
- `facetRules: FacetRule[]` (how to materialize flattened facets)

### Option

- `optionKey: string` (stable)
- `label: string`
- `sortOrder?: number` (presentation-only; does not affect SKU identity)
- `required: boolean`
- `selection: "single" | "multi"`
- `values: OptionValue[]`
- `visibilityRules?: VisibilityRule[]` (optional)

### OptionValue

- `optionValueKey: string` (stable)
- `label: string`
- `sortOrder?: number` (presentation-only; does not affect SKU identity)
- `childOptions?: OptionKey[]` (optional)
- `facetOverrides?: Record<string, string | number | boolean>` (optional)

Notes:

- The model supports conditional trees/DAGs by attaching `childOptions` to option values.
- Visibility rules can be implemented later; for MVP, we can keep it simple but the keys must exist.

---

## VersionPath normalization (canonical algorithm)

### Inputs

- `itemId`
- proposed `versionPath[]`: list of `{ optionKey, optionValueKey }`
- the Version Model associated with the Item

### Output

- `normalizedVersionPath[]` in canonical order

### Canonical ordering rule

1. Start at `rootOptions` in the order defined by the Version Model.
2. For each option in traversal order:
   - ensure a valid selection exists if `required=true`
   - validate the selected `optionValueKey` exists for that option
   - append `{optionKey, optionValueKey}` to the normalized output
   - enqueue that option value's `childOptions` (in the order defined by the model) and continue

3. Options not reachable from the selected path MUST be ignored (or rejected if provided).

### Staged (multi-step) paths

This algorithm intentionally models flows like:

- `Type: Graded → Company: PSA → Grade: 10 GEM MT`
- `Type: Conditioned → Condition: Near Mint`
- `Type: Sealed`

Important identity rule:

- The SKU is defined by the **leaf outcome** (e.g., “Sealed” or “Graded+PSA+10”) and therefore includes **all selected options along the enabled path**.
- Intermediate selections are not “temporary”; they are part of the canonical VersionPath keys that define SKU identity.

### Validation rules

- Missing required options → error
- Unknown `optionKey`/`optionValueKey` → error
- Invalid combination (constraint violation) → error
- Multi-select options (if used) must normalize to a stable ordering rule:
  - MVP rule: sort selected `optionValueKey`s lexicographically for that option

---

## `skuId` derivation (deterministic)

### Goal

Given the same `itemId` and the same normalized VersionPath keys, the system MUST derive the same `skuId` forever.

### Canonical `skuIdentityString`

Define:

- `skuIdentityString = itemId + ":" + join(
  normalizedVersionPath.map(p => p.optionKey + "=" + p.optionValueKey),
  ";"
)`

Example:

- `cat_01...:type=graded;company=psa;grade=10`

Additional examples (illustrative; exact keys come from the Catalog version config):

- Sealed:
  - `cat_01...:type=sealed`
- Conditioned (raw single):
  - `cat_01...:type=conditioned;condition=nm`
- Apparel (multi-option):
  - `cat_01...:size=m;color=red`

### Canonical `skuId`

- `skuId = "sku_" + base32(sha256(skuIdentityString))` (prefix is illustrative)

Constraints:

- The encoding must be URL-safe and case-stable.
- `skuId` MUST be treated as an opaque identifier externally.

### Consequences

- Reordering labels or adding optional options does not change existing SKU IDs.
- Changing keys changes SKU identity and requires a deliberate migration.

---

## Flattened facets materialization

Resolution returns `flattenedFacets` derived from the VersionPath.

Facet keys are defined by the VersionModel’s `facetRules` (config/data).

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

- validate + normalize VersionPath
- return `skuId`, `normalizedVersionPath`, and `flattenedFacets`
- return explicit error codes (below)

### Error codes (MVP)

- `INVALID_DIMENSION`
- `INVALID_OPTION`
- `MISSING_REQUIRED_DIMENSION`
- `INVALID_COMBINATION`
- `UNREACHABLE_DIMENSION`

---

## Open questions (to answer before implementation)

- Are there any SKU identity exceptions for Pokémon-specific quirks (e.g., promos, reprints), or is Item identity sufficient?
- Do we need facet materialization to support conditional/computed facets beyond direct option→facet mapping (MVP default: direct mapping; see [02-mvp-version-keys-and-facets.md](02-mvp-version-keys-and-facets.md))?
- Do we ever want SKU equivalence classes (not in MVP)?
