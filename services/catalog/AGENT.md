# Catalog Service Guide

## Purpose
Define catalog metadata and version identity ownership.

## Audience
- Engineers implementing catalog capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: catalog item metadata, version model definitions, and catalog validation rules.
- Does not own: listing and offer state, checkout orchestration, or payment capture.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service guide contract: `../SERVICE_GUIDE_CONTRACT.md`

## Invariants
- Catalog identity must remain stable once published.
- Version resolution must be deterministic for downstream consumers.

## References
- `../../services/README.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`
- `../../domains/catalog/README.md`
