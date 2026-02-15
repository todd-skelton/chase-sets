# Catalog Service Guide

## Purpose
Define catalog metadata and version identity ownership.

## Audience
- Engineers implementing catalog capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: catalog item metadata, version model definitions, and catalog validation rules.
- Does not own: offer/listing state, checkout orchestration, and payment capture.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service-local OpenAPI/event directories are not present yet in this pre-code repository.

## Invariants
- Catalog identity must remain stable once published.
- Version resolution must be deterministic for downstream consumers.

## References
- `../../services/README.md`
- `../../AGENT.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`