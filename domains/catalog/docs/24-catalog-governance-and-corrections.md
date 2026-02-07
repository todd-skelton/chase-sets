# 3.x Catalog Governance: Curation, Corrections, and Audit (Requirements)

## Purpose

Define how the curated catalog is managed over time without breaking:

- Event sourcing (if it wasn’t an event, it never happened)
- Stable SKU and order book behavior
- Historical integrity (orders/listings must remain referentially correct)
- Search and filtering (aliases, synonyms, redirects)

This is requirements-only (no implementation).

---

## Goals

- Keep the catalog accurate and trustworthy.
- Enable controlled edits (curation + corrections) with a clear audit trail.
- Support corrections like rename/merge/split without breaking historical orders/listings.
- Provide a safe workflow that can be operated by non-engineers.
- Preserve liquidity and order book continuity when feasible.

## Non-goals (MVP)

- Fully community-edited catalog (wiki model).
- Automated ingestion from external sources (may come later).
- Perfect normalization for every edge case on day one.

---

## Roles and permissions

Catalog operations must be permissioned and auditable.

Minimum roles (names are illustrative):

- **Catalog Viewer**: can view internal catalog metadata.
- **Catalog Editor**: can propose changes, attach evidence, and preview impact.
- **Catalog Approver**: can approve and publish changes.
- **Catalog Admin**: can perform emergency actions (takedown/deprecate) and manage roles.

MVP constraint: even if org RBAC is minimal, internal/admin roles still need separation of duties.

---

## What changes are allowed

### Change types (must be supported)

1. **Create**
   - Add CatalogSet
   - Add CatalogItem
   - Publish VariantModel version (already captured)
2. **Update (non-identity / non-breaking edits)**
   - Display name corrections (typos)
   - Description text
   - Rarity metadata
   - Images/asset links (if any)
3. **Identity/canonical corrections (breaking if done naively)**
   - **Rename** (canonical display name change)
   - **Rekey** (canonical identifiers change: card number correction, set assignment correction)
   - **Merge** (two items are duplicates → one canonical)
   - **Split** (one item incorrectly represented → multiple canonicals)
   - **Deprecate** (item should not be listable going forward)
4. **Alias/synonym management**
   - Add/remove aliases for search (nicknames, alternate spellings)
   - Add redirects/supersede mappings

### Guardrails

- Catalog items and SKUs must not be hard-deleted.
- All identity/canonical corrections must be represented as explicit events.
- The system must be able to explain to an operator: “why does this listing still show under the old item?”

---

## Immutable IDs and historical integrity

### Stable identity requirements

- Catalog entities must have stable, internal IDs that never change.
- Public-facing identifiers (set name, card number) may change, but must not be used as the sole identity.

### Supersede / redirect model

When a correction occurs:

- Old IDs remain valid references for historical objects.
- A **supersede mapping** links old → new canonical.
- Search/browse uses the new canonical by default but can resolve old references.

### Orders, listings, and order books

Requirements:

- Existing Orders must continue to reference the original CatalogItem/SKU they were created with.
- Listings/Bids may:
  - continue referencing their original SKU but be displayed under the canonical replacement, OR
  - be migrated to a new SKU via an explicit migration workflow (policy-driven).

Order book continuity:

- If a correction maps one SKU to another, the system must define whether liquidity merges.
- Default posture (safer): do not automatically merge order books unless explicitly approved.

---

## Catalog change workflow

### Standard workflow (propose → review → publish)

1. **Propose change**
   - Select change type
   - Provide reason code + notes
   - Attach evidence/links
   - Preview impacted entities:
     - affected listings/bids
     - affected SKUs/order books
     - search aliases/queries impacted (best-effort)
2. **Review**
   - Approver reviews diff and impact preview
   - Approver can request changes or reject
3. **Publish**
   - Apply change
   - Update projections/search index
   - Generate an operator-visible “change summary”

### Emergency workflow

For urgent issues (e.g., fraudulent/counterfeit catalog entry, wrong item enabling abuse):

- Allow immediate **deprecate/unlist** action by Catalog Admin.
- Must still produce auditable events and a reversible trail.

---

## Operational tooling requirements

Minimum viable internal tooling:

- Change request queue with status (draft, needs review, approved, published, rejected)
- Diff view (before/after fields)
- Impact preview:
  - counts of listings/bids/orders impacted
  - list of top impacted SKUs/order books
- Ability to add aliases and redirects
- Ability to mark an item as deprecated (cannot create new listings/bids)
- Audit log explorer (by item, by editor, by date range)

---

## Search and filtering implications

Requirements:

- Catalog must support aliases/synonyms so common names map correctly.
- Deprecated/superseded items should:
  - not show as primary results for browsing
  - still resolve if directly referenced (deep link) and display redirect messaging
- Filter facets must remain stable across corrections; if a variant model changes, older orders must remain referentially correct.

---

## Required events (conceptual)

- `CatalogSetCreated` / `CatalogSetUpdated`
- `CatalogItemCreated` / `CatalogItemUpdated`
- `CatalogAliasAdded` / `CatalogAliasRemoved`
- `CatalogChangeRequested` / `CatalogChangeReviewed` / `CatalogChangePublished` / `CatalogChangeRejected`
- `CatalogItemSuperseded` (old → new canonical mapping)
- `CatalogItemsMerged`
- `CatalogItemSplit`
- `CatalogItemDeprecated` / `CatalogItemReactivated`

(Variant events remain separate, e.g. `VariantModelVersionPublished`.)

---

## Open questions

1. Who is allowed to create new CatalogItems at launch (internal only vs trusted sellers)?
2. Do we allow sellers to “report catalog issue” in MVP (and what triage SLA)?
3. When do we merge order books vs keep separate and just redirect search/browse?
4. For a split correction, do we require migrating existing listings/bids, or allow them to remain on the old item until edited?
5. What canonical identifier strategy do you want for Singles (set + number + variant flags) vs Sealed (UPC?)?
