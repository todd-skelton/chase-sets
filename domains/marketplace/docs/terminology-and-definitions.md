# Marketplace Terminology & Definitions

This document defines the ubiquitous language for the **Marketplace domain**.

The Marketplace is responsible for **matching buy/sell intent** (offers/listings) and producing trade outcomes. It does not own catalog definition, payment settlement, or fulfillment execution.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [docs/domain/glossary.md](../../../docs/domain/glossary.md).

---

## Core concepts (MVP)

### Listing

A **Listing** is a sellerâ€™s post for a specific Version at a set price (â€œfor saleâ€).

### Offer

An **Offer** is a buyerâ€™s price proposal for a specific Version.

### Buy Now

A **Buy Now** is the action a buyer takes to immediately purchase a listing at the listed price.

### Sell Now

A **Sell Now** is the action a seller takes to immediately accept an offer at the offered price.

### Sale

A **Sale** is the successful outcome when a listing and offer agree on price and quantity.

### Listings & Offers View

The **Listings & Offers View** is the marketplace view of whatâ€™s available for a Version: active listings and active offers.

### Quantity

**Quantity** is the number of units requested on an offer or offered on a listing.

Quantities are denominated in the Versionâ€™s unit of measure as defined by Catalog.

### Partial Sale

A **Partial Sale** is when only part of an offer or listingâ€™s quantity is completed in a sale.

### Remaining Quantity

**Remaining Quantity** is the quantity still available on a listing or offer after a partial sale.

### Offer/Listing Duration

**Offer/Listing Duration** describes how long a listing or offer stays active (default is â€œstays up until canceledâ€).

### Expiration

**Expiration** is when a listing or offer is no longer active due to time limits or policy.

### Cancellation

**Cancellation** is the user- or admin-initiated removal of a listing or offer.

### Eligible to Sell/Buy Now

**Eligible to Sell/Buy Now** means a listing or offer can be accepted immediately (Version and price match, policy checks pass).

### Best Offer / Lowest Listing

The **Best Offer** is the highest active offer price for a Version.  
The **Lowest Listing** is the lowest active listing price for a Version.

### Spread

The **Spread** is the price difference between the lowest listing and the best offer for a Version.

### Listing Status / Offer Status

**Statuses** capture lifecycle state: `draft`, `active`, `partially_filled`, `filled`, `canceled`, `expired`.

---

## Boundaries

Marketplace references:

- Catalog identifiers (Item/Version as defined by Catalog)
- Identity (account/org permissions)

Marketplace does not own:

- Inventory quantities
- Payment settlement / ledger
- Fulfillment workflows

---

## Terms to explore (draft backlog)

These terms are candidates for deeper definition once policy and workflow choices are finalized.

- **Offer Types**: standard offer, auto-accept thresholds, reserve price.
- **Minimum Increment**: smallest allowed price or quantity step.
- **Fees**: buyer premium, seller fee, marketplace fee visibility.
- **Price Guardrails**: outlier checks, minimum/maximum listing limits.
- **Currency & Unit**: how currency and Version units display together.
- **Liquidity**: how to show depth, spread, and time-to-sell in a buyer-friendly way.
- **Speed to Sale**: expected time for an offer or listing to complete.
- **Preview**: â€œwhat youâ€™ll pay / what youâ€™ll receiveâ€ before confirming.
- **Matching Rules**: clear, user-facing explanation of how offers and listings pair.
- **Settlement Window**: how long between a sale and payment/fulfillment start.

