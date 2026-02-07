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

### Payout

A **Payout** is money sent to a seller (or seller’s connected account) after eligibility gates and settlement rules.

### Ledger

The **Ledger** is the system of record for money math invariants: item value, fees, credits (e.g., shipping credit), refunds, and adjustments.

### Balance

A **Balance** is an on-platform stored value used to pay or withdraw (if supported).

### Dispute / Chargeback

A **Dispute** is an externally initiated payment reversal process (e.g., chargeback) that must be reconciled in the ledger.

---

## Boundaries

Payments references:

- Orders (what is being paid for)
- Identity (who is paying / who receives payout)
- Risk/Trust & Safety signals (optional gating)

Payments does not own:

- Order fulfillment execution
- Marketplace matching
