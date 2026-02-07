# Marketplace Domain — Scope & Model (Requirements)

## Purpose

Define the module-level scope and core model for the marketplace bounded context:

- Listings and bids
- SKU-level order books
- Matching and execution (price-time priority)
- Order creation boundaries (what belongs here vs Orders/Payments/Fulfillment)

Retail-friendly UI terminology is defined in `artifacts/02-domain-model-and-glossary.md`.

This is requirements-only (no implementation).

---

## Canonical references

- Matching basics: `artifacts/adrs/003-bids-listings-and-matching.md`
- SKU identity rule: `artifacts/02-domain-model-and-glossary.md`
- Event sourcing posture: `artifacts/adrs/005-event-sourcing-and-projections.md`

---

## Responsibilities

The Marketplace domain owns:

- Listing lifecycle and invariants (seller intent to sell a SKU)
- Bid lifecycle and invariants (buyer intent to buy a SKU)
- Order book per SKU (price-time priority; internal projection)
- Match/execution events (trade occurs)
- Emitting a trade execution payload consumed by Orders (what was bought/sold, by whom, for how much)

The Marketplace domain does NOT own:

- Capturing external payments (Payments domain)
- Inventory counts, reservations, and stock adjustments (Fulfillment domain)
- Shipping label purchase, tracking, delivery exceptions (Fulfillment domain)
- Catalog item curation and variant definitions (Catalog domain)

---

## Core entities (conceptual)

- **Listing** (org-owned): a sell-side intent for a specific SKU at a price (UI: “listing” / “for sale”)
- **Bid** (org-owned): a buy-side intent for a specific SKU at a price (UI: “offer”)
- **OrderBook (per SKU)**: ordered sets of active bids and listings (internal projection; UI: “all listings & offers”)
- **Match / Execution**: the act of crossing bid/listing that creates a trade (UI: “offer accepted” / “item sold” / “you bought it”)

---

## Invariants (MVP)

- A listing or bid must reference exactly one SKU.
- Each SKU has its own order book; there is no cross-SKU matching.
- Matching is deterministic and auditable (event-sourced): if there wasn’t an event, it didn’t happen.
- Price-time priority governs matching within a SKU.
- Self-trade prevention is enforced (an org cannot match against itself).
- All marketplace actions are org-owned and auditable.

---

## Key events (conceptual)

- `ListingCreated` / `ListingCanceled` / `ListingExpired`
- `BidPlaced` / `BidCanceled` / `BidExpired`
- `OrderBookUpdated` (projection event, optional)
- `MatchExecuted` (the execution that creates a trade)
- `TradeExecuted` (handoff to Orders)

---

## Read models / projections (MVP)

- SKU market view (all listings + all offers; plus optional summaries like best price)
- Listing detail view
- Bid detail view
- User/org “open orders” view

---

## Open questions

Locked MVP policy:

1. Partial fills: allowed (quantity requests may be satisfied across multiple listings when needed).
2. Time-in-force: offers/listings are GTC (**indefinite until canceled** by user, or canceled by admin for policy reasons).

Still to define (implementation details):

3. Cancellation policy during payment processing (what’s the lock / timeout story?).
4. What is the minimum stable `TradeExecuted` payload to create checkouts/orders deterministically?
