# 3.x Fulfillment Modes and Pickup Scope (Requirements)

## Purpose

Define which fulfillment modes exist on the platform and which are in MVP, in a way that stays compatible with:

- Location-scoped inventory
- Split shipments (multi-seller/multi-location checkout)
- Shipping credit model
- Admin/support operations

This is cross-cutting and requirements-only (no implementation).

---

## Goals

- Make fulfillment scope explicit for MVP.
- Ensure the data model can support future modes without rewriting ownership boundaries.
- Keep checkout behavior deterministic even when multiple modes exist.

## Non-goals (MVP)

- Complex route optimization across sellers/locations.
- International shipping.

---

## Fulfillment modes (catalog)

Each Location can advertise one or more fulfillment modes:

1. **Ship to buyer** (carrier label + tracking)
2. **Local pickup** (buyer picks up at a location)
3. **Kiosk / in-store pickup** (specialized pickup flow; future)
4. **Local delivery** (courier; future)

MVP default is expected to be: **Ship to buyer**.

---

## MVP scope decision

Decision:

- **Ship-only in MVP** (no pickup)

Rationale:

- Simplest operationally; avoids pickup fraud, scheduling complexity, and support load.
- Keeps the platform focused on split shipments + shipping credit + ledger correctness.

Future requirement:

- The system must remain flexible enough to add pickup later without changing core ownership boundaries (org-owned listings/inventory, location-scoped origins, and fulfillment units).

---

## Requirements for ship-to-buyer mode

- Shipping is per-shipment and may be split.
- Shipping credit is applied per shipment based on included line items.
- Buyer pays shipping per shipment net of credit.

---

## Requirements for pickup mode (if enabled)

### Eligibility

- Pickup can only be offered when the listing’s origin location supports pickup.
- Pickup is restricted by policy (e.g., distance, hours, item types).

### Buyer experience

- Buyer must be told pickup location details and pickup window rules.
- Buyer receives a pickup confirmation code (or QR) on purchase.

### Seller experience

- Seller marks order ready for pickup.
- Seller verifies buyer identity/code at pickup.

### Risk and abuse controls

- Pickup orders have fraud risk; policy must define:
  - when funds become withdrawable
  - what happens if buyer claims not received

### Refund/cancellation policy

- Define cancellation window and refund rules for pickup orders.

---

## Checkout behavior with mixed modes

If pickup is enabled, a single checkout may include:

- one shipment from seller A
- one pickup from seller B

Requirements:

- buyer must be presented a clear breakdown (multiple fulfillment units)
- payment remains a single buyer charge (direction)
- refunds/claims can target a specific fulfillment unit

---

## Admin/support requirements

- Support can see fulfillment mode per order/fulfillment unit.
- Support can override status in edge cases with audit.

---

## Required events (conceptual)

If pickup is enabled:

- `PickupSelected`
- `PickupReady`
- `PickupCompleted`
- `PickupExpired`

(Ship-to-buyer remains tracked via shipment events.)

---


## Implementation Checklist
- Checkout integration must define behavior for mixed-mode carts.
- Fulfillment mode policy should define buyer and seller UX constraints per mode.
- Admin tooling should expose mode-specific operational controls and visibility.
- Required events should include mode-selection context for downstream processing.
