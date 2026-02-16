# 4.x Money Math: Fees, Shipping Credit, Allocations, and Ledger Invariants (Requirements)

## Purpose

Define a single cross-cutting source of truth for how money is calculated, rounded, allocated, and unwound across:

- Multi-seller checkout (single buyer charge)
- Split shipments
- Shipping credit (5% of item value)
- Refunds/chargebacks/disputes
- Wallet/ledger projections

This is requirements-only (no implementation).

---

## Goals

- Prevent “silent mismatch” between checkout totals, Stripe totals, seller proceeds, and ledger balances.
- Make rounding and allocation rules explicit.
- Ensure refunds/disputes unwind cleanly and deterministically.
- Provide invariants that can be tested via reconciliation.

## Non-goals

- Choosing exact processor fee rates (those can remain configurable).
- Solving tax calculation end-to-end (but we must not block future tax support).

---

## Definitions

- **Line item**: a purchasable unit from a seller (SKU + quantity + unit price).
- **Checkout**: a buyer session that can span multiple sellers.
- **Order**: seller-scoped purchase outcome from a checkout.
- **Shipment**: fulfillment unit that may bundle multiple line items (but has one origin).
- **Gross merchandise value (GMV)**: sum of item prices before fees/shipping.
- **Processing fees**: buyer-paid card/ACH fees (pass-through, configurable).
- **Marketplace fee**: seller fee (currently defined as 5% per item, rounded up to nearest cent).
- **Shipping credit**: credit equal to 5% of item value applied against shipping cost.

---

## Canonical pricing model (high level)

A checkout total must be decomposable into:

1. Items total (GMV)
2. Shipping charges (possibly multiple shipments)
3. Buyer processing fees (if any)

And must allocate into:

- Seller proceeds (per seller)
- Marketplace fees
- Shipping label reimbursements/costs (depending on who buys label)

---

## Rounding rules (must be explicit)

### Currency

- All monetary values are represented in integer minor units (cents).

### Rounding policy

- Marketplace fee rounding: **rounded up** to the nearest cent per item (per current MVP fee model).
- Shipping credit rounding (MVP decision): **round to nearest cent, ties up** (a.k.a. half-up) per line item.
- Allocation rounding: if splitting a total across multiple parties, the algorithm must be deterministic.

Deterministic allocation requirement:

- When a total must be split across N parties, allocate by a stable ordering and distribute remainder pennies deterministically.

---

## Shipping credit math

For each line item:

- `credit_cap_cents = round(0.05 * item_price_cents)`

For each shipment:

- `shipment_credit_cents = sum(credit_cap_cents for line items in shipment)`

Settlement against label cost:

- `buyer_shipping_due_cents = max(0, label_cost_cents - shipment_credit_cents)`

Multi-shipment implication:

- Buyer may pay shipping multiple times (one per shipment), each net of that shipment’s credit.

Open policy point (must be decided before implementation):

- If label cost exceeds credit cap, the **buyer pays the remainder**.

---

## Marketplace fee math

For each line item:

- `marketplace_fee_cents = ceil(item_price_cents * 0.05)`

Notes:

- This fee is assessed per item/line item (not per checkout) to avoid cross-seller coupling.

---

## Seller proceeds and allocations

For each seller order:

- `seller_gross_cents = sum(item_price_cents for seller line items)`
- `seller_fee_total_cents = sum(marketplace_fee_cents for seller line items)`
- `seller_net_proceeds_cents = seller_gross_cents - seller_fee_total_cents`

Processing fees posture:

- Buyer processing fees are buyer-paid and should not reduce seller net proceeds.

Allocation requirements:

- The system must record an explicit allocation that ties:
  - buyer payment capture
  - seller net proceeds
  - marketplace fees
  - shipping credit application
  - shipping charges actually collected

---

## Refunds, disputes, and unwind rules

### Unwind must be explicit

Refunds/chargebacks must create compensating events that unwind prior allocations.

### Targeting

The system must support targeted unwind at least at the level of:

- line item
- order (seller)
- shipment

### Shipping credit unwind

If an item is refunded, unwind must consider:

- whether shipping credit was applied to a shipment containing that item
- whether label cost was incurred and whether it is refundable (policy)

### Negative balances

If seller proceeds were paid out or withdrawable and later unwound:

- the ledger must support negative balances (policy-driven) OR
- the system must prevent withdrawability until risk windows pass

---

## Ledger invariants (must hold)

These invariants must be testable via projections + reconciliation:

1. **Conservation**: captured buyer funds equal the sum of allocations (seller proceeds + marketplace fees + shipping collected) minus refunds.
2. **Determinism**: given the same event stream, totals and allocations are identical.
3. **No edits**: balances are never edited; only appended via credit/debit events.
4. **Traceability**: every balance movement references a cause (payment, refund, adjustment) and related entity IDs.

---

## Operational requirements

- Support/admin tooling must be able to show:
  - checkout totals
  - allocations by seller
  - shipping credit computed and applied
  - label costs and settlement
  - unwind events and resulting balances

---

## MVP policy decisions (explicit)

These are the proposed MVP defaults; change them intentionally (with an ADR) if you want different economics.

1. **Shipping overage**

- If label cost exceeds shipping credit cap, the **buyer pays the remainder**.

2. **Shipping credit rounding**

- Shipping credit is computed per line item as 5% of item price and **rounded half-up to the nearest cent**.

3. **Shipping label refund posture (MVP)**

- If an order is cancelled **before label purchase**, shipping is not charged/captured.
- If a label is purchased and can be **voided/refunded**, the platform attempts to void and refunds any captured shipping amount.
- If a label is purchased and **cannot be voided**, shipping is **non-refundable** (default) unless support issues a reason-coded exception.

4. **Marketplace fee refund posture**

- Marketplace fees are refunded **pro-rata with the refunded item amount** (full item refund => full fee refund).

5. **Dispute liability default**

- Default (MVP): platform is initially liable; disputes/chargebacks are handled case-by-case via reason-coded unwind events.
- Policy option (MVP): for seller-caused cases (non-fulfillment, fraud), unwind may debit the seller balance explicitly.

6. **Negative balances**

- The ledger supports negative balances.
- Negative balances freeze withdrawability until repaid via future proceeds or an explicit repayment flow.

## Implementation Checklist
- Money math must use explicit rounding rules by currency.
- Ledger entries must preserve zero-sum balance invariants.
- Shipping-credit settlement must map to deterministic ledger entries.
- Allocation and unwind behavior must remain reproducible from event history.
