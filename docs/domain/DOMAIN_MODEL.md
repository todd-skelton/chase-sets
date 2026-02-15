# Domain Model

Related: `.ai/GLOSSARY.md`, `docs/domain/BOUNDED_CONTEXTS.md`, `docs/domain/STATE_MACHINES.md`

## Aggregates

- `Account`
- `Organization`
- `CatalogItem`
- `Listing`
- `Offer`
- `Order`
- `Shipment`
- `Payout`
- `Dispute`

## Key Entities

- UserProfile
- CardVersion
- VersionModel
- VersionPath
- InventoryUnit
- PaymentIntentReference
- TrackingReference

## Value Objects

- Money (amount, currency)
- ConditionGrade
- Address
- TimeWindow
- RiskScore

## Invariants (Initial)

- Listing must reference a valid item version and condition/grade attributes.
- Offer and listing matching must resolve to one sellable version identity.
- Order total must equal line totals plus fees and shipping components.
- Shipment cannot be delivered before it is shipped.
- Payout cannot be released before funds are settled and dispute hold windows pass.
- Dispute transitions must preserve full audit history.

## Core Relationships (Cross-context)

- Identity links to Account; Account links to Organization via Membership.
- Organization owns Listings and Offers and can have multiple fulfillment Locations.
- Location holds Inventory for sellable Versions.
- Catalog contains Catalog Items; Item plus Version Path determines sellable Version.
- Listing and Offer each reference exactly one sellable Version.
- Matching a Listing and Offer creates order-initiation facts consumed by Orders.
- Order references checkout/payment/fulfillment lifecycle outcomes.

## Terminology Alignment

- Canonical prose uses `Offer` for buyer-side intent.
- UI can use retail-friendly language while preserving canonical model meaning.

## Notes

- Event sourcing is the source of truth for aggregate state.
- Read models are projections and can be rebuilt.