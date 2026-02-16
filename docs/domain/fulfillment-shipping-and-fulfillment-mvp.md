# 3.x Shipping & Fulfillment (MVP Requirements)

## Purpose

Define the MVP fulfillment workflow for Chase Sets.

We decided to use **EasyPost** as the shipping integration provider (ADR 010). This doc clarifies:

- When labels are purchased
- Who pays shipping
- Tracking lifecycle
- Failure handling
- Required order states/events

This doc also captures the **shipping credit/escrow** concept (see ADR 014).

See also:

- `docs/domain/payments-money-math-fees-shipping-credit-and-ledger-invariants.md` (rounding, allocation, unwind invariants)

Shipping is modeled as a **shipping credit** equal to **5% of item value** on purchase (applies to offers and listing purchases).

---

## Scope

In scope (MVP):

- Address capture and validation
- Label purchase via EasyPost
- Tracking updates and customer-visible shipment status
- Basic support flows for label failures and address issues

Out of scope (MVP, unless you explicitly want them):

- Returns / RMAs
- Insurance claims automation
- International shipping
- Multi-package shipments (multiple packages under one shipment)

---

## Primary workflows

### 1) Seller ships to buyer (standard)

1. Buyer pays for an order.
2. Seller receives â€œready to shipâ€ notification.
3. Seller purchases a label (or platform purchases on their behalf).
4. Seller ships package; tracking begins.
5. Delivery confirmed; order completes.

Notes:

- A buyer checkout can create **multiple shipments** (multiple sellers and/or multiple fulfillment origin locations).
- Shipping is purchased and tracked **per shipment**.

### 1a) Shipping credit (offers + purchases)

When an order is created (whether from an offer being accepted or a listing purchase), the buyer receives a **shipping credit** equal to **5% of item value**, applied to shipping.

- Credit cap per line item: `shipping_credit = 5% * item_price`
- Buyer pays: `max(0, actual_shipping_cost - total_shipping_credit)`
- The system must settle against **actual label cost** (no overcharging).

Operational notes:

- Shipping cost may be unknown at order creation; we may need authorization/escrow and then settle at label purchase.
- For multi-shipment checkouts, credit is applied **per shipment** based on the line items included in that shipment.
- Buyer pays shipping **per shipment** (net of shipping credit), and may see multiple shipping charges.
- Cart optimization to consolidate shipments is a later enhancement.

### 2) Label purchase failure

- Payment succeeded but label purchase fails (address invalid, carrier unavailable, funding issue).
- System must provide:
  - clear error
  - retry flow
  - support escalation

---

## Who pays shipping? (MVP policy)

- Buyer pays shipping **net of** the 5% shipping credit.
- The platform must support crediting/reimbursing the shipping amount appropriately so sellers are not disincentivized to fulfill.

---

## When is label purchased? (choose one)

- **Option A:** After payment capture (common).
- **Option B:** Before payment (quote at checkout; buy after payment).
- **Option C:** After payment authorization (with a shipping buffer) and within a configurable window.

Locked MVP posture:

- Quote shipping before checkout submit (for transparency + authorization sizing).
- On checkout submit, authorize payment sized to totals + shipping buffer.
- Shipping buffer sizing policy is defined in `docs/adrs/014-shipping-rebate-cap.md` (D7).
- Purchase labels promptly after authorization (attempt within the checkout timeout window).
- Settle to actual label cost; buyer pays shipping net of the 5% shipping credit.

---

## Required order states (MVP)

- `Created`
- `Paid`
- `ReadyToShip`
- `LabelPurchased`
- `InTransit`
- `Delivered`
- `Completed`
- `Cancelled`

---

## Tracking requirements

- Store carrier + tracking code.
- Update shipment timeline based on webhook events.
- Display shipment status to buyer and seller.

---

## Shipping estimation requirements (MVP)

To support predictable checkout/bidding and to ensure the 5% credit behaves as intended, SKUs must include physical attributes:

- Dimensions (L/W/H)
- Weight

The system should be able to compute a **theoretical optimal shipping cost** (best available rate by weight/volume) for a given origin/destination.

Notes:

- Estimates are used for UX (showing expected out-of-pocket shipping after credit) and for authorizations/holds when needed.
- Settlement always uses actual label cost from EasyPost.

---


## Implementation Checklist
- Fulfillment services must map label purchase outcomes into explicit shipment status events.
- Fulfillment services should define deterministic handling for label purchase failures.
- Fulfillment services should define delivery exception handling for lost, damaged, and return-to-sender states.
- Fulfillment contracts should define tracking ingestion mapping from provider payloads.


