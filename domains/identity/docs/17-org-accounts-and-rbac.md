# 2.x Organization Accounts & RBAC (Requirements)

## Purpose

Capture the requirements for **company / organization accounts**, supporting:

- Multiple members per seller organization
- Role-based access control (RBAC)
- Clean future evolution (more auth methods; more roles; compliance needs)

This is requirements-only (no implementation).

## MVP decision (confirmed)

- The system is designed to support **Organizations + RBAC**.
- **MVP constraint:** only **one member/account per organization**.
- The design must allow a clean future move to multi-member orgs with configurable RBAC (without rewriting core ownership models).

---

## Concepts

- **Identity**: a login-capable person (auth credential holder).
- **Account**: the platform profile for an identity (settings, preferences).
- **Organization**: a business/team container that can own resources.
- **Membership**: link between an Account and an Organization.
- **Role**: named permissions.

Ownership targets (resources that may be owned by an Org):

- Catalog operations (admin-only)
- Listings/Bids (seller-side)
- Locations and inventory (fulfillment origins; stock tracking)
- Payout settings / tax settings
- Support/dispute workflows

---

## MVP scope

### MVP (single-member orgs)

- Organizations exist and can own seller resources.
- Each organization has exactly one member in MVP.
- RBAC is modeled, but in MVP it effectively collapses to a single role (Owner).

---

## RBAC model (ready for future expansion)

Roles (starter set):

- **Owner**: manage org, members, payout/tax settings.
- **Admin**: manage members, manage listings, view financials.
- **Lister**: create/manage listings and inventory.
- **Finance**: view balances, initiate payout requests.
- **Support**: view orders, respond to disputes (no payout control).

MVP simplification:

- MVP ships with only **Owner** operationally.
- The data model and permission checks must be compatible with adding the other roles later.

Permission buckets:

- Org settings: create/update org profile
- Member management: invite/remove/change roles
- Marketplace: create/update/cancel listings; view bids; manage inventory
- Orders: view orders; update fulfillment
- Finance: view wallet/ledger; configure payout destination; request payouts

---

## UX requirements

- Users can belong to multiple orgs (future-ready), but MVP may show only one.
- “Acting as” context switching is not required in MVP UI, but ownership boundaries must be explicit.
- Invitations and multi-member onboarding are not required in MVP, but should be supported by the model later.
- Auditability:
  - record who performed what actions (especially finance/payout actions)

---

## Security requirements

- Sensitive actions require strongest protections:
  - payout destination changes
  - payout initiation
  - role changes
- Rate limits and bot protection for invites and auth.

---

## Open questions (need your answers)

1. Do we need step-up auth for finance actions in MVP (email re-confirm), or is magic-link session sufficient?
2. Locations/inventory: is MVP strictly single default location per org (recommended), with multi-location coming later?
3. When we expand beyond single-member orgs, do we want invitations or admin-added members first?
