# Marketplace Domain â€” Domain Model (Documentation)

## Purpose

Define the Marketplace domain model as documentation before implementation. This builds on:

- Terminology: `marketplace-terminology-and-definitions.md`
- Scope & responsibilities: `marketplace-scope-and-model.md`

The model below describes aggregates, entities, value objects, commands, events, and projections.

---

## Ubiquitous language alignment

- **Listing**: sell intent (sellerâ€™s post for a Version at a price).
- **Offer**: buy intent (buyerâ€™s price proposal for a Version).
- **Sale**: successful matching outcome between a listing and offer.
- **Listings & Offers View**: read model for active listings/offers for a Version.

---

## Aggregates

### Listing (aggregate root)

Represents a sellerâ€™s intent to sell a specific Version at a price.

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
- Quantity and remaining quantity are denominated in the Versionâ€™s unit of measure.
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

Represents a buyerâ€™s intent to buy a specific Version at a price.

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
- Quantity and remaining quantity are denominated in the Versionâ€™s unit of measure.
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

- **Money**: `currency`, `amount` (integer cents) â€” validated per currency rules.
- **Quantity**: `amount`, `unit` â€” unit derived from Catalog Version.
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


## Implementation Checklist
- Domain model must define command and event sets for listing and offer lifecycle actions.
- Projection model should define open-intent and recent-trade views.
- Integration contracts should define idempotent handoff behavior to orders.
- Test strategy should include deterministic matching and replay-safe projection checks.

