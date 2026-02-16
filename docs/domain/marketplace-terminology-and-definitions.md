# Marketplace Terminology and Definitions

## Purpose
Define marketplace-specific terms not already canonicalized in `glossary.md`.

## Audience
- Engineers implementing matching and market views.
- AI agents documenting marketplace behavior.

## Scope
Marketplace covers offer/listing intent and deterministic trade execution.

## Domain Terms
- **Market View**: read model of active offers and listings for a sellable version.
- **Remaining Quantity**: open quantity after partial execution.
- **Time in Force**: duration policy for active offers/listings.
- **Crossing Trade**: execution when incoming intent matches resting intent.

## Boundaries
Marketplace owns offer/listing lifecycle and matching outcomes. Marketplace does not own checkout orchestration, payout settlement, or shipment lifecycle.

## References
- `glossary.md`
- `marketplace-scope-and-model.md`
- `marketplace-domain-model.md`
