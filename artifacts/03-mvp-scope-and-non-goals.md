# 3.2 MVP / Phase Plan

## Phase 0 (MVP) – Scope

- Web-first marketplace for Pokémon TCG items with curated catalog.
- Search for an item and select form (singles, sealed, graded).
- Create **Listings** (sell) and **Offers** (buy).
- Support two execution modes:
  - Buy/sell immediately (execute at the best available price).
  - Buy/sell via offers and listings (make offer / list; later accept/fulfill).
- Add-to-cart (secondary): cart items represent `SKU + quantity` and are fulfilled at checkout by selecting the best available listings (optimize for least cost and/or fewer shipments).
- Basic order lifecycle: purchase → payment → fulfillment status.
- Shipping integration (EasyPost): label purchase + tracking.
- Platform APIs are first-class: the marketplace web client uses the same HTTP APIs available to external clients.
  - External access may be allowlisted/beta in MVP, but must be supported behind guardrails (rate limits/quotas, pagination, async bulk operations).
  - MVP external/agent use case: **read-only catalog/search** for product discovery.
- Fees and payment rails:
  - Seller fee: 5% applied per item, rounded up to the nearest cent.
  - Buyer pays processing fees; preferred rails: on-platform balance (free) and ACH (0.5%).

## Phase 0 – Explicit exclusions

- Direct integration with other platforms/marketplaces (architecture remains multi-channel ready; see [17-channels-and-integrations-architecture.md](17-channels-and-integrations-architecture.md)).
- Image scanning / card recognition.
- Collection tracking features (beyond what’s required to list/sell/buy).

## Phase 0 – Learning goals

- Validate that a curated catalog improves trust and conversion.
- Validate that “fair” mechanics drive repeat use by both sides.
- Learn which inventory types dominate early (singles vs sealed vs graded).
- Measure liquidity and price discovery (offer/listing price gap, acceptance rate, time-to-sale).

## Phase 1 – Scope

- Expand marketplace depth (disputes/returns policy, seller tooling, moderation).
- Improve catalog operations (curation workflow, corrections, provenance).
- Expand integration capabilities (partner onboarding, API keys/scopes, webhooks, bulk import/export, higher limits by tier).

## Phase 2 – Scope

- Image scanning and automation.
- Integrations with other channels (in-store and third-party platforms).
- Collection tracking as a first-class surface.

---

## Open questions

1. What are the buyer processing fee rates for credit/debit (pass-through) and are they itemized at checkout?
2. Confirmed direction: automatic matching for crossing offers/listings is in scope, and both “buy now” and “sell now” are first-class actions.
3. For EasyPost: which carriers/services are in scope first (USPS/UPS/FedEx; ground vs priority)?
4. What protections exist in MVP (holds, verification, disputes/chargebacks) vs later phases?
