# Marketplace Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Marketplace.

## Inputs / dependencies

- Matching baseline: `artifacts/adrs/003-bids-listings-and-matching.md`
- Single checkout split constraint: `artifacts/adrs/017-single-charge-multi-seller-split.md`
- Event sourcing posture: `artifacts/adrs/005-event-sourcing-and-projections.md`
- Event store operability contract (must accept before go-live): `artifacts/adrs/018-event-store-operability-and-retention.md`

## Domain model & boundaries

- [ ] Confirm aggregate boundaries: Listing, Bid, OrderBook (projection)
- [ ] Define the trade execution payload emitted to Orders (e.g., `TradeExecuted`)
- [ ] Define the minimum fields for a “trade execution” (price, quantity, fees allocation references)

## Time-in-force + cancellation

- [x] Choose MVP time-in-force defaults: GTC (indefinite until user cancel; admin can cancel for policy)
- [ ] Define cancellation policy and race handling (cancel vs match)
- [ ] Define what is “reserved” when a match is pending payment (if anything)

## Matching rules

- [x] Decide partial fills: yes in MVP
- [ ] Specify price-time priority precisely (tie-breaker fields, timestamps)
- [x] Specify crossing behavior: execute at resting (book) order price
- [ ] Define “buy now” semantics as a deterministic transformation to a bid/listing

## Events & commands (doc-first)

- [ ] Enumerate commands (PlaceBid, CancelBid, CreateListing, CancelListing, ExecuteBuyNow, ExecuteSellNow)
- [ ] Enumerate events (BidPlaced, BidCanceled, ListingCreated, ListingCanceled, MatchExecuted, TradeExecuted)
- [ ] Define idempotency keys for write APIs (clientRequestId strategy)

## Projections / read models

- [ ] Define SKU market view projection shape (best offer / lowest listing, optional depth)
- [ ] Define user/org open orders projection
- [ ] Define “recent sales” projection per SKU (supports price history)

## API surface (first implementation)

- [ ] Write API contract docs (endpoints, request/response shapes) for:
  - [ ] Create/cancel listing
  - [ ] Place/cancel bid
  - [ ] View market view (all listings & offers)
  - [ ] View my open orders

## Cross-domain integration points

- [ ] Define the handoff event(s) to Orders (trade execution events + idempotency)
- [ ] Ensure risk controls hooks exist (rate limits, holds, step-up triggers) without polluting core matching

## Tests (when code starts)

- [ ] Property tests for matching determinism (same inputs => same execution)
- [ ] Replay tests for projections (idempotent, safe under duplicates)

## Open questions to answer

- [ ] What is the MVP unit of quantity (always 1 item per order vs quantity > 1 for sealed product)?
- [ ] Do we allow sellers to list multiple identical units under one listing, or one listing per unit?
