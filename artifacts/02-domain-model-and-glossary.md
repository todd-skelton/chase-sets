# 2.2 Domain Model & Ubiquitous Language

## Per-domain ubiquitous language (required)

This document is the **cross-domain** glossary.

Each domain must also define its own **Terminology & Definitions** (ubiquitous language) under:

- `domains/<domain>/docs/terminology-and-definitions.md`

Those per-domain terms should be used to model and name entities, commands, events, APIs, and projections. When a concept becomes shared across domains, reconcile it here.

## Ubiquitous language tenets

- Use **natural language** terms that match how humans talk about the system.
- Model names, API fields, and events should use the **same words** we expect in UI copy and support conversations.
- If a term feels like internal jargon, rename it before it lands in schemas or code.

## Glossary (canonical terms)

- **Identity**: the canonical authentication subject that owns credentials and sessions.
- **User**: a human represented by an Identity.
- **Account**: the platform profile linked to an Identity, with preferences and marketplace-facing attributes.
- **Organization**: a company/team container that can own listings, payment settings, and operational permissions.
- **Location**: a physical fulfillment origin for an Organization (warehouse/shop/kiosk). Locations can have their own inventory and fulfillment methods.
- **Membership**: a link between an Account and an Organization.
- **Role**: a named permission set within an Organization.
- **Role Assignment**: attachment of a Role to a Membership (canonical org RBAC attachment point).
- **RBAC**: role-based access control to enforce what members can do.
- **API client**: any software client that calls the Chase Sets platform APIs (web app, partner integration, AI assistant/agent).
- **Integration access (MVP)**: allowlisted external API access using scoped integration credentials (read-only catalog/search in MVP).
- **Delegated access (Post-MVP)**: an authorization grant where a user/org allows an external API client to act on their behalf with scoped permissions.
- **API key / token**: a credential used by an API client to authenticate; keys/tokens must be scoped, revocable, rotated, and audited.
- **Catalog**: the curated system-managed catalog of Pokémon TCG products.
- **Catalog Set**: an official Pokémon TCG expansion/set (e.g., “Base Set”, “Evolving Skies”).
- **Item**: a canonical product entry in the catalog.
  - Examples: a specific single card, a specific sealed product.
- **Item Form**: the high-level inventory form.
  - Admin-configured values (examples): **Conditioned** (raw/ungraded), **Sealed**, **Graded**.
- **Version**: a specific distinguishable version of an Item and the sellable unit a buyer can purchase.
  - Examples (MVP): language, foil/non-foil, edition/printing where relevant; for graded items: grading company + grade.
- **Version Model**: the configuration template that defines allowed version selection for an Item.
- **Option**: a decision point in the selection flow (required/optional; single/multi select).
- **Option Value**: a selectable value within an Option (may reveal child Options).
- **Version Path**: an ordered list of selected option-optionValue pairs (validated against the Version Model).
- **Version selector**: the UI workflow that guides a user to choose a valid VersionPath (and therefore a sellable Version) for listing/offering/buying.
- **Condition**: the condition for raw singles.
  - Scale is admin-configured; MVP default example: **NM, LP, MP, HP, DMG**.
- **Grade**: a numeric/label grade for graded items (e.g., PSA 10).
  - Companies and grade scales are admin-configured; MVP default examples: **PSA, BGS, CGC**.
  - Grade encoding is typically modeled as two dimensions/facets (example): `company` + `gradeLabel`.
- **Listing**: a sell-side offer to sell a specific Item (and its attributes) at a price.
- **Bid**: a buy-side intent to buy a specific Item (and its attributes) at a price.
- **Order book**: the internal projection that represents the active bids and listings for a sellable Version.
- **Order**: a transaction created when a listing/bid results in a purchase.
- **Checkout**: a buyer purchase session that can include items from multiple sellers and may produce multiple Orders/Shipments.
- **Shipment**: a fulfillable unit with a single origin (location) and a tracking number; buyers may have multiple shipments per checkout.
- **Fulfillment**: the steps that move an order from paid → delivered.
  - MVP: ship-to-buyer only (pickup is explicitly out of MVP).
- **Inventory**: quantities/units of sellable Versions owned by an Organization and tracked per Location.
- **Stock reservation**: a temporary hold on inventory units/quantity to prevent overselling during checkout and fulfillment.
- **Physical attributes**: dimensions (L/W/H) and weight for a sellable Version used to estimate shipping.
- **Shipping credit**: a credit equal to 5% of item value applied to shipping cost.
- **Balance**: a user-held on-platform balance that can be used to pay (free) or withdrawn via payout.
- **Reputation**: the aggregated buyer/seller feedback derived from completed orders.
- **Rating**: a structured numeric score representing satisfaction with a transaction.
- **Review**: written commentary attached to a rating.
- **Feedback Window**: the time period after an order in which feedback can be submitted.
- **Reputation Profile**: the public view of aggregated ratings, reviews, and reputation signals.

## UI terminology (retail-friendly)

We use exchange-like mechanics internally, but UI terminology should remain familiar to online shopping.

Recommended mapping (UI → internal):

- **Offer** (buyer) → `Bid`
- **Listing** or **For sale** (seller) → `Listing`
- **Market view** / **All listings & offers** → `OrderBook` (projection)
- **Offer accepted** / **Item sold** / **You bought it** → `TradeExecuted` / order created (internal events)

## Core relationships (first draft)

- Identity -> Account -> Membership provides acting context for creating Listings and Bids.
- Organization → owns Listings and Bids
- Organization → has Locations
- Location → holds Inventory
- Catalog Set → contains Items
- Item → has Versions
- Item → references a Version Model
- Item + VersionPath → defines a sellable Version
- Listing/Bid → references exactly one sellable Version
- Listing/Bid → belongs to exactly one Order book / market view (defined by sellable Version)
- Order → references the listing/bid that resulted in the purchase + payment/fulfillment state

## Ambiguities / terms to resolve

- “Chase Sets” (brand/platform) vs “Catalog Set” (Pokémon expansion).
- Whether we need a first-class “Collection tracking” domain at all (explicitly out of MVP).
- What fields define a “version” in Pokémon TCG for our use cases.

## Glossary pressure test (current terms)

Confirm each term passes the “would a human say this?” bar and update the canonical term if not.

- **User vs Account**: do users understand the distinction, or should “Account” be the primary human term?
- **Organization vs Team/Shop**: would sellers say “organization,” “store,” or “shop”?
- **Catalog vs Catalog Set vs Item**: do users say “catalog item,” or “product”/“card”?
- **Item Form**: is “form” natural, or should this be “product type”/“format”?
- **Version / Version Model / Version Path**: are these natural terms, or should we use “variant,” “variant rules,” and “variant selection”?
- **SKU vs Version**: should “SKU” exist only as an internal identifier for a sellable Version?
- **Order book**: would users call this “market view,” “listings,” or “offers”?
- **Balance**: should this be “wallet balance” or “store credit” in user-facing language?
