# Variant System (Config-Driven)

## Objective

Design and implement a robust, fully configuration-driven variant system that supports:

- Deep, conditional variant hierarchies (tree/DAG)
- Mutually exclusive paths (XOR) and combinable paths (OR)
- Domain-specific rules (e.g., grading scales)
- Multiple product types (TCG singles, sealed, graded, apparel, etc.)
- Search, pricing, and inventory use cases

Core requirement: avoid hardcoded assumptions; remain extensible across categories.

---

## Core principles

1. **Config over code**: all behavior defined in data.
2. **Variant graph, not flat attributes**: selection is a path through a tree/DAG.
3. **Single source of truth**: a resolved variant path defines a sellable SKU.
4. **Composable & reusable**: templates/modules reused across products.
5. **Searchable & indexable**: selections flatten into facets.

---

## Use cases (MVP)

The variant system must support these end-to-end uses without hardcoding domain-specific values:

1. **Admin authors a VariantModel**
   - Define `rootDimensions`, dimensions, options, constraints, and facet rules as data.
   - Reuse modules/subtrees across many CatalogItems.
   - Apply per-item overrides (enable/disable options, rename labels, reorder/sort options).
2. **Web/API renders a guided selector**
   - Given a CatalogItem + VariantModel, render a staged wizard and prevent invalid combinations.
   - Provide clear UX error states (missing required dimension, invalid selection).
3. **API validates and normalizes a VariantPath**
   - Accept user-provided selections.
   - Validate against the VariantModel.
   - Normalize to canonical traversal order (identity-safe) per [01-sku-identity-and-resolution.md](01-sku-identity-and-resolution.md).
4. **Deterministic `skuId` resolution**
   - Resolve a stable `skuId` from `catalogItemId + normalizedVariantPath`.
   - Return the normalized path + `flattenedFacets` for downstream domains.
5. **Search filtering and grouping**
   - Materialize `flattenedFacets` (stable keys/values) that Search can index and expose as config-driven filters.
6. **Marketplace/Inventory compatibility**
   - Marketplace groups bids/listings by `skuId`.
   - Inventory tracks balances by `skuId`.

---

## Sorting & presentation (required)

Variant choices MUST be sortable for UI and filter presentation.

Examples:

- "Pristine 10" should sort before "Gem Mint 10", and both should sort before "9".
- Apparel sizes should sort in a human order (S, M, L, XL) rather than lexical.

### Contract

- Sorting is **presentation-only** and MUST NOT affect SKU identity. Identity is based on stable keys (`dimensionKey`/`optionKey`).
- The model must allow admin-authored ordering for both:
  - dimensions (within the staged traversal)
  - options (within a dimension)

Recommended fields (doc-only contract; optional for MVP but strongly suggested):

- `VariantDimension.sortOrder?: number`
- `VariantOption.sortOrder?: number`

Rules:

- Lower `sortOrder` sorts first.
- If `sortOrder` is missing, the fallback order is the authored array order (`options[]`) and then `optionKey` (deterministic tie-break).
- Overrides MUST be able to modify `sortOrder` without changing keys.

---

## Conceptual model

### Product / CatalogItem

The canonical item users search for (e.g., “Charizard ex #223”).

- Owns identity and category.
- References a Variant Model.

### Variant Model (template)

Defines the allowed structure for variant selection.

- Root dimensions (entry points)
- Valid paths and constraints
- Reusable across many CatalogItems

### Variant Dimension

A decision point in the selection flow.

- Selection type: single vs multi
- Required vs optional
- Visibility rules
- Child dimensions
- Constraints

### Variant Option

A selectable value within a dimension.

- label/value
- metadata (e.g., numeric grade)
- child dimensions

### Variant Path (resolved selection)

Ordered list of dimension-option selections.

Example (graded card):

- type=graded
- company=PSA
- grade=10

---

## SKU model

A **sellable SKU** is defined as:

- `SKU = CatalogItem + VariantPath`

Suggested fields:

- `catalogItemId`
- `variantModelVersionId`
- `variantPath` (ordered dimension-option IDs)
- `flattenedFacets` (key-value pairs)

---

## Search & faceting

Flatten the variant path into indexable facets:

- `type = graded`
- `company = PSA`
- `grade = 10`

Enables:

- filtering (e.g., “PSA 10”)
- aggregations (counts by grade)
- analytics

Admin-defined filtering requirement:

- Which facets are exposed as filters, their labels/order/grouping, and allowed operators must be **config-driven and admin-defined**.
- Adding a new filter should not require a code change (beyond generic support for the config schema).

---

## Admin authoring model

Admins compose a Variant Model from reusable building blocks:

### Modules (reusable subtrees)

Examples:

- ConditionedCard (condition scale)
- GradedCard (grader → grade scale)
- SealedCard (no additional dims)
- ApparelSizing (S/M/L/XL)
- ApparelColor

### Choice Groups

Define XOR/OR branching.
Example (Trading Card): Selling Format (XOR)

- Conditioned
- Graded
- Sealed

### Overrides

Allow template/product-level overrides without modifying global modules.

- enable/disable options
- reorder options
- label overrides
- restrict graders

---

## Seller variant selection UX

- Step-by-step wizard
- Choice Groups first (when present)
- Progressive disclosure of dimensions
- Prevent invalid combinations by construction
- Validate required dimensions before listing/bidding

---

## Open questions

1. Event sourcing: which VariantModel changes are captured as events (publish, deprecate, supersede) and what is the immutable version boundary?
2. Projections: which read models do we need first (JSON for UI, relational for analytics, search facets, caches)?
3. SKU identifier strategy: store full `variantPath` and/or derived hash.
4. Validation engine boundaries: where rules live (API vs shared library).
5. How to detect unreachable dimensions and conflicting overrides.
