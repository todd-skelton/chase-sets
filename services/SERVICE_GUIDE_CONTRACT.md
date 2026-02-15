# Service Guide Contract

## Purpose
Define the canonical structure and requirements for `services/*/AGENT.md` guides.

## Audience
- Engineers defining service boundaries.
- AI agents making service-scoped documentation updates.

## Required Sections
Each service guide must include:
- `Purpose`
- `Audience`
- `Scope` with owned and non-owned responsibilities
- `Interfaces`
- `Invariants`
- `References`

## Interface Requirements
- Service guides must reference the canonical API contract at `docs/api/openapi.yaml`.
- If a service-specific API or event contract exists, the guide should link it explicitly.
- Handoffs to other bounded contexts must be event-driven and documented.

## Invariant Requirements
- Invariants must be explicit and testable.
- Security and authorization requirements must be called out when relevant.
- Idempotency requirements must be explicit for mutating operations and event handling.

## References
- [Services Documentation](README.md)
- [Agent Guide](../AGENT.md)
- [Bounded Contexts](../docs/domain/BOUNDED_CONTEXTS.md)
