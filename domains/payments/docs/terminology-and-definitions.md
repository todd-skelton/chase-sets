# Payments Terminology & Definitions

This document defines the ubiquitous language for the **Payments domain**.

The Payments domain owns money movement semantics: charging buyers, paying sellers, ledgering fees/credits, and handling disputes/refunds/chargebacks.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Charge

A **Charge** is a buyer payment attempt (authorization and/or capture depending on provider).

### Authorization

An **Authorization** is a temporary hold for funds on a buyer’s payment method, reserving an amount for a future capture.

### Capture

A **Capture** is the act of finalizing an authorized amount (full or partial) into a settled charge.

### Payment Intent

A **Payment Intent** is the internal representation of the buyer’s payment plan for an order, including required amount, method, and current state.

### Payout

A **Payout** is money sent to a seller (or seller’s connected account) after eligibility gates and settlement rules.

### Ledger

The **Ledger** is the system of record for money math invariants: item value, fees, credits (e.g., shipping credit), refunds, and adjustments.

### Ledger Entry

A **Ledger Entry** is an immutable record representing a debit or credit that moves value between accounts in the ledger.

### Balance

A **Balance** is an on-platform stored value used to pay or withdraw (if supported).

### Fee

A **Fee** is a platform- or provider-applied cost (e.g., payment processing, platform commission) recorded in the ledger.

### Credit

A **Credit** is a positive value applied to an order or account (e.g., shipping credit, promo credit) and recorded in the ledger.

### Refund

A **Refund** is a reversal of a captured amount back to the buyer, reconciled in the ledger and often linked to a charge.

### Dispute / Chargeback

A **Dispute** is an externally initiated payment reversal process (e.g., chargeback) that must be reconciled in the ledger.

### Settlement

**Settlement** is the point at which captured funds are available for payout or internal transfer, subject to provider timing.

### Payout Hold

A **Payout Hold** is a gating state that temporarily blocks payout availability due to risk, compliance, or dispute activity.

### Net Proceeds

**Net Proceeds** is the seller-available amount after fees, credits, refunds, and adjustments are applied.

### Payment Method

A **Payment Method** is the buyer’s funding source (card, bank transfer, wallet, etc.) used for authorization and capture.

---

## Boundaries

Payments references:

- Orders (what is being paid for)
- Identity (who is paying / who receives payout)
- Risk/Trust & Safety signals (optional gating)

Payments does not own:

- Order fulfillment execution
- Marketplace matching
