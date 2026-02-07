# Search Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Search (OpenSearch + relevance).

## Inputs / dependencies

- Search engine decision: `artifacts/adrs/012-search-engine-mvp.md`
- Embedding strategy evidence (before go-live): `artifacts/adrs/016-embedding-strategy.md`
- Search/filtering requirements: `domains/search/docs/19-search-and-filtering-requirements.md`
- Relevance evaluation: `domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md`
- Catalog SKU + facets contract (must be stable first): `domains/catalog/docs/01-sku-identity-and-resolution.md`

## Index design

- [ ] Define index mappings (text fields, keyword fields, facets, vectors)
- [ ] Define analyzers (exact match vs fuzzy vs synonyms)
- [ ] Define the facet set for MVP (condition, grade, language, product type, etc.)

## Query parsing & ranking

- [ ] Define query parsing rules for identifier queries (set + number)
- [ ] Define hybrid scoring strategy (lexical + vector) and guardrails for exact matches

## Evaluation and acceptance

- [ ] Run golden query evaluation and record evidence (ADR is Accepted (MVP)): `artifacts/adrs/016-embedding-strategy.md`
- [ ] Add the first 10–20 expected real launch queries to the golden set

## Indexing pipeline

- [ ] Define projection → indexer event flow and backfill/rebuild story
- [ ] Define “reindex without downtime” posture (MVP: acceptable maintenance window?)

## Tests (when code starts)

- [ ] Golden query regression test harness
- [ ] Replay-safe indexing tests
