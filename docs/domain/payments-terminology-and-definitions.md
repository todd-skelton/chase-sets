# Payments Terminology and Definitions

## Purpose
Define payments-specific terms not already canonicalized in `glossary.md`.

## Audience
- Engineers implementing charge, payout, and ledger flows.
- AI agents documenting payment contracts.

## Scope
Payments covers money movement semantics and payout eligibility behavior.

## Domain Terms
- **Authorization**: temporary hold before capture.
- **Capture**: finalization of authorized funds.
- **Ledger Entry**: immutable debit or credit movement record.
- **Payout Hold**: temporary restriction on seller withdrawal.
- **Unwind**: reversing or adjusting ledger effects during refunds/disputes.

## Boundaries
Payments owns charge, payout, and ledger state. Payments does not own catalog identity or shipment status.

## References
- `glossary.md`
- `payments-disputes-refunds-chargebacks-and-ledger-unwind.md`
- `payments-money-math-fees-shipping-credit-and-ledger-invariants.md`
