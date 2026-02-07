# 4.5 Channels & Integrations Architecture (Multi-Channel)

## Goal

Chase Sets should be a **platform** with multiple **sales channels** over time.

- The **Chase Sets Marketplace** (web-first) is the first channel.
- We should be able to add **in-store / POS** as a channel.
- We should be able to add third-party channels later (e.g., **Facebook**, **Shopify**, **TCGplayer**, **TikTok**, etc.).

MVP constraint: **no direct third-party channel integrations** yet (see [03-mvp-scope-and-non-goals.md](03-mvp-scope-and-non-goals.md)).

MVP constraint: we still design and name the contracts so adapters can be added later with minimal churn.

## Definitions

- **Channel**: a surface that can create demand (orders) and/or supply (listings) against the platform.
- **Channel adapter**: an integration component that translates between an external channel’s API/webhooks and Chase Sets’ internal commands/events.
- **Canonical platform model**: the internal domains (Catalog, Fulfillment/Inventory, Orders, Payments, etc.) are the system of record.

Not a channel (but still important):

- **API client**: a client that talks directly to the platform HTTP APIs (first-party web app, partner integration, or AI assistant/agent).
  - AI assistants (e.g., ChatGPT, Gemini, etc.) are treated as API clients acting on behalf of a user/org via delegated/scoped access.
  - This does not conflict with the “no third-party channel adapters in MVP” constraint; agentic clients do not sync inventory to an external marketplace—they use the platform API directly.

## Core principle: channels are adapters, not sources of truth

- The platform remains **event-sourced**; internal domain events are the source of truth.
- Channel adapters do not implement business rules (pricing, fee math, eligibility). They:
  - translate external inputs into internal commands
  - consume internal events and synchronize outward

This keeps us from building a “different system per channel”.

## Channel taxonomy (how channels interact)

### 1) First-party marketplace channel (Chase Sets)

- Supply + demand are created internally as **Offers/Listings** (internally: bids/listings).
- Uses the **Marketplace** domain (order book + matching).
- Produces trades (`TradeExecuted`) consumed by **Orders**.

**Implementation posture (treat it like every other channel):**

- Model the first-party Marketplace as a **channel with `channelId = marketplace`** and a default org-level connection.
- The web app should call the **same internal command APIs** as any future adapter (no special cases).
- If we build an explicit adapter later, treat it as an **in-process adapter** that emits the same envelopes and uses the same idempotency rules.
- Maintain the same **mapping and outbox** patterns so adding new channels does not change domain behavior.

### 2) In-store / POS channel

- Often creates **orders directly** (no order book, no matching).
- Uses **Orders** (order lifecycle) + **Payments** (capture/refunds) + **Fulfillment** (in-store/pickup/ship mode).
- Inventory movements still flow through **Fulfillment** (location-scoped inventory).

### 3) Third-party marketplace channels (future)

Two common modes (we can support either/both later):

- **Outbound supply sync**: publish our listings to the channel; keep price/availability consistent.
- **Inbound order ingest**: receive orders from the channel and create corresponding internal orders.

The platform should support both without changing core domain rules.

## Integration patterns (recommended)

### Inbound: external → Chase Sets

- External webhook/poll result becomes a `ChannelInboundEvent` processed by the adapter.
- The adapter emits internal commands with **idempotency**:
  - `clientRequestId` derived from `(channel, externalEventId)`
- Commands target the correct domain:
  - Orders: create order from external order
  - Fulfillment: adjust/reserve/commit inventory
  - Payments: capture/refund when using platform rails

### Outbound: Chase Sets → external

- Domain events (ListingCreated, InventoryAdjusted, OrderCompleted, etc.) feed an **outbox-style** projector.
- Channel adapters consume the outbox and call external APIs.
- All outbound calls are retryable and replay-safe (see `artifacts/adrs/018-event-store-operability-and-retention.md`).

## Minimum stable contracts (doc-first)

These contracts let us add channels without changing domain rules.

### 1) Channel connection (org-level)

We need a first-class concept for “Org X is connected to Channel Y”.

Minimum fields:

- `channelId` (e.g., `shopify`, `tcgplayer`, `facebook`, `tiktok`, `pos`)
- `orgId`
- `connectionId` (internal id)
- `status` (Connected, Degraded, Disconnected)
- `capabilities` (supply_sync, order_ingest, messaging, etc.)
- `authReference` (token/key reference; never store secrets in events)

### 2) External identity mapping (the cross-cutting key)

Adapters must never “invent” their own parallel objects. Instead they maintain mappings:

- Listing mapping: `(channelId, orgId, externalListingId) ↔ listingId`
- Order mapping: `(channelId, orgId, externalOrderId) ↔ orderId` (or `checkoutId` when a single external order maps to multiple internal orders)
- Customer mapping (optional): `(channelId, orgId, externalCustomerId) ↔ accountId` (often we keep this as a reference only)

Principles:

- Mappings are immutable once established (prefer new rows/versions to overwriting identifiers).
- Adapters are responsible for creating/maintaining the mapping, but the platform uses mappings for correlation and idempotency.

### 3) Inbound envelope (external → adapter → internal commands)

Adapters should normalize inbound notifications into a durable envelope before translating into internal commands.

Minimum envelope fields:

- `channelId`
- `orgId`
- `externalEventId` (or a derived stable id if the channel lacks one)
- `eventType` (ExternalOrderPlaced, ExternalOrderCancelled, ExternalListingUpdated, etc.)
- `occurredAt`
- `payload` (raw + normalized fields as needed)

Idempotency:

- Every internal command emitted from the adapter must use `clientRequestId = hash(channelId, orgId, externalEventId)`.

### 4) Outbound envelope (internal → outbox → adapter)

We need a canonical way for adapters to consume internal changes.

Minimum outbox fields:

- `channelId` (target)
- `orgId`
- `entityType` (Listing, Inventory, Order, Catalog)
- `entityId` (internal)
- `eventName` (ListingCreated, InventoryAdjusted, OrderPaid, etc.)
- `correlationId` / `causationId`
- `payload`

Delivery rules:

- At-least-once delivery.
- Adapter must be idempotent by `(channelId, orgId, entityId, eventName, causationId)`.

## Required cross-cutting capabilities for multi-channel

- **External ID mapping**: stable mapping for `externalListingId`, `externalOrderId`, `externalAccountId` per channel.
- **Catalog mapping**: ability to map our `skuId` / `itemId` to channel identifiers (channel-specific taxonomies).
- **Inventory as the single truth**:
  - Availability for all channels derives from `InventoryBalance(SKU, Location)` and reservation/commit rules.
  - Avoid duplicating stock counts in adapters.
- **Rate limiting + backoff**: per-channel quotas and safe degradation.
- **Credential management**: OAuth tokens/API keys per org per channel, rotated and audited.

## Where this fits in the overall architecture

- Channels are implemented as adapters in deployable services (see `artifacts/16-repo-structure-and-artifact-placement.md`).
- The bounded contexts remain the platform core (see `artifacts/15-domain-map-and-integration-architecture.md`).

## MVP posture

- Build the platform domains and event contracts so we can add adapters later.
- Implement only the first-party **Chase Sets Marketplace channel** for MVP.

## Open questions

- Which future channel is the first priority after MVP (in-store vs a single external platform)?
- For external channels, do we want “platform payments” (Stripe) or do we ingest net settlement and track it separately?
- Do we require strict real-time inventory sync or is a bounded staleness window acceptable per channel?
