# Coding Standards

## Purpose
Define implementation standards for future service code in this repository.

## Audience
- Engineers implementing service code.
- AI agents generating implementation guidance.

## Scope
Applies to service, domain, and integration code once implementation begins.

## Tooling
- TypeScript strict mode.
- Lint and format checks in CI.
- Contract and integration tests in CI.

## Architecture Rules
- Domain logic must stay in the domain layer.
- Application layer must orchestrate use cases and authorization.
- Infrastructure layer must implement adapters and persistence boundaries.
- Bounded contexts must communicate through explicit contracts.

## API Rules
- APIs must be contract-first and documented in OpenAPI.
- Mutating endpoints must support idempotency.
- List endpoints must use bounded pagination.
- Error responses must follow `../standards/errors.md`.

## Event Rules
- Event type naming must follow `../domain/EVENT_TAXONOMY.md`.
- Event consumers must be idempotent.
- Projection handlers must be replay-safe.

## References
- `../api/SKILL.md`
- `../standards/testing.md`
- `../standards/versioning.md`
- `../domain/glossary.md`