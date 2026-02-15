# Accounts Service Agent Guide

## Purpose
- Define ownership and rules for tenant accounts, user membership, authentication boundaries, and authorization roles.

## Scope
- Owns:
  - Account and membership lifecycle, role assignments, account settings.
  - Identity and tenant boundary checks for service-facing auth context.
- Does not own:
  - Catalog data, listing lifecycle, payment processor orchestration, shipping operations.

## Rules
- Public interfaces:
  - OpenAPI: `services/accounts/openapi/openapi.yaml`
  - Events emitted: `services/accounts/events/emitted/`
  - Events consumed: `services/accounts/events/consumed/`
- Data ownership:
  - Schema prefix: `accounts_*`
  - Migrations: `services/accounts/infra/db/migrations/`
- Invariants:
  - User membership is scoped to tenant and role grants are explicit.
  - Privileged actions require authorization checks in application layer.
  - TODO: define step-up authentication triggers for sensitive actions.

## Checklist
- Local commands:
  - `pnpm -C services/accounts test`
  - `pnpm -C services/accounts lint`
  - `pnpm -C services/accounts typecheck`
- Testing expectations:
  - Unit tests for role and permission policy rules.
  - Integration tests for membership persistence and auth token mapping.
  - Contract tests for auth/account APIs and membership events.

## Links
- `AGENT.md`
- `docs/domain/SKILL.md`
- `docs/api/SKILL.md`
