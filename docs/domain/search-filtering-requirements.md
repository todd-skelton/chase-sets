# 3.x Search & Filtering (Requirements)

## Purpose

Define search and filtering requirements for Chase Sets.

Key constraint: **filters are admin-defined and config-driven**.

MVP requirement: **vector + semantic search** (in addition to strong lexical/exact matching). See `docs/adrs/016-embedding-strategy.md`.

See also:

- `docs/domain/search-relevance-evaluation-and-golden-queries.md`
- `docs/adrs/016-embedding-strategy.md`

- Adding/reordering/removing filters should not require a code change.
- The system provides a generic filtering mechanism driven by configuration.

---

## Search surfaces

1. **Catalog search** (primary): users search by name, set, card number.
2. **Discovery/browse**: browse sets, categories, and high-level forms (admin-configured; examples: Conditioned/Sealed/Graded).
3. **Market views (per Version)**: view all listings + offers for a Version; sorting by price/time.

---

## Filtering model

### Inputs

- VersionPath-derived facets (admin-configured; examples: `type`, `company`, `grade`, `language`, `finish`, `condition`, `size`, `color`).
- Item fields (set, number, rarity, etc.).

Catalog owns the stable facet keys and Version identity contract:

- `docs/domain/catalog-version-identity-and-resolution.md`
- `docs/domain/catalog-mvp-version-keys-and-facets.md`

### Admin-defined filter configuration (must be configurable)

The admin defines:

- Which fields are filterable
- Label, grouping, ordering
- Allowed operators per field (equals, in, range)
- Visibility rules (e.g., only show `grade` filters for graded forms)
- Defaults (pre-selected filters, default sort)

### Non-goals

- No per-filter feature code.
- No hardcoded PokÃ©mon-specific filters.

---

## Relevance & ranking requirements (MVP)

- Strong exact-match behavior for:
  - set + card number
  - exact name matches
- Tolerate common typos.
- Deterministic sorting for order books (price-time).
  - Note: UI may call this â€œmarketâ€ or â€œall listings & offersâ€; internal model is still an order book projection.

Semantic requirements (day one):

- Support â€œnatural languageâ€ queries (e.g., â€œshiny charizardâ€, â€œpikachu promoâ€, â€œfirst edition blastoiseâ€) with relevant results.
- Use hybrid retrieval/ranking (lexical + vector) so exact identifiers still win when present.

---

## Search engine decision

ADR 012 is **Accepted**: OpenSearch (for hybrid lexical + vector search).

---


## Implementation Checklist
- Search implementation must define index mappings for text, keyword, and facet fields.
- Search filtering must define minimum day-one filter set and parameter schema.
- Ranking policy should define hybrid scoring guardrails for exact-match queries.
- Search ingestion should define replay-safe projection-to-index flow.

