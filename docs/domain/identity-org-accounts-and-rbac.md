# 2.x Organization Accounts & RBAC (Requirements)

## Purpose

Capture requirements for organization accounts and role-based access control.

This document is requirements-only (no implementation).

---

## Canonical decisions

- Identity terminology is **Identity-first**:
  - **Identity** is the authentication subject.
  - **Account** is the platform profile linked to an Identity.
  - **User** is the human represented by an Identity.
- The system is designed for **Organizations + RBAC**.
- **MVP constraint:** one member/account per organization.
- **MVP operational role:** `Owner` only.
- **Role Assignment target:** membership-scoped by default.
  - Account-level/global roles are platform-admin exceptions (Post-MVP).
- Finance-sensitive organization actions require step-up authentication in MVP.

---

## Concepts

- **Organization**: business/team container that owns seller resources.
- **Membership**: link between an Account and an Organization.
- **Role**: named permission set.
- **Role Assignment**: attachment of a Role to a Membership.
- **Acting Context**: whether an account is acting for itself or on behalf of an organization.

Ownership targets (resources that may be owned by an Organization):

- Listings and offers
- Locations and inventory
- Payout settings and tax/KYC configuration pointers
- Support/dispute workflows

---

## MVP scope

### MVP (single-member organizations)

- Organizations exist and can own seller resources.
- Each organization has exactly one membership in MVP.
- RBAC remains modeled for expansion, but enforcement effectively maps to `Owner` only.
- Ownership boundaries are explicit even without UI context switching.

---

## RBAC model (future-compatible)

Starter role set:

- **Owner**: manage org, members, payout/tax settings.
- **Admin**: manage members, manage listings, view financials.
- **Lister**: create/manage listings and inventory.
- **Finance**: view balances, initiate payout requests.
- **Support**: view orders, respond to disputes (no payout control).

MVP simplification:

- MVP ships with only **Owner** operationally.
- Data model and permission checks must support adding other roles without ownership rewrites.

Permission buckets:

- Org settings: create/update org profile.
- Member management: invite/remove/change roles.
- Marketplace: create/update/cancel listings, view offers, manage inventory.
- Orders: view orders, update fulfillment-relevant status.
- Finance: view wallet/ledger, configure payout destination, request payouts.

---

## UX requirements

- Users may belong to multiple organizations (future-ready), even if MVP UI emphasizes one.
- "Acting as" context switching is not required in MVP UI.
- Invitation and multi-member onboarding are Post-MVP, but lifecycle terms remain canonical now.
- Auditability must capture actor + acting context for finance and role-management operations.

---

## Security requirements

- Sensitive actions require strongest protections:
  - payout destination changes
  - payout initiation
  - role changes
- Step-up policies and lockout/rate-limit controls follow identity step-up policy.
- Rate limits and bot protection apply to invites and authentication flows.

---


## Implementation Checklist
- Identity services must define invitation and membership lifecycle transitions.
- RBAC policy must define a minimum role-permission matrix for organization operations.
- Identity APIs should enforce explicit organization context on privileged actions.
- Identity tests should validate permission decisions across role combinations.
