# Integrations Service Agent Guide

## Purpose
- Define ownership and rules for external system integration boundaries and adapter reliability.

## Scope
- Owns:
  - Provider adapters, webhook ingestion, outbound API orchestration, retry and circuit-breaker policy.
  - Mapping between internal contracts and external provider contracts.
- Does not own:
  - Core domain invariants for catalog/listings/orders/accounts.

## Rules
- Public interfaces:
  - OpenAPI: `services/integrations/openapi/openapi.yaml`
  - Events emitted: `services/integrations/events/emitted/`
  - Events consumed: `services/integrations/events/consumed/`
- Data ownership:
  - Schema prefix: `integrations_*`
  - Migrations: `services/integrations/infra/db/migrations/`
- Invariants:
  - External side effects are tracked with idempotency keys and retry-safe state.
  - Provider payload mapping is explicit and versioned.
  - TODO: define dead-letter and operator replay workflow.

## Checklist
- Local commands:
  - `pnpm -C services/integrations test`
  - `pnpm -C services/integrations lint`
  - `pnpm -C services/integrations typecheck`
- Testing expectations:
  - Unit tests for adapter mapping and policy logic.
  - Integration tests for webhook verification and outbox dispatch.
  - Contract tests for provider-facing and internal integration APIs/events.

## Links
- `AGENT.md`
- `docs/events/SKILL.md`
- `infra/SKILL.md`
