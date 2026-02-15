# Bounded Contexts

Related: `docs/domain/DOMAIN_MODEL.md`, `docs/architecture/SYSTEM_OVERVIEW.md`

## Contexts and Responsibilities

- `Identity`: authentication, account recovery, passkeys/MFA, RBAC.
- `Catalog`: collectible identity, version models, metadata normalization, correction workflow.
- `Search` (projection-heavy): indexing, retrieval, ranking inputs.
- `Marketplace`: listings, offers, matching rules, execution outcomes.
- `Orders`: checkout lifecycle and seller-scoped order lifecycle.
- `Payments`: Stripe charge flows, settlement, wallet/ledger projections, payouts, refunds/disputes hooks.
- `Fulfillment`: locations/inventory scope, shipment creation, label purchase, tracking.
- `Reputation`: trust and feedback history.

Planned capabilities (not canonical bounded contexts yet):

- `Risk`: fraud/abuse signals, velocity controls, holds.
- `Trust and Safety`: reports, enforcement, moderation operations.

## Interfaces Between Contexts

- Commands are context-local.
- Cross-context communication uses published domain events.
- Read-side composition should avoid direct writes across context boundaries.

Key handoffs:

- `marketplace.trade.executed` -> Orders checkout/order creation.
- `orders.checkout.submitted` -> Payments authorization/capture flow.
- `payments.order.paid` -> Orders payment completion.
- `fulfillment.shipment.delivered` -> Orders lifecycle completion.

## Cross-cutting Capabilities

- Admin/support tooling
- Notifications (email/SMS/push) on key lifecycle events
- Analytics/telemetry instrumentation
- Channel adapters for future integrations

## Cross-cutting Architectural Rules

- Event sourcing is the transactional system of record.
- Projections are derived and replayable.
- Side-effectful integrations must be replay-safe.
- All mutating APIs require idempotency keys.

## Ownership Model

- Each context owns its event streams and projection schemas.
- Shared kernel remains minimal and explicit (IDs, Money, core value objects).
- Context boundaries are enforced through contracts, not shared data writes.
