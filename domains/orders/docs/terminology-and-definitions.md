# Orders Terminology & Definitions

This document defines the ubiquitous language for the **Orders domain**.

The Orders domain owns the **Checkout → Order** lifecycle: turning marketplace outcomes into buyer checkouts and seller-scoped orders and coordinating with Payments and Fulfillment.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Checkout

A **Checkout** is a buyer purchase session that may include items from multiple sellers and can produce multiple Orders/Shipments.

### Order

An **Order** is a seller-scoped transaction record created from a checkout and representing what must be fulfilled.

### Order Line

An **Order Line** is a line item within an Order referencing a SKU and quantity.

### Order State

**Order State** is the domain-owned status progression (created → paid → fulfilled → delivered/canceled/refunded), coordinated via events from Payments and Fulfillment.

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
