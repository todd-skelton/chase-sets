# Listings Service Agent Guide

## Purpose
- Define ownership and rules for listing creation, publication, pricing, and listing state transitions.

## Scope
- Owns:
  - Listing lifecycle, price model, listing visibility status, seller listing constraints.
  - Auction/fixed-price listing policy decisions (where applicable).
- Does not own:
  - Canonical catalog data, checkout order orchestration, shipping fulfillment execution.

## Rules
- Public interfaces:
  - OpenAPI: `services/listings/openapi/openapi.yaml`
  - Events emitted: `services/listings/events/emitted/`
  - Events consumed: `services/listings/events/consumed/`
- Data ownership:
  - Schema prefix: `listings_*`
  - Migrations: `services/listings/infra/db/migrations/`
- Invariants:
  - A listing references exactly one sellable catalog item identity.
  - Listing cannot be purchased once terminal state is reached.
  - TODO: finalize listing state machine for reserve and auction edge cases.

## Checklist
- Local commands:
  - `pnpm -C services/listings test`
  - `pnpm -C services/listings lint`
  - `pnpm -C services/listings typecheck`
- Testing expectations:
  - Unit tests for state transitions and pricing rules.
  - Integration tests for listing persistence and concurrency collisions.
  - Contract tests for listing APIs and listing status events.

## Links
- `AGENT.md`
- `docs/api/SKILL.md`
- `docs/events/SKILL.md`
