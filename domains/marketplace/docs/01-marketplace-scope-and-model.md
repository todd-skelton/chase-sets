# Marketplace Domain — Scope & Model (Requirements)

## Purpose

Define the module-level scope and core model for the marketplace bounded context:

- Listings and offers
- SKU-level order books
- Matching and execution (price-time priority)
- Order creation boundaries (what belongs here vs Orders/Payments/Fulfillment)

Retail-friendly UI terminology is defined in `docs/domain/glossary.md`.

This is requirements-only (no implementation).

---

## Naming guidance (keep “Marketplace”)

Even as we add multiple sales channels, keep this bounded context named **Marketplace**:

- It is the canonical **Listings & Offers** domain (the internal system of record for sell/buy intent).
- Channels are adapters/surfaces that **create or consume** listings/offers; they do not replace the core domain.
- Keeping the name stable avoids churn as we add new channels (in-store, eBay, TikTok, Shopify, etc.).

If we later add a broad “Channels” subdomain, it should live **adjacent** to Marketplace (adapter integrations + mappings), not replace it.

---

## Canonical references

- Matching basics: `docs/adrs/003-offers-listings-and-matching.md`
- SKU identity rule: `docs/domain/glossary.md`
- Event sourcing posture: `docs/adrs/005-event-sourcing-and-projections.md`

---

## Responsibilities

The Marketplace domain owns:

- Listing lifecycle and invariants (seller intent to sell a SKU)
- Offer lifecycle and invariants (buyer intent to buy a SKU)
- Order book per SKU (price-time priority; internal projection)
- Match/execution events (trade occurs)
- Emitting a trade execution payload consumed by Orders (what was bought/sold, by whom, for how much)

The Marketplace domain does NOT own:

- Capturing external payments (Payments domain)
- Inventory counts, reservations, and stock adjustments (Fulfillment domain)
- Shipping label purchase, tracking, delivery exceptions (Fulfillment domain)
- Catalog item curation and version definitions (Catalog domain)

---

## Core entities (conceptual)

- **Listing** (org-owned): a sell-side intent for a specific SKU at a price (UI: “listing” / “for sale”)
- **Offer** (org-owned): a buy-side intent for a specific SKU at a price (UI: “offer”)
- **OrderBook (per SKU)**: ordered sets of active offers and listings (internal projection; UI: “all listings & offers”)
- **Match / Execution**: the act of crossing offer/listing that creates a trade (UI: “offer accepted” / “item sold” / “you bought it”)

---

## Invariants (MVP)

- A listing or offer must reference exactly one SKU.
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
- Offer detail view
- User/org “open orders” view

---


## Implementation Checklist
- Marketplace domain must keep listing and offer aggregate boundaries explicit.
- Marketplace contracts must define minimum deterministic trade-execution payload fields.
- Matching behavior must define price-time priority and cancellation race handling.
- Market read models should expose best-offer and best-listing projections per sellable version.
