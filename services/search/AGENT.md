# Search Service Agent Guide

## Purpose
- Define ownership and rules for query, indexing projections, ranking signals, and retrieval APIs.

## Scope
- Owns:
  - Search index schemas, ingest projections, ranking logic, faceting behavior.
  - Query APIs and relevance tuning feedback loops.
- Does not own:
  - Source-of-truth catalog or listings data, order workflows, account membership.

## Rules
- Public interfaces:
  - OpenAPI: `services/search/openapi/openapi.yaml`
  - Events emitted: `services/search/events/emitted/`
  - Events consumed: `services/search/events/consumed/`
- Data ownership:
  - Schema prefix: `search_*`
  - Migrations: `services/search/infra/db/migrations/`
- Invariants:
  - Search documents are derived projections, never source-of-truth.
  - Ingestion from upstream events must be idempotent and replay-safe.
  - TODO: define freshness SLO and reindex strategy for full rebuilds.

## Checklist
- Local commands:
  - `pnpm -C services/search test`
  - `pnpm -C services/search lint`
  - `pnpm -C services/search typecheck`
- Testing expectations:
  - Unit tests for ranking and filter normalization logic.
  - Integration tests for index projection pipelines and backfills.
  - Contract tests for search API shape and search-related events.

## Links
- `AGENT.md`
- `docs/events/SKILL.md`
- `docs/standards/testing.md`
