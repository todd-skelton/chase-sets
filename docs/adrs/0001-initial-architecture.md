# ADR 0001: Initial Architecture

## Status
Accepted

## Context
The platform requires clear bounded-context ownership, explicit contracts, and strong auditability while implementation is still in pre-code phase.

## Decision
- The platform uses a modular monolith posture with explicit bounded contexts.
- TypeScript on Node.js is the baseline runtime.
- Postgres is the baseline event store and read model data store.
- APIs are REST with OpenAPI-first contracts.
- Event sourcing is the baseline model for core transactional flows.

## Alternatives Considered
1. Broker-first distributed microservices.
2. Shared schema without strict context boundaries.
3. GraphQL-first API surface.

## Consequences
- Teams gain clearer ownership and contract discipline.
- Delivery requires consistent versioning and contract tests.
- Architecture extraction remains possible through explicit interfaces.

## References
- `README.md`
- `../architecture/SYSTEM_OVERVIEW.md`
- `../domain/BOUNDED_CONTEXTS.md`