# Slice 1 — Catalog Discovery (Search → Item Detail → SKU Resolve)

## Purpose

Define the **implementation-ready** scope for the first breadth-first MVP slice:

- Search catalog items
- Open item detail
- Select a valid VariantPath
- Resolve a deterministic, stable `skuId`

This slice is the foundation for all later marketplace flows (listing, offers, checkout) because everything references `skuId`.

Canonical story references:

- Story 1.1–1.3 in [20-mvp-problem-statements-and-user-stories.md](20-mvp-problem-statements-and-user-stories.md)
- Workflow #1 in [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)
- Definitions for SKU/VariantPath/etc. in [02-domain-model-and-glossary.md](02-domain-model-and-glossary.md)

---

## Outcome (what “done” means)

A user can complete, in local dev:

1. Enter a query (identifier or natural language)
2. See search results with config-driven filters
3. Open a catalog item detail page
4. Select variant attributes through a guided selector
5. Resolve a `skuId` deterministically

---

## Non-goals (Slice 1)

- No listing, offers, matching, checkout, payments, shipping.
- No admin UI (we can seed catalog data or use a minimal operator path later).
- No perfection on relevance; we need “good enough” with a measurable golden query set.

---

## Component owners (where work lands)

- Domains:
  - Catalog: variant model, SKU identity rules
  - Search: query parsing, ranking rules, golden query evaluation
- Apps:
  - `apps/api`: search, item detail, sku resolve HTTP endpoints
  - `apps/web`: search page, item detail page, variant selector UX
  - `apps/workers`: projection → search indexing pipeline (replay-safe)
- Packages:
  - `packages/config`: filter configuration schema + validation
  - `packages/shared`: IDs/envelope primitives (when code starts)

---

## Dependency-minimizing build approach

Search is a read-side domain that depends on **Catalog defining stable facet keys and SKU identity**.

To keep Slice 1 breadth-first without getting blocked by other domains, build it in this order:

1. **Catalog first (no external dependencies):** lock VariantPath normalization, `skuId` derivation, and facet materialization keys.
2. **Search second (depends on Catalog keys only):** index mapping/analyzers/query parsing/golden queries.
3. **API/Web third:** wire endpoints and UX against the locked contracts.

Catalog contract reference:

- [../domains/catalog/docs/01-sku-identity-and-resolution.md](../domains/catalog/docs/01-sku-identity-and-resolution.md)
- [../domains/catalog/docs/02-mvp-variant-keys-and-facets.md](../domains/catalog/docs/02-mvp-variant-keys-and-facets.md)

---

## Epic breakdown

### EP-DISC-01 — Search and result quality

**Stories:** 1.1, 1.2

**Acceptance check**

- Identifier query (e.g., set + number) returns the correct item in top-k.
- Natural language query returns relevant results while preserving exact-match guardrails.
- Filters are config-driven (adding/reordering filters is a config change, not a feature code change).

**Dependencies**

- OpenSearch posture (ADR 012): [adrs/012-search-engine-mvp.md](adrs/012-search-engine-mvp.md)
- Embeddings evidence plan (ADR 016): [adrs/016-embedding-strategy.md](adrs/016-embedding-strategy.md)
- Search requirements and top queries: [../domains/search/docs/19-search-and-filtering-requirements.md](../domains/search/docs/19-search-and-filtering-requirements.md)

**Tasks (by area)**

- Domain (Search)
  - [ ] T-SEARCH-001 Define MVP index mappings + analyzers
  - [ ] T-SEARCH-002 Define identifier query parsing rules
  - [ ] T-SEARCH-003 Define hybrid scoring behavior and exact-match guardrails
  - [ ] T-SEARCH-005 Define golden query set + acceptance thresholds
- Package (Config)
  - [ ] T-SEARCH-004 Define the config-driven facet/filter schema
- App (API)
  - [ ] T-API-001 Draft `GET /search` contract (pagination, filters, response shape)
  - [ ] T-API-002 Define filter encoding for the API (how the web app sends filters)
- App (Workers)
  - [ ] T-WORK-001 Define projection → indexer flow and replay-safe indexing posture

---

### EP-DISC-02 — Item detail + variant selector + SKU resolve

**Stories:** 1.3

**Acceptance check**

- Item detail returns a Variant Model suitable for rendering the selector.
- VariantPath normalization is deterministic (stable ordering/casing rules).
- `skuId` resolution is deterministic across time and environments given the same CatalogItem + VariantPath.

**Dependencies**

- Variant system principles: [../domains/catalog/docs/15-variant-system.md](../domains/catalog/docs/15-variant-system.md)
- Glossary definitions for SKU/VariantPath: [02-domain-model-and-glossary.md](02-domain-model-and-glossary.md)

**Tasks (by area)**

- Domain (Catalog)
  - [ ] T-CAT-001 Confirm canonical variant schema + validation rules
  - [ ] T-CAT-002 Define `VariantPath` normalization rules
  - [ ] T-CAT-003 Define deterministic SKU identity + resolution rules
- App (API)
  - [ ] T-API-003 Draft `GET /catalog/items/{catalogItemId}` contract
  - [ ] T-API-004 Draft `POST /skus/resolve` contract (request/response + error cases)
- App (Web)
  - [ ] T-WEB-001 Define variant selector UX requirements and failure states
  - [ ] T-WEB-002 Define search results UX requirements (filters, sorting, empty states)
  - [ ] T-WEB-003 Define item detail UX requirements (images, set/number, variant selector placement)
- App (Workers)
  - [ ] T-WORK-002 Define catalog public-view projection shape (for item detail)

---

## Draft API contracts (doc-first)

These are intentionally minimal and will evolve. The goal is to lock the **shape** early enough to build the web app against it.

### `GET /search`

**Query params (draft)**

- `q`: string (required)
- `page`: number (default 1)
- `pageSize`: number (server-enforced max)
- `filters`: encoded map of filter keys → selected values/ranges

**Response (draft)**

- `results[]`: catalog items
  - `catalogItemId`
  - `displayName`
  - `setName`
  - `cardNumber` (nullable for sealed)
  - `primaryForm` (admin-configured high-level form, derived from facets; examples: Conditioned/Sealed/Graded)
  - `primaryImageUrl` (optional)
- `facets`: counts per filter value (as configured)
- `page`, `pageSize`, `total`

### `GET /catalog/items/{id}`

Returns:

- Catalog item fields (display name, set, number, images)
- The Variant Model (or reference + resolved view) needed for a guided selector

### `POST /skus/resolve`

**Request (draft)**

- `catalogItemId`
- `variantPath`: ordered selections (`dimensionKey` + `optionKey`)

**Response (draft)**

- `skuId`
- `normalizedVariantPath`
- `flattenedFacets` (for downstream filtering/indexing)

**Error cases (must be explicit)**

- invalid dimension/option
- missing required dimensions
- invalid combination (constraint violation)

---

## Open questions to answer (to make this slice “Ready”)

- Confirm the first MVP top queries list is correct (or replace it): [../domains/search/docs/19-search-and-filtering-requirements.md](../domains/search/docs/19-search-and-filtering-requirements.md)
- Define the minimum Day-1 filter set (which facets must exist in UI)
- Decide whether synonyms are required in MVP, and if so where they live (config vs index)
