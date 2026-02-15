# Shipping Service Agent Guide

## Purpose
- Define ownership and rules for shipment planning, label purchase orchestration, and tracking updates.

## Scope
- Owns:
  - Shipment entities, package selection, rate quote consumption, tracking status projection.
  - Fulfillment workflow states from ready-to-ship to delivered/exception.
- Does not own:
  - Checkout order placement, payment authorization, account identity proofing.

## Rules
- Public interfaces:
  - OpenAPI: `services/shipping/openapi/openapi.yaml`
  - Events emitted: `services/shipping/events/emitted/`
  - Events consumed: `services/shipping/events/consumed/`
- Data ownership:
  - Schema prefix: `shipping_*`
  - Migrations: `services/shipping/infra/db/migrations/`
- Invariants:
  - Shipment must reference a valid fulfillable order item set.
  - Carrier tracking updates are append-only facts with latest-state projection.
  - TODO: define re-label and return label rules for failed deliveries.

## Checklist
- Local commands:
  - `pnpm -C services/shipping test`
  - `pnpm -C services/shipping lint`
  - `pnpm -C services/shipping typecheck`
- Testing expectations:
  - Unit tests for shipment status transitions.
  - Integration tests for carrier adapter mapping and retry behavior.
  - Contract tests for shipping events and webhook ingestion endpoints.

## Links
- `AGENT.md`
- `docs/events/SKILL.md`
- `infra/SKILL.md`
