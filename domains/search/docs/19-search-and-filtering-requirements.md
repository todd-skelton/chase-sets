# 3.x Search & Filtering (Requirements)

## Purpose

Define search and filtering requirements for Chase Sets.

Key constraint: **filters are admin-defined and config-driven**.

MVP requirement: **vector + semantic search** (in addition to strong lexical/exact matching). See `artifacts/adrs/016-embedding-strategy.md`.

See also:

- `domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md`
- `artifacts/adrs/016-embedding-strategy.md`

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

- `domains/catalog/docs/01-version-identity-and-resolution.md`
- `domains/catalog/docs/02-mvp-version-keys-and-facets.md`

### Admin-defined filter configuration (must be configurable)

The admin defines:

- Which fields are filterable
- Label, grouping, ordering
- Allowed operators per field (equals, in, range)
- Visibility rules (e.g., only show `grade` filters for graded forms)
- Defaults (pre-selected filters, default sort)

### Non-goals

- No per-filter feature code.
- No hardcoded Pokémon-specific filters.

---

## Relevance & ranking requirements (MVP)

- Strong exact-match behavior for:
  - set + card number
  - exact name matches
- Tolerate common typos.
- Deterministic sorting for order books (price-time).
  - Note: UI may call this “market” or “all listings & offers”; internal model is still an order book projection.

Semantic requirements (day one):

- Support “natural language” queries (e.g., “shiny charizard”, “pikachu promo”, “first edition blastoise”) with relevant results.
- Use hybrid retrieval/ranking (lexical + vector) so exact identifiers still win when present.

---

## Search engine decision

ADR 012 is **Accepted**: OpenSearch (for hybrid lexical + vector search).

---

## Open questions (need your answers)

### Canonical top queries (feed the golden query set)

What are the top 10 search queries we must nail (examples)? This doc is the canonical list.

Draft MVP top 10 (edit/replace as needed):

1. Exact set + number: “Base Set Charizard 4/102”
2. Exact set + number + version cue: “Charizard 4/102 shadowless”
3. Card name + set name: “Pikachu promo” / “Pikachu promo SWSH020”
4. Nickname/descriptor: “shiny charizard”
5. Edition cue: “1st edition blastoise”
6. Graded query: “PSA 10 Charizard”
7. Graded query with company + grade: “CGC 9.5 Umbreon”
8. Sealed product: “Evolving Skies booster box”
9. Sealed product type: “Crown Zenith elite trainer box”
10. Language cue: “Japanese Charizard”

Also ensure these are represented in the evaluation doc: `domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md`.

### Other open questions

- Which filters must exist day 1 (minimum set)?
- Do we need range filters in MVP (e.g., price range, grade range)?
- Do you need synonyms (e.g., common nickname → canonical name) in MVP?
- Do you want the filter config to vary per category (Singles vs Sealed vs Graded)?
- What embedding model do you want to start with (hosted API vs self-hosted OSS), and what is the cost/latency budget per query? (Default posture: hosted API; see ADR 016.)
