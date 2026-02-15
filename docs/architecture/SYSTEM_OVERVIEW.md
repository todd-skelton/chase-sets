# System Overview

Related: `docs/domain/BOUNDED_CONTEXTS.md`, `docs/data/EVENT_STORE.md`, `docs/architecture/THREAT_MODEL.md`

## Summary

Chase Sets is a web-first, API-first marketplace platform for trading cards and collectibles. The web client uses the same platform APIs exposed to external clients, with explicit guardrails for reliability and abuse resistance.

## Architecture Posture

- Modular monolith first
- Event sourcing at transactional core
- Projections/read models for query paths
- Explicit seams for future channel and service extraction

## Component Diagram (Textual)

- `Web UI (React)` -> `CDN/static hosting` -> `API edge/ingress` -> `Application services` -> `Domain aggregates` -> `Event store (Postgres)`
- `Projectors` consume event streams and update `read models`
- `Search projection pipeline` updates `OpenSearch`
- `Payments adapter` integrates with `Stripe`
- `Fulfillment adapter` integrates with `EasyPost`

## Platform Components (MVP)

- Static web assets served through CDN.
- API workloads and projectors run in containers.
- NGINX Ingress terminates TLS and routes edge traffic.
- OpenSearch powers lexical and semantic retrieval.
- Wallet/ledger projections track account balances and payout eligibility.
- Shipping integration handles labels and tracking updates.

## Core Data and Transaction Flow

1. Client sends command with `Idempotency-Key`.
2. Service validates command, loads aggregate stream, and applies decision logic.
3. New events are appended with optimistic concurrency.
4. Projectors update read models and search projections.
5. Buyers browse/search using read models and search index.
6. Marketplace actions create or update listings/offers and matching outcomes.
7. Match outcomes are consumed by Orders to form checkout and seller-scoped orders.
8. Orders requests Payments authorization/capture and records external references.
9. Orders requests shipment creation/labels and consumes delivery updates.
10. Payout eligibility is computed from settlement/dispute/fulfillment facts.

## Domain Integration Contracts (Minimum Stable Payloads)

These are minimum stable payload expectations, not exhaustive schemas.

### `marketplace.trade.executed` -> Orders

- `executionId` (globally unique)
- `buyerAccountId` and/or `buyerOrgId`
- `sellerOrgId`
- `versionId`
- `quantity`
- `unitPrice`
- references needed for fee/shipping policy evaluation

### `orders.checkout.submitted` -> Payments

- `checkoutId`
- totals breakdown (items, shipping, credits, fees, processing)
- per-seller allocation references for deterministic ledger handling

### `payments.order.paid` -> Orders

- `checkoutId`
- processor references (for example Stripe IDs)
- allocation confirmation references

### `fulfillment.shipment.delivered` -> Orders

- `shipmentId`
- `orderId`
- delivery status and timestamp

## Trust Boundaries

- Public boundary: internet clients to API edge
- Partner boundary: Stripe, EasyPost, and optional webhook consumers
- Internal boundary: service runtime to event store, read models, and queues

## API Guardrails

- Same API contracts for first-party and external clients.
- No hidden first-party-only business capabilities.
- Required controls:
  - Pagination for list endpoints with bounded page sizes
  - Rate limits and quotas (scoped by IP/account/org/auth method)
  - Idempotency keys for all mutating endpoints
  - Async/batch workflows for heavy operations
- Assistant/agent clients are treated as external clients with explicit consent, scoped permissions, and auditable actions.
