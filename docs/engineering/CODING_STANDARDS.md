# Coding Standards

Related: `.ai/CONVENTIONS.md`, `docs/domain/BOUNDED_CONTEXTS.md`, `docs/api/SKILL.md`

## Tooling

- TypeScript strict mode
- ESLint + Prettier (or biome-equivalent) for formatting/linting
- CI enforces lint, test, and contract checks
- Containerized local/dev runtime for services and workers

## Principles

- Containers by default for services and background workers.
- API-first contracts: define/update OpenAPI before implementation.
- Event-first persistence posture: events are source of truth, projections are derived.
- Use ubiquitous language from `docs/domain/glossary.md` in APIs, events, and docs.

## Naming Conventions

- Public fields/JSON keys/columns use `camelCase`.
- Types/classes/interfaces/enums use `PascalCase`.
- Constants use `SCREAMING_SNAKE_CASE` when appropriate.
- Stable version-system keys should remain explicit and durable (avoid ad hoc renames).

## Layering Rules

- API layer depends on application services, not domain internals.
- Domain layer contains business invariants and no framework-specific code.
- Infrastructure layer implements ports/adapters.

## Dependency Rules

- Bounded contexts communicate through contracts/events, not direct data writes.
- Avoid cyclic dependencies across modules.
- Shared kernel stays minimal and explicit.

## API Contract Rules

- No hidden first-party business capabilities.
- Mutating endpoints require idempotency support.
- List endpoints must be paginated with bounded page sizes.
- Rate limits/quotas must be configurable and enforced.
- See `docs/api/SKILL.md` for delivery checklist and API-specific guardrails.

## Event-sourcing Rules

- Aggregates decide; repositories persist events.
- Commands are side-effect free until decision succeeds.
- Projection code must be idempotent and replay-safe.
