# Search Service Guide

## Purpose
Define indexing and retrieval behavior ownership.

## Audience
- Engineers implementing search capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: search indexing schemas, ranking behavior, and query APIs.
- Does not own: source-of-truth catalog identity or transactional order lifecycle state.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service guide contract: `../SERVICE_GUIDE_CONTRACT.md`

## Invariants
- Search documents must be projection-derived.
- Index ingestion must be replay-safe and idempotent.

## References
- `../../services/README.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`
- `../../domains/search/README.md`
