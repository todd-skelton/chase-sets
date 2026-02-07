# Fulfillment Terminology & Definitions

This document defines the ubiquitous language for the **Fulfillment domain**.

Fulfillment owns getting sold items from seller to buyer: shipment creation, labels, tracking, and fulfillment state transitions.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Shipment

A **Shipment** is a fulfillable unit with a single origin and tracking number; a checkout may produce multiple shipments.

### Label

A **Label** is a purchased shipping label associated with a Shipment.

### Tracking

**Tracking** is the stream of carrier updates for a Shipment.

### Fulfillment State

**Fulfillment State** captures the shipment lifecycle (created → labeled → in_transit → delivered → exception).

---

## Actors & parties

### Seller (Fulfillment Party)

The **Seller** is the party responsible for handing off items to a carrier or fulfilling pickup readiness.

### Buyer (Recipient)

The **Buyer** is the recipient of a shipment or pickup order.

### Carrier

A **Carrier** is the logistics provider that transports shipments and supplies labels, tracking events, and service levels.

---

## Entities & data objects

### Fulfillment Order

A **Fulfillment Order** is the fulfillment-side representation of what must be shipped or prepared for pickup, derived from an Order.

### Fulfillment Line

A **Fulfillment Line** is a single item or SKU quantity within a Fulfillment Order that must be allocated and packed.

### Package (Parcel)

A **Package** is the physical parcel that a Shipment represents, including weight and dimensions used for rating and labels.

### Service Level

A **Service Level** is the shipping speed or product (e.g., ground, two-day) selected for a Shipment.

### Rate Quote

A **Rate Quote** is a carrier-provided price estimate for a Package, Service Level, and route at a point in time.

### Origin

**Origin** is the ship-from location associated with a Shipment or Fulfillment Order.

### Destination

**Destination** is the ship-to address or pickup location for a Shipment or Fulfillment Order.

---

## Processes & lifecycle

### Allocation

**Allocation** is the reservation of inventory at an Origin to satisfy Fulfillment Lines.

### Packing

**Packing** is the process of grouping Fulfillment Lines into Packages and recording weights, dimensions, and contents.

### Label Purchase

**Label Purchase** is the act of buying a shipping label for a Package from a Carrier.

### Handoff

**Handoff** is the moment a Carrier takes custody of a Package (scan, pickup, or drop-off).

### Delivery Confirmation

**Delivery Confirmation** is the carrier-provided proof that a Shipment reached the Destination.

---

## Exceptions & edge cases

### Exception

An **Exception** is a non-happy-path condition in Tracking (e.g., delay, address issue, return to sender).

### Lost Shipment

A **Lost Shipment** is a Shipment without tracking progression beyond an agreed threshold or declared lost by a Carrier.

### Damaged Shipment

A **Damaged Shipment** is a Shipment reported as damaged during transit or at delivery confirmation.

---

## Boundaries

Fulfillment references:

- Orders (what must ship)
- Locations (where items ship from)

Fulfillment does not own:

- Payment settlement
- Catalog definition
- Marketplace matching
