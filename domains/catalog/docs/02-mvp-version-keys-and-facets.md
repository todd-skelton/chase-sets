# Catalog — MVP Version Modeling Conventions, Keys, and Facets

## Purpose

Describe the **MVP conventions** for how Catalog authors Options/Option Values and how resolution materializes flattened facets.

Important: option names like “Type”, “Graded”, “Condition”, “Size”, and “Color” are **admin-authored data** in the version system. The engine must be category-agnostic.

This doc exists so Search/Marketplace/Inventory can safely depend on:

- key stability rules
- deterministic facet materialization
- a small set of canonical example VersionModels

This is requirements/spec only (no implementation).

---

## Canonical references

- Version identity + VersionPath normalization: [01-version-identity-and-resolution.md](01-version-identity-and-resolution.md)
- Glossary definitions: [../../../docs/domain/glossary.md](../../../docs/domain/glossary.md)
- Version system principles: [15-version-system.md](15-version-system.md)

---

## Terminology alignment

This doc follows the Catalog terminology for concepts while keeping version-system schema names:

- **Item** = the curated catalog entity.
- **Option** = selectable characteristic (represented by `optionKey`).
- **Option Value** = selectable value (represented by `optionValueKey`).
- **Version** = resolved selection of Option Values (represented by `VersionPath`).
- **Version ID** = stable identifier for an Item + Version (`versionId`).

---

## Design goals (MVP)

- **Config-driven**: options/option values/constraints/facet rules are data authored in admin.
- **Stable identity**: `optionKey`, `optionValueKey`, and facet keys remain stable once published.
- **Category-agnostic**: no Pokémon-only hardcoding in the engine; category specifics live in config.
- **Supports both**: staged (wizard-like) paths _and_ multi-option matrices (e.g., Size × Color).
- **Sortable choices**: options/option values must support admin-authored ordering for UI/filter display (presentation-only; see [15-version-system.md](15-version-system.md)).

---

## Identity posture (important)

In MVP, we treat these as **Item identity**, not Version/Version distinctions (unless explicitly modeled later):

- Set membership and set names
- Card number
- Reprints/promos that have different official identifiers
- “Printing” differences that materially change identity (e.g., shadowless vs unlimited) unless we intentionally choose to model them as an option

Rationale:

- Keeps Versions focused on buyer/seller-selectable attributes at listing/offer time.
- Prevents Version explosion and confusing selector UX.

If we later decide “printing/edition” is an option, it must be added explicitly with a migration plan.

---

## Version system capabilities to lock (MVP questions)

These questions are about **what the version system can express**, not whether specific option values (like language/finish) exist.

### Q1) Constraint expressiveness

What constraint types must the system support in MVP?

- Required options (already assumed)
- Conditional options (option appears only after selecting an option value)
- Forbidden combinations (e.g., `type=sealed` forbids `condition`)
- Option value restrictions per Item (same option key, different allowed values)
- Cross-option constraints (e.g., a specific grader only allows certain grades)

### Q2) Authoring model and reuse

Do we require the system to support reusable “modules” (subtrees) and overrides in MVP?

- Reuse modules like `GradedCard` across many Items
- Per-item overrides (disable option values, reorder option values, label override)

### Q3) Versioning semantics (immutability boundary)

When a Version Model changes, what must remain true?

- Existing Versions remain referentially valid forever
- New options create new Versions without changing old `versionId`s
- Breaking key changes require an explicit migration plan (never silent)

### Q4) Validation + error reporting

What is the minimum validation and error surface?

- Deterministic normalization (server-side)
- Machine-readable error codes (see [01-version-identity-and-resolution.md](01-version-identity-and-resolution.md))
- “Explainability” payloads (which option is missing/invalid) to support good UX

### Q5) Facet materialization rules

What facet behaviors must be supported?

- Direct mapping from selected option values → facet key/value
- Conditional facets (only present for certain paths)
- Ability to add a new facet/filter via config without code changes

### Q6) Extensibility guarantees

What changes must be safe (no code changes) in MVP?

- Add a new option value to an existing option
- Add a new optional option under an existing option value
- Restrict allowed options for a specific Item

---

## Key stability rules (contract)

1. `optionKey`, `optionValueKey`, and facet keys are authored in admin and MUST be treated as **stable identifiers**.
2. Human-facing labels (e.g., “10 GEM MT”) are display-only and may change.
3. Changing a key is a breaking change and requires an explicit migration plan.

See: [01-version-identity-and-resolution.md](01-version-identity-and-resolution.md)

---

## Facet conventions (MVP)

Flattened facets are produced during `versionId` resolution and are used for:

- Search filtering
- Market view grouping (per Version)
- Inventory balances (per Version)

Rules:

- Facet keys are defined by VersionModel `facetRules` (data).
- Facet values should be stable identifiers (prefer option value keys; avoid mutable labels).

---

## Canonical example VersionModels (MVP)

These are canonical examples for MVP implementation and UI/UX discussion. They are **not reserved keywords**.

More complete examples (JSON-ish): [03-version-model-examples.md](03-version-model-examples.md)

### Example A — Trading card: staged “Type → …”

Intent: a staged selector where choosing a “Type” enables the next option(s).

Example VersionPath (graded):

- `type=graded`
- `company=psa`
- `grade=10`

Example VersionPath (conditioned/raw):

- `type=conditioned`
- `condition=nm`

Example VersionPath (sealed):

- `type=sealed`

Notes:

- The specific option keys/values are admin-configured and can differ per category.
- The Version identity includes all selected steps along the enabled path.

### Example B — Apparel: multi-option matrix (Size × Color)

Intent: options are independent and both required; order is canonical (`rootOptions` defines it).

Example VersionPath:

- `size=m`
- `color=red`

Notes:

- This is the main “multiple options” shape (as opposed to staged branching).

---

## Notes on adding new values

Adding new options (new colors, new sizes, new grading companies, new grade values, etc.) should be treated as **data/config expansion**.

The only changes that require extra ceremony are changes to stable keys (`optionKey`, `optionValueKey`, and facet keys), because those affect Version identity and long-term referential integrity.

