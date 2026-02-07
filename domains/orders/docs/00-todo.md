# Orders Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Orders (Checkout + Order lifecycle orchestration).

## Inputs / dependencies

- Domain map & contracts: `artifacts/15-domain-map-and-integration-architecture.md`
- Event sourcing posture: `artifacts/adrs/005-event-sourcing-and-projections.md`
- Event store operability contract (must accept before go-live): `artifacts/adrs/018-event-store-operability-and-retention.md`
- Matching baseline (trade execution inputs): `artifacts/adrs/003-bids-listings-and-matching.md`
- Single-charge multi-seller split: `artifacts/adrs/017-single-charge-multi-seller-split.md`
- Stripe marketplace model (record validation evidence before go-live): `artifacts/adrs/013-stripe-marketplace-model.md`
- Fulfillment baseline (ship-only MVP): `domains/fulfillment/docs/18-shipping-and-fulfillment-mvp.md`
- Money math invariants (allocation requirements): `domains/payments/docs/31-money-math-fees-shipping-credit-and-ledger-invariants.md`
- Channels/integrations posture: [artifacts/17-channels-and-integrations-architecture.md](../../../artifacts/17-channels-and-integrations-architecture.md)

## Domain model & boundaries

- [ ] Confirm canonical naming: `Checkout` (buyer session) and `Order` (seller-scoped outcome)
- [ ] Define what Orders receives from Marketplace (TradeExecuted / MatchCreated payload)
- [ ] Define what Orders requests from Payments (authorize/capture) and what it expects back
- [ ] Define what Orders requests from Fulfillment (shipments/labels) and what it expects back
- [ ] Define cancellation/refund boundaries (what Orders owns vs Payments/Admin)
- [ ] Define external order ingest boundary for future channels (adapter emits Orders commands idempotently)

## Lifecycle policy (MVP)

- [ ] Specify allowed state transitions for Checkout and Order
- [x] Define unpaid checkout expiry timeout: default **15 minutes** (configurable)
- [ ] Define abandoned checkout timeout (pre-submit)
- [ ] Define cancellation policy (pre-capture vs post-capture)
- [ ] Define partial fulfillment policy (multi-shipment success/failure handling)

## Events & commands (doc-first)

- [ ] Enumerate commands (CreateCheckoutFromTrades, SubmitCheckout, CancelCheckout, MarkOrderShipped, MarkOrderDelivered)
- [ ] Enumerate events (CheckoutCreated, CheckoutSubmitted, OrderCreated, OrderPaid, OrderCancelled, OrderCompleted)
- [ ] Define idempotency keys (clientRequestId; upstream event ids)

## Projections / read models

- [ ] Define buyer checkout summary view (totals + status + shipments)
- [ ] Define seller order queue view (orders to fulfill)
- [ ] Define order timeline view (events rendered as a history)

## API surface (first implementation)

- [ ] Write API contract docs for:
  - [ ] Create/submit checkout
  - [ ] Checkout status polling
  - [ ] Buyer order history
  - [ ] Seller order queue

## Cross-domain integration points

- [ ] Ensure Risk hooks exist (holds/step-up) at checkout submission and payout-sensitive transitions
- [ ] Ensure Trust & Safety hooks exist (takedowns/suspension) affecting order eligibility

## Tests (when code starts)

- [ ] Deterministic creation tests (same trades => same checkout/orders)
- [ ] Replay tests for order status projections
- [ ] Contract tests for Payments/Fulfillment events

## Open questions to answer

- [ ] Do we allow multi-quantity line items in MVP (sealed) or force quantity=1 always?
- [ ] How do we represent shipping addresses in events (PII reference vs inline)?
- [ ] What is the minimal seller experience for marking shipped/delivered (manual vs carrier webhooks only)?
