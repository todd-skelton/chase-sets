# Orders Service Agent Guide

## Purpose
- Define ownership and rules for cart to order conversion, order lifecycle, and order-level consistency.

## Scope
- Owns:
  - Order creation, line-item snapshotting, order status transitions, cancellation windows.
  - Order-level totals as persisted facts for downstream fulfillment and accounting.
- Does not own:
  - Payment processor specifics, shipping carrier execution, catalog canonical data.

## Rules
- Public interfaces:
  - OpenAPI: `services/orders/openapi/openapi.yaml`
  - Events emitted: `services/orders/events/emitted/`
  - Events consumed: `services/orders/events/consumed/`
- Data ownership:
  - Schema prefix: `orders_*`
  - Migrations: `services/orders/infra/db/migrations/`
- Invariants:
  - Order totals are immutable snapshots after placement except defined adjustment flows.
  - Order status transitions must be monotonic and audit-logged.
  - TODO: define split-order policy for multi-seller carts.

## Checklist
- Local commands:
  - `pnpm -C services/orders test`
  - `pnpm -C services/orders lint`
  - `pnpm -C services/orders typecheck`
- Testing expectations:
  - Unit tests for order state machine and pricing snapshot logic.
  - Integration tests for transactional order placement and idempotency.
  - Contract tests for order APIs and lifecycle events.

## Links
- `AGENT.md`
- `docs/api/SKILL.md`
- `docs/events/SKILL.md`
