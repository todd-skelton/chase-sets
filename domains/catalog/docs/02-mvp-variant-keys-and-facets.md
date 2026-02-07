# Catalog — MVP Variant Modeling Conventions, Keys, and Facets

## Purpose

Describe the **MVP conventions** for how Catalog authors variant dimensions/options and how resolution materializes flattened facets.

Important: dimension names like “Type”, “Graded”, “Condition”, “Size”, and “Color” are **admin-authored data** in the variant system. The engine must be category-agnostic.

This doc exists so Search/Marketplace/Inventory can safely depend on:

- key stability rules
- deterministic facet materialization
- a small set of canonical example VariantModels

This is requirements/spec only (no implementation).

---

## Canonical references

- SKU identity + VariantPath normalization: [01-sku-identity-and-resolution.md](01-sku-identity-and-resolution.md)
- Glossary definitions: [../../../artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md)
- Variant system principles: [15-variant-system.md](15-variant-system.md)

---

## Design goals (MVP)

- **Config-driven**: dimensions/options/constraints/facet rules are data authored in admin.
- **Stable identity**: `dimensionKey`, `optionKey`, and facet keys remain stable once published.
- **Category-agnostic**: no Pokémon-only hardcoding in the engine; category specifics live in config.
- **Supports both**: staged (wizard-like) paths _and_ multi-dimension matrices (e.g., Size × Color).
- **Sortable choices**: dimensions/options must support admin-authored ordering for UI/filter display (presentation-only; see [15-variant-system.md](15-variant-system.md)).

---

## Identity posture (important)

In MVP, we treat these as **CatalogItem identity**, not SKU variants (unless explicitly modeled later):

- Set membership and set names
- Card number
- Reprints/promos that have different official identifiers
- “Printing” variants that materially change identity (e.g., shadowless vs unlimited) unless we intentionally choose to model them as a variant dimension

Rationale:

- Keeps SKU variants focused on buyer/seller-selectable attributes at listing/offer time.
- Prevents SKU explosion and confusing selector UX.

If we later decide “printing/edition” is a variant dimension, it must be added explicitly with a migration plan.

---

## Variant system capabilities to lock (MVP questions)

These questions are about **what the variant system can express**, not whether specific option values (like language/finish) exist.

### Q1) Constraint expressiveness

What constraint types must the system support in MVP?

- Required dimensions (already assumed)
- Conditional dimensions (dimension appears only after selecting an option)
- Forbidden combinations (e.g., `type=sealed` forbids `condition`)
- Option restrictions per CatalogItem (same dimension key, different allowed options)
- Cross-dimension constraints (e.g., a specific grader only allows certain grades)

### Q2) Authoring model and reuse

Do we require the system to support reusable “modules” (subtrees) and overrides in MVP?

- Reuse modules like `GradedCard` across many CatalogItems
- Per-item overrides (disable option, reorder options, label override)

### Q3) Versioning semantics (immutability boundary)

When a Variant Model changes, what must remain true?

- Existing SKUs remain referentially valid forever
- New options create new SKUs without changing old `skuId`s
- Breaking key changes require an explicit migration plan (never silent)

### Q4) Validation + error reporting

What is the minimum validation and error surface?

- Deterministic normalization (server-side)
- Machine-readable error codes (see [01-sku-identity-and-resolution.md](01-sku-identity-and-resolution.md))
- “Explainability” payloads (which dimension is missing/invalid) to support good UX

### Q5) Facet materialization rules

What facet behaviors must be supported?

- Direct mapping from selected options → facet key/value
- Conditional facets (only present for certain paths)
- Ability to add a new facet/filter via config without code changes

### Q6) Extensibility guarantees

What changes must be safe (no code changes) in MVP?

- Add a new option to an existing dimension
- Add a new optional dimension under an existing option
- Restrict allowed options for a specific CatalogItem

---

## Key stability rules (contract)

1. `dimensionKey`, `optionKey`, and facet keys are authored in admin and MUST be treated as **stable identifiers**.
2. Human-facing labels (e.g., “10 GEM MT”) are display-only and may change.
3. Changing a key is a breaking change and requires an explicit migration plan.

See: [01-sku-identity-and-resolution.md](01-sku-identity-and-resolution.md)

---

## Facet conventions (MVP)

Flattened facets are produced during `skuId` resolution and are used for:

- Search filtering
- Market view grouping (per SKU)
- Inventory balances (per SKU)

Rules:

- Facet keys are defined by VariantModel `facetRules` (data).
- Facet values should be stable identifiers (prefer option keys; avoid mutable labels).

---

## Canonical example VariantModels (MVP)

These are canonical examples for MVP implementation and UI/UX discussion. They are **not reserved keywords**.

More complete examples (JSON-ish): [03-variant-model-examples.md](03-variant-model-examples.md)

### Example A — Trading card: staged “Type → …”

Intent: a staged selector where choosing a “Type” enables the next dimension(s).

Example VariantPath (graded):

- `type=graded`
- `company=psa`
- `grade=10`

Example VariantPath (conditioned/raw):

- `type=conditioned`
- `condition=nm`

Example VariantPath (sealed):

- `type=sealed`

Notes:

- The specific dimension keys/options are admin-configured and can differ per category.
- The SKU identity includes all selected steps along the enabled path.

### Example B — Apparel: multi-dimension matrix (Size × Color)

Intent: dimensions are independent and both required; order is canonical (`rootDimensions` defines it).

Example VariantPath:

- `size=m`
- `color=red`

Notes:

- This is the main “multiple dimensions” shape (as opposed to staged branching).

---

## Notes on adding new values

Adding new options (new colors, new sizes, new grading companies, new grade values, etc.) should be treated as **data/config expansion**.

The only changes that require extra ceremony are changes to stable keys (`dimensionKey`, `optionKey`, and facet keys), because those affect SKU identity and long-term referential integrity.
