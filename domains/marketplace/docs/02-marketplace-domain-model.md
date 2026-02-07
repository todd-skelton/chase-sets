# Marketplace Domain — Domain Model (Documentation)

## Purpose

Define the Marketplace domain model as documentation before implementation. This builds on:

- Terminology: `docs/terminology-and-definitions.md`
- Scope & responsibilities: `docs/01-marketplace-scope-and-model.md`

The model below describes aggregates, entities, value objects, commands, events, and projections.

---

## Ubiquitous language alignment

- **Listing**: sell intent (seller’s post for a Version at a price).
- **Offer**: buy intent (buyer’s price proposal for a Version).
- **Sale**: successful matching outcome between a listing and offer.
- **Listings & Offers View**: read model for active listings/offers for a Version.

---

## Aggregates

### Listing (aggregate root)

Represents a seller’s intent to sell a specific Version at a price.

**Identity**
- `listing_id`
- `version_id` (Catalog reference)
- `seller_org_id`
- `location_id` (Fulfillment origin)
- `stock_id` (Inventory/stock reference)

**Key attributes**
- `price` (Money)
- `quantity` (Quantity, listing cap)
- `remaining_quantity` (Quantity, listing cap remaining)
- `available_quantity` (Quantity, derived from stock availability and listing cap)
- `purchase_policy` (optional; e.g., per-buyer limits for future enforcement)
- `status` (`draft`, `active`, `partially_filled`, `filled`, `canceled`, `expired`)
- `created_at`, `activated_at`, `canceled_at`, `expired_at`
- `time_in_force` (default GTC)

**Invariants**
- A listing references exactly one Version.
- A listing references exactly one fulfillment origin location.
- A listing references exactly one stock/ inventory balance to draw from.
- Quantity and remaining quantity are denominated in the Version’s unit of measure.
- Remaining quantity cannot exceed quantity.
- Status transitions are linear and auditable.
- An org cannot match against its own listing (self-trade prevention across Listing/Offer).

**Commands**
- `CreateListing`
- `ActivateListing`
- `CancelListing`
- `ExpireListing`
- `RecordListingPartialFill`
- `RecordListingFilled`

**Events**
- `ListingCreated` (includes `location_id` and `stock_id`)
- `ListingActivated`
- `ListingCanceled`
- `ListingExpired`
- `ListingPartiallyFilled`
- `ListingFilled`

---

### Offer (aggregate root)

Represents a buyer’s intent to buy a specific Version at a price.

**Identity**
- `offer_id`
- `version_id` (Catalog reference)
- `buyer_org_id`

**Key attributes**
- `price` (Money)
- `quantity` (Quantity)
- `remaining_quantity` (Quantity)
- `status` (`draft`, `active`, `partially_filled`, `filled`, `canceled`, `expired`)
- `created_at`, `activated_at`, `canceled_at`, `expired_at`
- `time_in_force` (default GTC)

**Invariants**
- An offer references exactly one Version.
- Quantity and remaining quantity are denominated in the Version’s unit of measure.
- Remaining quantity cannot exceed quantity.
- Status transitions are linear and auditable.
- An org cannot match against its own offer (self-trade prevention across Listing/Offer).

**Commands**
- `CreateOffer`
- `ActivateOffer`
- `CancelOffer`
- `ExpireOffer`
- `RecordOfferPartialFill`
- `RecordOfferFilled`

**Events**
- `OfferCreated`
- `OfferActivated`
- `OfferCanceled`
- `OfferExpired`
- `OfferPartiallyFilled`
- `OfferFilled`

---

### Sale (aggregate root)

Represents the immutable outcome of a matching execution. Sales are created by the matching engine and handed off to Orders.

**Identity**
- `sale_id`
- `version_id`
- `listing_id`
- `offer_id`
- `seller_org_id`
- `buyer_org_id`

**Key attributes**
- `price` (Money)
- `quantity` (Quantity)
- `executed_at`
- `match_reason` (e.g., buy-now, sell-now, crossing book)

**Invariants**
- A sale references exactly one listing and one offer.
- Sale price and quantity are derived from the match.
- A sale is immutable once created (append-only).

**Commands**
- `RecordSale`

**Events**
- `SaleRecorded` (includes payload needed by Orders)

---

## Entities & value objects

### Value objects

- **Money**: `currency`, `amount` (integer cents) — validated per currency rules.
- **Quantity**: `amount`, `unit` — unit derived from Catalog Version.
- **TimeInForce**: `GTC` (MVP default) with extension points for expirations.
- **Status**: listing/offer status enums.

### Supporting entities

- **Match** (entity within Sale or Matching context):
  - references listing + offer
  - includes price, quantity, and reason
  - recorded as part of `SaleRecorded`

---

## Matching rules (conceptual)

- **Eligibility**: listing/offer must be `active`, same Version, and pass policy checks.
- **Price-time priority**: higher offer price and lower listing price win first; time breaks ties.
- **Partial fills**: allowed; update `remaining_quantity` and status accordingly.
- **Self-trade prevention**: buyer org cannot match a listing owned by the same org.
- **Stock availability**: matches reserve/commit stock against the referenced `stock_id`.

---

## Projections / read models

- **Listings & Offers View** (per Version): active listings + active offers, plus:
  - best offer
  - lowest listing
  - spread
- **Listing Detail**: listing state, remaining quantity, and history.
- **Offer Detail**: offer state, remaining quantity, and history.
- **Org Open Orders**: active listings/offers for a seller or buyer org.
- **Sale History**: completed sales per Version and per org.

---

## Cross-domain references & handoffs

- **Catalog**: `version_id` and unit of measure.
- **Identity**: buyer/seller org ownership, permissions.
- **Fulfillment/Inventory**: listings reference `location_id` and `stock_id`; stock availability is reserved/committed by the inventory system.
- **Orders**: consumes `SaleRecorded` payload to create checkouts and orders.
- **Payments/Fulfillment**: out of scope; referenced by Orders after sale recording.

---

## Open questions / backlog alignment

- Fees and guardrails (buyer premium, seller fee, price floors/ceilings).
- Expiration and time-in-force policies beyond GTC.
- Minimum increment rules (price/quantity step sizes).
- Matching rule transparency and user-facing explanation.
- Settlement window expectations post-sale.
