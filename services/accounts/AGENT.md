# Accounts Service Guide

## Purpose
Define identity-account boundary and authorization policy ownership.

## Audience
- Engineers implementing accounts capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: account lifecycle, organization membership, and role assignments.
- Does not own: catalog metadata, marketplace matching, payments orchestration, and shipping execution.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service-local OpenAPI/event directories are not present yet in this pre-code repository.

## Invariants
- Membership grants must be explicit and scoped to organization context.
- Privileged actions must be authorized in application logic.

## References
- `../../services/README.md`
- `../../AGENT.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`