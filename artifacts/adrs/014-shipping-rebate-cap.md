# ADR 014: Shipping Credit (5%) / Escrow Settlement

## Status

Accepted (concept)

## Context

Shipping costs can be a major source of friction and can discourage sellers from shipping orders created when an offer is accepted.

We want a consistent, predictable model that:

- Ensures shipping is covered when an order is fulfilled (offers and purchases)
- Keeps buyer shipping spend bounded and transparent
- Settles to actual shipping cost (no overcharging)
- Works with event sourcing + projections + Stripe payment authorization/capture

We also want to estimate shipping using SKU **dimensions + weight** so buyers can see expected out-of-pocket costs and we can size authorizations/holds.

## Decision

Apply a **shipping credit** model across executed orders:

- For each purchased line item, compute `shipping_credit = 5% * item_price`.
- Buyer pays shipping net of credit: `max(0, actual_shipping_cost - total_shipping_credit)`.
- Settlement always uses the **actual label cost**.
- The platform authorizes payment at checkout submit (MVP) and settles once the label is purchased.

## Consequences / follow-ups

- Define what happens when actual shipping exceeds the credit cap (buyer pays remainder vs constraints).
- Define multi-item shipment behavior (one label across multiple SKUs, partial shipments).
- Capture the required events for authorization, label purchase, settlement, and refunds/cancellations.
- Define how shipping estimates are computed from dimensions/weight (and what defaults apply when unknown).
