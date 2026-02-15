# ADR 015: Location-Scoped Inventory (Global as Projection)

## Status

Accepted (direction)

## Context

Listings and offers are **org-owned**.

For multi-location sellers (warehouse + store + kiosk), we need a consistent way to:

- Prevent overselling
- Produce accurate shipping estimates (origin matters)
- Enable pickup/kiosk/in-store fulfillment later

A tempting shortcut is “global inventory” per org, but that breaks down when different locations have different physical stock.

## Options considered

1. **Location-scoped inventory (recommended):** inventory tracked per (SKU, Location). “Global inventory” is derived.
2. Org-global inventory as the primary model, add locations later.
3. Separate markets/order books per location.

## Decision

Use **Location** as a first-class concept and track inventory per Location:

- Source of truth: `InventoryBalance(SKU, Location)`
- Any “org total” or “available near me” is a **projection** over locations.
- Every listing is tied to exactly one fulfillment origin Location.
- Keep order books global by SKU; location influences fulfillment, not market identity.

MVP simplification:

- Each org starts with exactly one default Location.

## Consequences / follow-ups

- Confirmed: allow multi-seller checkout and split fulfillment into multiple shipments (by seller and/or origin location).
- Buyer pays shipping per shipment; cart consolidation/optimization is a later enhancement.
- Decide whether offers can be location-constrained in the future.
- Define how pickup/kiosk/in-store fulfillment interacts with matching and fees.
- Align events and projections for inventory reservation/commit.
