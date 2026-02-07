# Payments Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Payments (Stripe + wallet/ledger + payouts).

## Inputs / dependencies

- Stripe model validation evidence (before go-live): `artifacts/adrs/013-stripe-marketplace-model.md`
- Single checkout split: `artifacts/adrs/017-single-charge-multi-seller-split.md`
- Money math invariants: `domains/payments/docs/31-money-math-fees-shipping-credit-and-ledger-invariants.md`
- Disputes/unwind: `domains/payments/docs/21-disputes-refunds-chargebacks-and-ledger-unwind.md`
- Seller onboarding/gating: `domains/payments/docs/28-seller-onboarding-kyc-tax-and-payout-gating.md`
- Checkout/order contracts (Orders domain): `domains/orders/docs/01-orders-scope-and-lifecycle.md`

## Stripe integration decisions (must lock)

- [ ] Record validation evidence before go-live (ADR is Accepted (MVP)): `artifacts/adrs/013-stripe-marketplace-model.md`
- [ ] Confirm supported flow for multi-seller checkout and any constraints/limits

## Ledger model & events (doc-first)

- [ ] Define the ledger event envelope for:
  - [ ] Authorization / capture
  - [ ] Transfer creation
  - [ ] Payout initiation / completion
  - [ ] Refund / dispute / chargeback
  - [ ] Shipping credit accrual and settlement
- [ ] Define reconciliation approach (Stripe source-of-truth IDs, periodic checks, mismatch handling)
- [ ] Define negative balance policy enforcement (what happens operationally)

## Webhooks → events mapping

- [ ] Enumerate required Stripe webhooks and the domain events they produce
- [ ] Define idempotency keys for webhook ingestion and event emission
- [ ] Define retry/backoff and “stuck state” remediation

## Payout gating & risk hooks

- [ ] Align withdrawability rules with risk holds/velocity limits
- [ ] Make step-up auth mandatory for payout destination changes and payout actions

## API surface (first implementation)

- [ ] Document API contracts for:
  - [ ] Payment initiation (create PaymentIntent / authorize/capture) as requested by Orders
  - [ ] Payment status polling (for web UI)
  - [ ] Payout destination management
  - [ ] Payout request

## Tests (when code starts)

- [ ] Invariant tests for rounding/allocation/unwind
- [ ] Replay tests for wallet balance projection
- [ ] Stripe webhook fixture tests
