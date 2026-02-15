# Orders Service Guide

## Purpose
Define checkout and seller-order orchestration ownership.

## Audience
- Engineers implementing orders capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: checkout creation, order lifecycle transitions, and order totals snapshots.
- Does not own: payment processor internals and shipping carrier APIs.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service-local OpenAPI/event directories are not present yet in this pre-code repository.

## Invariants
- Order totals must be immutable after placement except explicit adjustment flows.
- Order transitions must be monotonic and auditable.

## References
- `../../services/README.md`
- `../../AGENT.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`