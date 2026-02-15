# ADR 017: Single Buyer Charge (Checkout) With Multi-Seller Split

## Status

Accepted (direction; pending Stripe validation)

## Context

A buyer checkout can include items from multiple sellers and result in multiple orders/shipments.

Card payments often include a fixed per-transaction component (e.g., $0.30), so splitting a checkout into many separate charges increases buyer cost and reduces competitiveness.

We want:

- One combined payment from the buyer per checkout
- Clear allocation of funds to each seller (org-owned)
- Compatibility with Stripe Connect and marketplace payouts
- A clean event-sourced representation for reconciliation

## Options considered

1. **Single charge + internal allocation + multi-transfer (recommended)**
   - Create one Stripe PaymentIntent for the checkout total
   - Allocate amounts to seller ledgers internally
   - Later create Stripe Transfers to each sellerâ€™s connected account when funds are available/cleared

2. Separate charges per seller (UI still looks like one checkout)
   - Increases fixed-fee impact and creates more payment failures

3. Single merchant MVP (platform only) and pay sellers off-platform
   - Faster to ship but high operational overhead and trust/compliance downsides

## Decision

Use **one buyer charge per checkout** and split proceeds to sellers via **internal allocation and Stripe Connect transfers**.

Key points:

- Buyer pays once (single PaymentIntent/charge).
- The system records per-seller allocations in the event stream (ledger-first).
- Seller withdrawability is controlled by risk/hold rules (not by forcing multiple buyer charges).

## Consequences / follow-ups

- Validate the exact Stripe Connect flow in ADR 013 (account type, merchant-of-record posture, transfer timing, dispute handling).
- Validation requirement: confirm Stripe supports **one platform charge** that can be allocated into **multiple connected-account transfers** for a single checkout.
- Suggested Stripe docs to review:
  - https://docs.stripe.com/connect/charges-transfers
  - https://docs.stripe.com/connect/separate-charges-and-transfers
  - https://docs.stripe.com/connect/destination-charges
  - https://docs.stripe.com/connect/direct-charges
- If Stripe cannot support the intended flow, fallback is: **separate charges per seller** (still presented as one cart UX).
- Define event taxonomy for allocation and transfer lifecycle (authorization, capture, allocation, transfer initiated/paid/failed).
- Define how refunds/chargebacks unwind allocations and handle negative balances.
- Define how shipping credit is applied and funded relative to allocations.

