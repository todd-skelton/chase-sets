---
name: payments-ledger-unwind
description: Build or modify Chase Sets payment allocations, fee math, shipping credit math, refunds, disputes, chargebacks, and ledger unwind behavior. Use when implementing money math invariants, payout gating, or compensation-event flows.
---

# Payments Ledger Unwind

## Read First
- `AGENT.md`
- `domains/payments/docs/31-money-math-fees-shipping-credit-and-ledger-invariants.md`
- `domains/payments/docs/21-disputes-refunds-chargebacks-and-ledger-unwind.md`
- `domains/payments/docs/28-seller-onboarding-kyc-tax-and-payout-gating.md`
- `artifacts/adrs/013-stripe-marketplace-model.md`
- `artifacts/adrs/017-single-charge-multi-seller-split.md`
- `artifacts/19-mvp-decisions-to-lock.md`

## Workflow
1. Start from checkout decomposition and seller allocation requirements.
2. Encode rounding and deterministic remainder distribution rules explicitly.
3. Keep buyer processing fees separate from seller net proceeds.
4. Represent refund/dispute as explicit compensating events; never edit balances in place.
5. Support targeted unwind at line item, order, and shipment levels.
6. Apply payout gating and negative-balance policy per documented defaults.
7. Verify reconciliation and traceability for each balance movement.

## Hard Rules
- Use integer minor units (cents) for all calculations.
- Ledger is append-only; no balance mutation shortcuts.
- Refund/chargeback handling must unwind prior allocations deterministically.
- Keep every balance movement causally linked to source entities.
- Keep finance-sensitive actions step-up protected and auditable.

## Deliverables
- Money math implementation with explicit rounding policy.
- Allocation and unwind event handling.
- Reconciliation and invariant tests.
- Operational visibility for support/admin to inspect totals and unwind history.

## Quick Review Checklist
- Conservation invariant holds for captures, allocations, and refunds.
- Determinism holds under replay.
- Partial refund targeting is explicit.
- Shipping credit and overage behavior matches policy.
- Negative balance and payout hold behavior is enforceable and auditable.
