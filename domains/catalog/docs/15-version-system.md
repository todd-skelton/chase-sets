# Version System (Config-Driven)

## Objective

Design and implement a robust, fully configuration-driven version system that supports:

- Deep, conditional option hierarchies (tree/DAG)
- Mutually exclusive paths (XOR) and combinable paths (OR)
- Domain-specific rules (e.g., grading scales)
- Multiple Item types (TCG singles, sealed, graded, apparel, etc.)
- Search, pricing, and inventory use cases

Core requirement: avoid hardcoded assumptions; remain extensible across categories.

---

## Terminology alignment

This document uses the version-system framing to describe how the Catalog defines **Versions**. Per [Catalog terminology](terminology-and-definitions.md):

- **Item** = the canonical catalog entity.
- **Option** = the selectable characteristic that defines a Version (represented by `optionKey`).
- **Option Value** = the selectable value within an Option (represented by `optionValueKey`).
- **Version** = the resolved selection of Option Values (represented by `versionPath`).
- **Version ID** = the stable identifier for an Item + Version (`versionId`).

The schema names (`VersionModel`, `Option`, `OptionValue`) reflect the config/data shapes, and the business terminology above should be used in prose and downstream docs.

---

## Core principles

1. **Config over code**: all behavior defined in data.
2. **Selection graph, not flat attributes**: selection is a path through a tree/DAG.
3. **Single source of truth**: a resolved Version Path defines a sellable Version/Version ID.
4. **Composable & reusable**: templates/modules reused across Items.
5. **Searchable & indexable**: selections flatten into facets.

---

## Use cases (MVP)

The version system must support these end-to-end uses without hardcoding domain-specific values:

1. **Admin authors a VersionModel**
   - Define `rootOptions`, options, option values, constraints, and facet rules as data.
   - Reuse modules/subtrees across many Items.
   - Apply per-item overrides (enable/disable option values, rename labels, reorder/sort option values).
2. **Web/API renders a guided selector**
   - Given an Item + VersionModel, render a staged wizard and prevent invalid combinations.
   - Provide clear UX error states (missing required option, invalid selection).
3. **API validates and normalizes a Version Path**
   - Accept user-provided selections.
   - Validate against the VersionModel.
   - Normalize to canonical traversal order (identity-safe) per [01-version-identity-and-resolution.md](01-version-identity-and-resolution.md).
4. **Deterministic `versionId` resolution**
   - Resolve a stable `versionId` from `itemId + normalizedVersionPath`.
   - Return the normalized path + `flattenedFacets` for downstream domains.
5. **Search filtering and grouping**
   - Materialize `flattenedFacets` (stable keys/values) that Search can index and expose as config-driven filters.
6. **Marketplace/Inventory compatibility**
   - Marketplace groups bids/listings by `versionId`.
   - Inventory tracks balances by `versionId`.

---

## Sorting & presentation (required)

Option Values MUST be sortable for UI and filter presentation.

Examples:

- "Pristine 10" should sort before "Gem Mint 10", and both should sort before "9".
- Apparel sizes should sort in a human order (S, M, L, XL) rather than lexical.

### Contract

- Sorting is **presentation-only** and MUST NOT affect Version identity. Identity is based on stable keys (`optionKey`/`optionValueKey`).
- The model must allow admin-authored ordering for both:
  - options (within the staged traversal)
  - option values (within an option)

Recommended fields (doc-only contract; optional for MVP but strongly suggested):

- `Option.sortOrder?: number`
- `OptionValue.sortOrder?: number`

Rules:

- Lower `sortOrder` sorts first.
- If `sortOrder` is missing, the fallback order is the authored array order (`values[]`) and then `optionValueKey` (deterministic tie-break).
- Overrides MUST be able to modify `sortOrder` without changing keys.

---

## Conceptual model

### Item

The canonical item users search for (e.g., “Charizard ex #223”).

- Owns identity and category.
- References a Version Model.

### Version Model (template)

Defines the allowed structure for Version selection.

- Root options (entry points)
- Valid paths and constraints
- Reusable across many Items

### Option

A decision point in the selection flow.

- Selection type: single vs multi
- Required vs optional
- Visibility rules
- Child options
- Constraints

### Option Value

A selectable value within an option.

- label/value
- metadata (e.g., numeric grade)
- child options

### Version Path (Version selection)

Ordered list of option-optionValue selections.

Example (graded card):

- type=graded
- company=PSA
- grade=10

---

## Version model (Item + Version)

A **sellable Version** is defined as:

- `Version = Item + VersionPath`

Suggested fields:

- `itemId`
- `versionModelVersionId`
- `versionPath` (ordered option-optionValue IDs)
- `flattenedFacets` (key-value pairs)

---

## Search & faceting

Flatten the Version Path into indexable facets:

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

Admins compose a Version Model from reusable building blocks:

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

Allow template/Item-level overrides without modifying global modules.

- enable/disable option values
- reorder option values
- label overrides
- restrict graders

---

## Seller version selection UX

- Step-by-step wizard
- Choice Groups first (when present)
- Progressive disclosure of options
- Prevent invalid combinations by construction
- Validate required options before listing/bidding

---

## Open questions

1. Event sourcing: which VersionModel changes are captured as events (publish, deprecate, supersede) and what is the immutable version boundary?
2. Projections: which read models do we need first (JSON for UI, relational for analytics, search facets, caches)?
3. Version identifier strategy: store full `versionPath` and/or derived hash.
4. Validation engine boundaries: where rules live (API vs shared library).
5. How to detect unreachable options and conflicting overrides.
