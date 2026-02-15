# Orders Domain â€” Scope & Lifecycle

## Summary

Orders owns the **buyer checkout session** and the resulting **seller-scoped orders**. It is the orchestration point between:

- Marketplace trade outcome (what was bought/sold)
- Payments (authorization/capture, allocation, refunds/disputes)
- Fulfillment (shipments, labels, tracking, delivery)

This keeps Marketplace focused on bids/listings/matching, and keeps Payments focused on money/ledger invariants.

## Responsibilities (MVP)

- Model and persist:
  - **Checkout**: a buyer purchase session (may span multiple sellers)
  - **Order**: a seller-scoped outcome created from a checkout
- Turn marketplace trade executions into a checkout (and orders)
- At checkout submission, when cart is used, select listings to fulfill `Version + quantity` items (optimize for least cost and/or fewer shipments) and then proceed to payment.
- Enforce checkout/order lifecycle rules and timeouts
- Coordinate payment lifecycle (request auth/capture; react to payment events)
- Coordinate fulfillment lifecycle (create shipments; react to shipment events)
- Expose buyer/seller order state via projections/read models

## Non-responsibilities (MVP)

- Matching logic (Marketplace)
- Ledger allocation rules and money math (Payments)
- Carrier integration details (Fulfillment)
- Trust & safety adjudication (Trust & Safety)
- Risk scoring/velocity logic (Risk)

## Domain boundaries (high-level)

### Marketplace â†’ Orders

Marketplace emits a deterministic trade execution event (e.g., `MatchCreated` / `TradeExecuted`) containing:

- buyer org/account reference
- seller org/location reference (if known)
- Version, quantity, unit price, fees inputs
- execution id (globally unique) for idempotency

Orders consumes that and creates a `Checkout` + one `Order` per seller (and/or per origin location if that split is decided at checkout time).

### Channels (in-store / third-party) â†’ Orders

Non-marketplace channels may create **orders directly** (no matching). In that case, a channel adapter ingests an external order and issues an Orders command (idempotent by `(channel, externalOrderId)`) to create an internal `Checkout`/`Order`.

### Orders â†’ Payments

Orders requests Payments to:

- create an authorization sized to the checkout total
- capture funds when checkout is submitted (or immediately, per policy)

Orders reacts to payment events (`PaymentAuthorized`, `PaymentCaptured`, `PaymentFailed`) to advance state.

### Orders â†’ Fulfillment

Once paid, Orders requests Fulfillment to:

- create shipments (split by seller and/or origin location)
- purchase labels and track delivery

Orders reacts to fulfillment events (`ShipmentCreated`, `ShipmentLabelPurchased`, `ShipmentDelivered`) to advance state.

## Core entities (MVP)

- **Checkout**
  - `checkoutId`
  - `buyerAccountId` (or buyer org reference)
  - `status` (Created/Submitted/Paid/Completed/Cancelled/Abandoned)
  - `totals` (items, shipping, fees, processing)
  - `orders[]` (references)

- **Order**
  - `orderId`
  - `checkoutId`
  - `sellerOrgId`
  - `originLocationId` (optional if split is deferred)
  - `status` (Created/Paid/InFulfillment/Completed/Cancelled/Refunded)
  - `lineItems[]` (versionId, quantity, unitPrice)

## Lifecycle (MVP)

Checkout (proposed):

- Created â†’ Submitted â†’ Paid â†’ Completed
- Created â†’ Abandoned
- Created/Submitted â†’ Cancelled (if policy allows)

Order (proposed):

- Created â†’ Paid â†’ InFulfillment â†’ Completed
- Created â†’ Cancelled (pre-capture)
- Paid â†’ Refunded (via Payments-led refund/dispute flow)

## Events & commands (doc-first)

### Commands

- `CreateCheckoutFromTrades`
- `SubmitCheckout`
- `CancelCheckout`
- `MarkOrderShipped` (if seller-manual actions exist)

### Events

- `CheckoutCreated`
- `CheckoutSubmitted`
- `CheckoutAbandoned`
- `OrderCreated`
- `OrderCancelled`
- `OrderPaid`
- `OrderCompleted`

(Additional payment and shipment events live in Payments/Fulfillment domains but are consumed here.)

## Idempotency & determinism

- Checkout creation must be idempotent by upstream execution ids (e.g., `matchId` / `executionId`).
- Checkout submission must be idempotent by `clientRequestId`.
- Order totals must be recomputable deterministically from line items + explicit credits/fees.

## Open questions

- Do we split orders by seller only, or by (seller, origin location) at creation time?
- How is shipping address represented in events (PII inline vs reference id)?
- When do we finalize shipping totals (quote-before-pay vs buy-label-after-pay)?
  - MVP: quote shipping before checkout submit for transparency and authorization sizing, then settle to actual label cost after label purchase (with an explicit shipping buffer to reduce auth failures).
- Do we allow multi-quantity line items for sealed product in MVP?

## References

- Data & event model: `docs/data/EVENT_STORE.md`
- Stripe + split checkout: `docs/adrs/013-stripe-marketplace-model.md`, `docs/adrs/017-single-charge-multi-seller-split.md`
- Fulfillment baseline: `domains/fulfillment/docs/18-shipping-and-fulfillment-mvp.md`
- Money math invariants: `domains/payments/docs/31-money-math-fees-shipping-credit-and-ledger-invariants.md`

