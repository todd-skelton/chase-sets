# Fulfillment Terminology and Definitions

## Purpose
Define fulfillment-specific terms not already canonicalized in `glossary.md`.

## Audience
- Engineers implementing shipment and tracking workflows.
- AI agents documenting fulfillment contracts.

## Scope
Fulfillment covers shipment lifecycle, carrier interactions, and location-aware delivery behavior.

## Domain Terms
- **Fulfillment Order**: shipping execution unit linked to order lines.
- **Package**: physical parcel with weight and dimensions.
- **Label Purchase**: carrier label acquisition step.
- **Tracking Event**: provider update mapped into shipment status progression.
- **Exception State**: delivery issue state requiring manual or policy action.

## Boundaries
Fulfillment owns shipment state and tracking projections. Fulfillment does not own payment capture, seller payouts, or catalog identity.

## References
- `glossary.md`
- `fulfillment-shipping-and-fulfillment-mvp.md`
- `fulfillment-modes-and-pickup-scope.md`
