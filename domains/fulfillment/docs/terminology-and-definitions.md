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

## Boundaries

Fulfillment references:

- Orders (what must ship)
- Locations (where items ship from)

Fulfillment does not own:

- Payment settlement
- Catalog definition
- Marketplace matching
