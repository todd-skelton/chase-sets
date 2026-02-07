# ADR 001: Payments and Payouts

## Status

Accepted

## Context

Chase Sets is a marketplace. We must process buyer payments and (likely) seller payouts. Payment and customer information must never be leaked. We also want to keep PCI scope minimal.

## Options considered

1. Stripe Checkout + Stripe Connect (marketplace payouts)
2. Braintree Marketplace
3. “Manual” payments (not recommended)

## Decision

Use Stripe for payments. Buyers pay any processing fees and can reduce costs by choosing lower-fee rails:

- On-platform balance: free
- ACH transfer: 0.5%
- Credit/debit: pass-through Stripe published fees (rate varies by card type/region; keep current with Stripe pricing)

Seller proceeds accrue to an on-platform balance. Payouts are user-triggered "on demand" where Stripe supports the selected payout method.

## Tradeoffs

- Pros:
- Keeps PCI scope minimal while enabling marketplace-style payouts.
- Aligns incentives by letting buyers/sellers choose cost-saving rails.
- On-platform balance supports repeat purchasing without extra fees.
- Cons:
- Requires a wallet/ledger implementation and reconciliation.
- On-demand payouts introduce fraud/risk considerations (holds, KYC, velocity limits).
- Risks:
- Incorrect ledgering/reconciliation is catastrophic for trust.
- Chargebacks/disputes can create negative balances if not handled carefully.

## Consequences / follow-ups

- Confirm Stripe products: Checkout vs Payment Element; Connect account type; ACH setup.
- Define payout timing rules and risk holds (when seller balance becomes withdrawable).
- Define chargeback/dispute handling, refunds, and negative-balance behavior.
- Define what PII we store vs what Stripe stores; ensure payment/customer info never leaks.
- Event sourcing alignment:
  - Payment, payout, and balance changes must be represented as domain events.
  - Wallet/balance is a projection derived from events (with reconciliation against Stripe).
