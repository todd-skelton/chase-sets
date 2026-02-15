# Domain Glossary

## Purpose

- Keep business language consistent across services, APIs, events, and docs.

## Scope

- Cross-context canonical terms for Chase Sets marketplace.
- Domain prose is category-agnostic. Example categories (such as trading card variants) are illustrative, not scope lock.

## Terms

- **Identity**: canonical authentication subject that owns credentials and sessions.
- **User**: human represented by an identity.
- **Account**: platform profile linked to an identity.
- **Organization**: seller/team container that owns operational resources.
- **Location**: physical fulfillment origin for an organization.
- **Membership**: association between account and organization.
- **Role**: named permission set within an organization.
- **Role Assignment**: attachment of a role to a membership.
- **RBAC**: role-based access control for organization and platform actions.
- **API client**: software client that calls platform APIs (web app, partner integration, assistant/agent).
- **Integration access (MVP)**: allowlisted external API access with scoped credentials.
- **Delegated access (Post-MVP)**: explicit authorization grant for a client to act on behalf of a user or organization.
- **API key/token**: scoped, revocable credential for API clients.
- **Catalog**: curated system-managed catalog of collectible products.
- **Catalog Item**: canonical collectible definition.
- **Item Form**: high-level inventory form (for example raw/conditioned, sealed, graded).
- **Version**: sellable variant of a catalog item defined by stable option selections.
- **Version Model**: template defining valid option paths for a version.
- **Option**: decision point in version selection.
- **Option Value**: selectable value within an option.
- **Version Path**: ordered list of option selections identifying a sellable version.
- **Version Selector**: UI workflow that guides users to a valid version path.
- **Condition**: condition grade for non-graded items.
- **Grade**: grading company and grade label for graded items.
- **Listing**: seller-side intent to sell a version at a price.
- **Offer**: buyer-side intent to buy a version at a price.
- **Order Book**: projection of active listings and offers for a sellable version.
- **Match**: deterministic pairing of listing and offer.
- **Checkout**: buyer purchase session that may span multiple sellers.
- **Order**: seller-scoped outcome created from checkout.
- **Shipment**: fulfillment unit with carrier and tracking lifecycle.
- **Fulfillment**: lifecycle from paid order to delivered shipment.
- **Inventory**: tracked available quantity/units by sellable version and location.
- **Stock Reservation**: temporary hold to prevent oversell during checkout and fulfillment.
- **Physical Attributes**: dimensions and weight used to price shipping.
- **Shipping Credit**: policy credit applied against shipping cost.
- **Balance**: on-platform value that can be used for purchases and withdrawals.
- **Payout**: transfer of settled funds to seller.
- **Dispute**: post-payment issue workflow.
- **Reputation**: aggregate trust signal derived from transaction outcomes.
- **Rating**: structured score for a completed transaction.
- **Review**: written commentary associated with a rating.
- **Feedback Window**: bounded period where transaction feedback can be submitted.
- **Reputation Profile**: public view of aggregate trust signals.
- **Projection (Read Model)**: query-optimized view derived from events.
- **Idempotency-Key**: request header used to deduplicate mutating retries.

## UI Terminology Mapping

Recommended UI terms should remain retail-friendly while preserving canonical internal terms.

- UI `Offer` maps to internal `Offer`.
- UI `Listing` maps to internal `Listing`.
- UI `Market view` or `All listings and offers` maps to internal `Order Book`.
- UI outcomes such as `Offer accepted` map to match/order creation events.

## Compatibility Note

- Canonical prose uses **Offer** for buyer-side intent.
- Historical ADR/backlog content may still use **Bid**; treat it as a legacy alias.

## Checklist

- [ ] Add term and definition for each new core concept.
- [ ] Avoid undocumented synonyms.
- [ ] Link source context when a term is context-specific.
