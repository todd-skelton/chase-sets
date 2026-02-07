# ADR 012: Search Engine for Catalog + SKU Facets

## Status

Accepted

## Context

Search is a core workflow: users must find the correct catalog item and then filter/choose the exact SKU (via VariantPath-derived facets).

We need:

- Fast text search for catalog items
- Faceting/filtering on flattened SKU facets (language, foil, grade, etc.)
- Filters must be **admin-defined and config-driven** (no per-filter code changes).
- Vector + semantic search day one (hybrid lexical + vector retrieval/ranking)
- Operational simplicity for MVP
- A path to scale as query complexity grows

## Options considered

1. Meilisearch
2. OpenSearch (Elasticsearch-compatible)

## Decision

Use **OpenSearch** for catalog + SKU search, using a hybrid approach:

- Lexical search (BM25/analyzers) for exact identifiers and deterministic matching
- Vector search (k-NN) for semantic retrieval
- Filters/facets applied via flattened fields and admin-defined filter configuration

## Notes (comparison)

- Meilisearch:
  - Best for: quick MVP search, simple operations, great developer experience
  - Supports: typo tolerance, filters, sorting, basic facets
  - Limitations: fewer advanced query features and aggregations than OpenSearch

- OpenSearch:
  - Best for: sophisticated search relevance tuning, complex aggregations, long-term scale patterns
  - Supports: rich query DSL, aggregations, analyzers, advanced operational knobs
  - Cost: heavier ops footprint and more tuning/maintenance

## Consequences / follow-ups

- Define the minimum viable index templates, analyzers, embeddings fields, and query patterns.
- Decide the embedding strategy (hosted vs self-hosted) and the ingestion pipeline for embeddings.
- Define the filter configuration schema (labels/order/grouping/operators) independent of OpenSearch.
