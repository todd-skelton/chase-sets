# Search Service Guide

## Purpose
Define indexing and retrieval behavior ownership.

## Audience
- Engineers implementing search capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: search indexing schemas, ranking behavior, and query APIs.
- Does not own: source-of-truth catalog or order lifecycle ownership.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service-local OpenAPI/event directories are not present yet in this pre-code repository.

## Invariants
- Search documents must be projection-derived.
- Index ingestion must be replay-safe and idempotent.

## References
- `../../services/README.md`
- `../../AGENT.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`