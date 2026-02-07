# Marketplace Terminology & Definitions

This document defines the ubiquitous language for the **Marketplace domain**.

The Marketplace is responsible for **matching buy/sell intent** (bids/listings) and producing trade outcomes. It does not own catalog definition, payment settlement, or fulfillment execution.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Listing

A **Listing** is a sell-side offer to sell a specific SKU at a price.

### Bid (Offer)

A **Bid** is a buy-side intent to buy a specific SKU at a price.

In UI copy, “Offer” may be used for buyer-friendliness.

### Order Book / Market

The **Order Book** is the internal view/projection of active bids and listings for a SKU.

### Trade / Match

A **Trade** (or **Match**) is the outcome of compatible bids/listings crossing according to marketplace rules.

---

## Boundaries

Marketplace references:

- Catalog identifiers (Item/SKU/Version as defined by Catalog)
- Identity (account/org permissions)

Marketplace does not own:

- Inventory quantities
- Payment settlement / ledger
- Fulfillment workflows
