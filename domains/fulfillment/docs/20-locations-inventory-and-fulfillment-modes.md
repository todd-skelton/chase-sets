# 3.x Locations, Inventory, and Fulfillment Modes

## Purpose

Capture best-practice modeling for multi-location organizations, where inventory must be tracked and fulfilled per location (warehouse/shop/kiosk), while still supporting a global marketplace experience.

This is requirements/design guidance only (no implementation).

See also:

- `domains/fulfillment/docs/33-fulfillment-modes-and-pickup-scope.md`

---

## Problem statement

Once listings/offers are **org-owned**, "where the item physically is" becomes important:

- Multi-location orgs may want to treat inventory separately per location.
- Shipping cost and delivery time depend on the origin location.
- Pickup / kiosk / in-store purchases depend on location capabilities.

If we don’t model this explicitly, we risk:

- Overselling (inventory counted twice)
- Confusing fulfillment (wrong origin, incorrect shipping cost)
- Fragmented behavior when adding pickup/in-store later

---

## Recommended model (best practice)

### 1) Make `Location` first-class

- An Organization can have 1..N Locations.
- Each Location has:
  - Address / geo (at least ZIP for rate calculations)
  - Enabled fulfillment modes (Ship, LocalPickup, Kiosk, InStore)
  - Operating constraints (hours, pickup window rules, etc.)

MVP simplification:

- Treat each org as having exactly **one default Location**.

MVP fulfillment scope:

- MVP is **ship-only** (no pickup), but Locations should still model fulfillment capabilities so pickup/kiosk can be added later without refactoring.

### 2) Track inventory per Location

- Inventory is tracked as `InventoryBalance(SKU, Location) -> quantity`.
- Any “global inventory” is a **projection** (aggregate across locations).

This avoids ambiguity and makes it safe to expand from 1 → many locations.

### 3) Bind listings to a fulfillment origin

Recommended:

- Every Listing is tied to exactly one Location (its fulfillment origin).
- Listing quantities are reserved/committed against that Location’s inventory.

Why:

- It prevents “global pool” confusion and race conditions.
- It makes shipping quotes and ETAs accurate.

### 4) Keep order books global by SKU

Best practice for marketplaces:

- Keep the market defined by SKU (internally: an order book projection with price-time priority).
- Do not fragment markets into “per location” order books unless absolutely necessary.

Location is a fulfillment concern:

- The selected listing’s Location determines shipping origin and pickup eligibility.
- Buyers can be shown shipping estimate and options based on the origin.

### 4a) Allow multi-seller and multi-location fulfillment

Confirmed direction:

- A buyer checkout can include items from **multiple sellers**.
- A single checkout can result in **multiple shipments** (split by seller and/or fulfillment origin location).
- Buyer pays shipping **per shipment** (net of shipping credit, where applicable).

Enhancement (not MVP-critical):

- Cart optimization exists in MVP as a secondary UX path (“Add to cart”): at checkout, listings may be selected to reduce total cost and/or shipment count.
- More advanced consolidation heuristics (beyond initial rules) can be a later enhancement.

### 5) Support multiple fulfillment modes (future-ready)

Model fulfillment as a property of the Order/Shipment, not the Catalog:

- **Ship:** seller ships via carrier label
- **LocalPickup:** buyer picks up at a Location
- **Kiosk:** handoff at a kiosk site
- **InStore:** POS-style in-store purchase/collection

A Location enables one or more of these modes.

---

## How this interacts with shipping credit

- Shipping credit (5% of item value) applies to orders fulfilled via **Ship**.
- Pickup/in-store/kiosk may have:
  - no shipping charge
  - or a service fee (separate decision)

---

## Event sourcing implications (required events)

At minimum, model events like:

- `LocationCreated`, `LocationUpdated`
- `InventoryAdjusted` (receiving/stock correction)
- `InventoryReserved`, `InventoryReservationReleased`, `InventoryCommitted`
- `ListingCreated` (includes `locationId`)

---


## Implementation Checklist
- Inventory management must model balances and reservations by location.
- Reservation flow must define reserve, commit, and release transitions.
- Fulfillment operations should document oversell prevention controls.
- Location metadata should remain explicit in inventory and shipment projections.
