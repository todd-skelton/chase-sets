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

### User

A **User** is the human (or service actor) represented by an Account.

### Credential

A **Credential** is a verifiable secret or proof (password, passkey, MFA factor) tied to an Account.

### Organization

An **Organization** is a company/team container that can own listings, inventory, and payment settings.

### Membership

A **Membership** links an Account to an Organization.

### Role Assignment

A **Role Assignment** attaches a Role to a Membership or Account, defining what actions are allowed.

### Role / RBAC

A **Role** is a named permission set; **RBAC** enforces permissions based on roles.

### Permission

A **Permission** is an explicit allowance to perform an action on a resource.

### Delegated Access

**Delegated Access** is a grant that allows an API client to act on behalf of an account/org with scoped permissions.

### API Client

An **API Client** is an application or service identified to Identity to request delegated access.

### Session

A **Session** is the authenticated interaction window created after successful sign-in.

### Authentication

**Authentication** is the process of proving an Account’s identity.

### Authorization

**Authorization** is the process of deciding whether an authenticated actor can perform an action.

### Multi-Factor Authentication (MFA)

**MFA** is an additional verification step required to increase confidence in an Account’s identity.

### Step-Up Authentication

**Step-Up Authentication** is a temporary elevation in verification required before sensitive actions.

### Sensitive Action

A **Sensitive Action** is an operation that needs heightened verification due to risk (e.g., payout changes).

### Identity Provider (IdP)

An **Identity Provider (IdP)** is an external system that authenticates users and issues assertions.

### Single Sign-On (SSO)

**SSO** is the ability to authenticate once via an IdP and access multiple services without re-entering credentials.

### Verification

**Verification** is checking a claim about an Account (email, phone, legal name) for correctness.

### Recovery

**Recovery** is the process of restoring access to an Account after lost credentials.

### Access Policy

An **Access Policy** is a set of rules that determine which permissions apply in a context.

### Audit Log

An **Audit Log** is a tamper-evident record of identity-related actions for compliance and investigation.

### Identity Proofing

**Identity Proofing** is validating a user’s real-world identity beyond basic authentication.

---

## Boundaries

Identity is referenced by all domains.

Identity does not own:

- Catalog definition
- Marketplace state
- Payment money math
- Fulfillment execution
