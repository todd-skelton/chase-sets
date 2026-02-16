# 3.x Disputes, Refunds, Chargebacks, and Ledger Unwind (Requirements)

## Purpose

Define how Chase Sets handles refunds/chargebacks/disputes in a way that is:

- Compatible with **event sourcing** (â€œif it wasnâ€™t an event, it never happenedâ€)
- Compatible with **single buyer charge** + **multi-seller allocation** (ADR 017)
- Compatible with **multi-shipment fulfillment** (multiple sellers/locations per checkout)
- Safe for the **wallet/ledger** (balances are projections; reconciliation required)

This is requirements-only (no implementation).

See also:

- `docs/domain/payments-money-math-fees-shipping-credit-and-ledger-invariants.md`

---

## Guiding principles

1. **Ledger-first truth**
   - We never â€œeditâ€ balances; we append events and recompute.

2. **Allocation-aware**
   - Every checkout/payment must be allocatable to:
     - seller proceeds (per seller)
     - platform fees
     - payment processing fees (buyer-paid)
     - shipping credit/adjustments

3. **Unwind is explicit**
   - A refund/chargeback creates compensating events that unwind prior allocations.

4. **Risk controls are policy-driven**
   - Holds/velocity limits and negative-balance handling are policy decisions, not ad-hoc behaviors.

---

## Definitions

- **Refund**: platform-initiated reversal of funds to the buyer (full or partial), typically before chargeback.
- **Chargeback / dispute**: card-network dispute initiated by the buyer via their bank.
- **Claim**: platform-side dispute process (e.g., item not received, wrong item, damaged, counterfeit claim).
- **Seller liability**: which party ultimately pays for the loss (seller vs platform) under policy.

---

## Scope

### In scope (MVP)

- Partial and full refunds
- Chargeback lifecycle tracking (opened/under review/won/lost)
- Balance unwind mechanics for:
  - single buyer charge â†’ multi-seller allocations
  - multi-shipment orders
- Basic support workflows for disputes

### Out of scope (MVP unless needed)

- Automated evidence submission workflows
- Automated returns/RMAs and label issuance
- Insurance claims automation

---

## Core requirements

### 1) Refunds must be allocation-aware

When a refund happens, the system must record:

- Which checkout/payment is affected
- The refunded amount
- Which seller allocations are reduced (or clawed back)
- Which fees are refunded vs retained (policy-driven)

Refund types:

- **Pre-shipment cancellation refund** (before any label purchased)
- **Post-shipment refund** (after shipping, possibly partial)
- **Partial refund** (price adjustment)

### 2) Multi-seller checkout unwind rules

A single buyer charge can fund multiple sellers.

Minimum requirement:

- We can compute per-seller â€œnet proceedsâ€ and unwind each seller independently.

Policy options (to decide later, but system must support):

- Pro-rata across sellers by item value
- Targeted to the seller responsible for the disputed item/order

### 3) Multi-shipment implications

- A checkout may produce multiple shipments.
- A dispute may apply to a single shipment/order, not the entire checkout.

Requirement:

- Refunds/claims must be able to target:
  - a specific order (seller)
  - and/or a specific shipment
  - and/or a specific line item

### 4) Shipping credit unwind

Shipping credit (5% of item value) reduces buyer shipping costs.

Requirements:

- If an order/line item is refunded, the system must unwind any associated shipping credit effects.
- If shipping labels were purchased, policy must define whether label cost is refundable.

### 5) Negative balances and payout gating

Because sellers can withdraw funds, disputes may cause negative balances.

Requirements:

- Support a policy that can:
  - prevent payouts while there are pending disputes
  - enforce hold periods and velocity limits
  - allow or disallow negative balances
  - recover negative balances from future sales

MVP recommendation (policy direction):

- Allow fulfillment even when funds are not yet withdrawable.
- Keep withdrawability conservative until dispute/chargeback risk is understood.

---

## Required events (conceptual)

The domain/event model must support at least:

- `RefundRequested`, `RefundIssued`, `RefundFailed`
- `DisputeOpened`, `DisputeUpdated`, `DisputeWon`, `DisputeLost`
- `ClaimOpened`, `ClaimResolved`
- `AllocationAdjusted` (reduce seller proceeds + fees based on refund/dispute)

---

## Projections needed (read models)

- Buyer view: refund status, claim status, shipment status
- Seller view: pending disputes, withheld funds, negative balance risk
- Support/admin view: case timeline, evidence checklist, event audit trail

---

## MVP defaults (proposed)

1. **Refund windows**

- Before shipment: buyer can request cancellation/refund (seller may accept/deny per policy; support can override).
- After shipment: handle via **claims** (damaged, wrong item, counterfeit, not received) rather than â€œno-reason refundsâ€.
- After delivery: allow claims within **3 days** of delivery (proposed; configurable).

2. **Default liability by claim type**

- Not received:
  - if carrier tracking shows delivered to the correct address, default deny (support can override)
  - otherwise seller is liable
- Damaged in transit: policy-driven split; default seller-liable for MVP unless insurance/carrier claim recovers.
- Wrong item: seller liable.
- Counterfeit/inauthentic: seller liable (ties to trust & safety enforcement).

3. **Signature confirmation**

- Require signature confirmation for shipments with item value >= **$500** (proposed; configurable).

4. **Processing fees on refunds**

- Buyer receives a full refund of the buyer-paid amount.
- Processor fees are treated as a platform cost unless Stripe explicitly returns them (proposed).

5. **Partial refunds across multiple sellers**

- Refunds are **targeted** to the specific line item / seller order / shipment that caused the claim.
- Do not pro-rate across sellers in the same checkout unless a single checkout-wide promotion/credit explicitly requires it.

## Implementation Checklist
- Payments domain must define explicit unwind behavior for refunds and chargebacks.
- Webhook ingestion should map provider events to deterministic internal events.
- Ledger adjustments must remain auditable and referentially consistent.
- Payment dispute operations should expose operational read models for support.

