# Trust-Safety Service Guide

## Purpose
Define policy enforcement and risk signal behavior ownership.

## Audience
- Engineers implementing trust-safety capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: moderation policy decisions, enforcement outcomes, and audit records.
- Does not own: identity credential storage and order source-of-truth data.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service-local OpenAPI/event directories are not present yet in this pre-code repository.

## Invariants
- Enforcement actions must capture actor, reason, and policy context.
- Deterministic policy evaluation should be maintained for equivalent inputs.

## References
- `../../services/README.md`
- `../../AGENT.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`