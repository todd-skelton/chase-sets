# Identity Terminology & Definitions

This document defines the ubiquitous language for the **Identity domain**.

Identity owns authentication and authorization primitives: accounts, organizations, roles, memberships, and delegated access.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Account

An **Account** is a user identity with authentication credentials and preferences.

### Organization

An **Organization** is a company/team container that can own listings, inventory, and payment settings.

### Membership

A **Membership** links an Account to an Organization.

### Role / RBAC

A **Role** is a named permission set; **RBAC** enforces permissions based on roles.

### Delegated Access

**Delegated Access** is a grant that allows an API client to act on behalf of an account/org with scoped permissions.

---

## Boundaries

Identity is referenced by all domains.

Identity does not own:

- Catalog definition
- Marketplace state
- Payment money math
- Fulfillment execution
