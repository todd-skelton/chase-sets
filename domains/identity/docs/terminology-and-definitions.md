# Identity Terminology & Definitions

This document defines the ubiquitous language for the **Identity domain**.

Identity owns authentication and authorization primitives: identities, accounts, sessions, organizations, memberships, RBAC, API client access, and step-up policy evaluation.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Canonical concepts

Phase tags:

- **MVP**: in scope today
- **Post-MVP**: intentionally future-facing
- **Cross-Phase**: applies to both

### Identity (Cross-Phase)

An **Identity** is the canonical authentication subject (login-capable principal) that owns credentials and sessions.

### User (Cross-Phase)

A **User** is a human represented by an Identity.

### Account (Cross-Phase)

An **Account** is a platform profile linked to an Identity, containing preferences and marketplace-facing profile data.

### Actor (Cross-Phase)

An **Actor** is the effective entity performing an action (an account acting for itself or on behalf of an organization).

### Acting Context (Cross-Phase)

**Acting Context** is the scope in which authorization is evaluated:

- self context (account scope)
- organization context (membership scope)

### Credential (Cross-Phase)

A **Credential** is a verifiable proof used to authenticate an Identity (for example magic link proof, password, passkey, MFA factor).

### Session (MVP)

A **Session** is a revocable authenticated interaction window bound to an Identity (and optionally device context).

### Authentication (Cross-Phase)

**Authentication** is the process of proving an Identity.

### Authorization (Cross-Phase)

**Authorization** is the process of deciding whether an Actor in a given Acting Context can perform an action.

### Organization (MVP)

An **Organization** is a company/team container that can own seller resources.

### Membership (MVP)

A **Membership** links an Account to an Organization.

### Role (MVP)

A **Role** is a named permission set.

### Permission (MVP)

A **Permission** is an explicit allowance to perform an action on a resource.

### Role Assignment (MVP)

A **Role Assignment** attaches a Role to a Membership. This is the canonical RBAC attachment point.

### Global Role Assignment (Post-MVP)

A **Global Role Assignment** attaches a role directly to an Account for platform-level administration and is not the default seller RBAC model.

### RBAC (MVP)

**RBAC** enforces permissions through Role Assignments.

### API Client (MVP)

An **API Client** is an application or service identified to Identity for non-browser API access.

### Integration Access (MVP)

**Integration Access** is scoped API access for allowlisted external clients using integration credentials (for MVP: read-only catalog/search scope).

### Delegated Access Grant (Post-MVP)

A **Delegated Access Grant** allows an API client to act on behalf of an account or organization with explicit consent and scoped permissions.

### Multi-Factor Authentication (Post-MVP)

**MFA** is an additional verification factor beyond the primary sign-in method.

### Step-Up Authentication (MVP)

**Step-Up Authentication** is action-bound re-verification required before a Sensitive Action can execute.

### StepUp Challenge (MVP)

A **StepUp Challenge** is a short-lived challenge tied to a specific action intent, method, and expiry.

### Sensitive Action (MVP)

A **Sensitive Action** is an operation requiring heightened assurance (for example payout destination change, payout initiation, role changes, credential reset).

### Verification (MVP)

**Verification** checks a claim about an account or user contact point (email, phone).

### Identity Proofing (Post-MVP)

**Identity Proofing** validates a user's real-world identity beyond basic authentication and contact verification.

### Recovery (MVP)

**Recovery** restores account access when primary credentials are unavailable.

### Access Policy (Cross-Phase)

An **Access Policy** is a configurable rule set that determines when permissions apply and when step-up is required.

### Audit Log (Cross-Phase)

An **Audit Log** is a tamper-evident record of identity-sensitive actions, including actor, context, target, and outcome.

### Identity Provider (Post-MVP)

An **Identity Provider (IdP)** is an external system that authenticates identities and issues assertions.

### Single Sign-On (Post-MVP)

**SSO** is the ability to authenticate through an external IdP and access multiple services without repeated sign-in.

---

## Canonical identifiers

Use these names consistently in APIs, events, and projections:

- `identityId`
- `accountId`
- `orgId`
- `membershipId`
- `roleAssignmentId`
- `sessionId`
- `clientId`
- `grantId`
- `stepUpChallengeId`

---

## Boundaries

Identity is referenced by all domains.

Identity owns:

- Authentication and session lifecycle
- Organization membership and RBAC primitives
- Access policy evaluation inputs for authz and step-up
- External client credentials and delegated grant primitives
- Identity-sensitive audit records

Identity references but does not own:

- Catalog definition
- Marketplace state
- Payment money math
- Fulfillment execution
- Risk scoring decisions
- Payments KYC/payout eligibility policy
