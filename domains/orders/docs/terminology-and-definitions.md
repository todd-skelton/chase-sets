# Orders Terminology & Definitions

This document defines the ubiquitous language for the **Orders domain**.

The Orders domain owns the **Checkout â†’ Order** lifecycle: turning marketplace outcomes into buyer checkouts and seller-scoped orders and coordinating with Payments and Fulfillment.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [docs/domain/glossary.md](../../../docs/domain/glossary.md).

---

## Core concepts (MVP)

### Checkout

A **Checkout** is a buyer purchase session that may include items from multiple sellers and can produce multiple Orders/Shipments.

### Buyer

A **Buyer** is the customer who initiates a checkout and is responsible for payment and receiving the order.

### Seller

A **Seller** is the merchant responsible for fulfilling the order lines assigned to their order.

### Order

An **Order** is a seller-scoped transaction record created from a checkout and representing what must be fulfilled.

### Order Line

An **Order Line** is a line item within an Order referencing a SKU and quantity.

### Order Split

An **Order Split** is the deterministic division of a checkout into multiple orders, typically by seller (and optionally by fulfillment origin), so each seller receives a single, clear fulfillment obligation.

### Order State

**Order State** is the domain-owned status progression (created â†’ paid â†’ fulfilled â†’ delivered/canceled/refunded), coordinated via events from Payments and Fulfillment.

### Checkout State

**Checkout State** is the buyer-facing status of the checkout as a whole (draft â†’ submitted â†’ paid â†’ completed/abandoned), reflecting the aggregate state of all associated orders.

### Pricing Summary

A **Pricing Summary** is the computed breakdown of totals for a checkout or order (items, taxes, fees, discounts, shipping), used to request payment authorization and capture.

### Shipping Selection

A **Shipping Selection** is the buyerâ€™s chosen delivery method or speed for a given order (or shipment), used by Orders to request fulfillment.

### Fulfillment Request

A **Fulfillment Request** is the instruction Orders sends to Fulfillment to create shipments, reserve inventory, and eventually mark items as shipped or delivered.

### Payment Request

A **Payment Request** is the instruction Orders sends to Payments to authorize or capture funds based on the checkout or order totals.

### External Order

An **External Order** is an order originating outside the marketplace (e.g., in-store or third-party channel) that is ingested into Orders using a channel-provided idempotency key.

### Idempotency Key

An **Idempotency Key** is the stable identifier used to ensure creating a checkout or order from the same source event does not produce duplicates.

### Cancellation

A **Cancellation** is the reversal of an order prior to fulfillment, initiated by buyer, seller, or system policy, and coordinated with Payments for refund or void.

### Refund

A **Refund** is the monetary return to the buyer for an order (partial or full), triggered by cancellation, return, or dispute outcomes.

### Return

A **Return** is a post-delivery flow that brings items back from buyer to seller and may result in a refund.

### Adjustment

An **Adjustment** is a post-order correction to quantities, pricing, taxes, or fees that requires reauthorization or refund coordination.

---

## Boundaries

Orders references:

- Marketplace trade outcomes
- Payments authorization/capture results
- Fulfillment shipment state

Orders does not own:

- Catalog definition
- Ledger correctness rules
- Shipping label purchasing

