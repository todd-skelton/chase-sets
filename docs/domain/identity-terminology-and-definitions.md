# Identity Terminology and Definitions

## Purpose
Define identity-specific terms not already canonicalized in `glossary.md`.

## Audience
- Engineers implementing auth and RBAC flows.
- AI agents documenting identity contracts.

## Scope
Identity covers authentication subjects, session behavior, and authorization context.

## Domain Terms
- **Actor**: effective subject performing an action.
- **Acting Context**: authorization scope (self or organization).
- **Credential**: proof used for authentication.
- **Session**: revocable authenticated interaction window.
- **Sensitive Action**: action requiring stronger verification.

## Boundaries
Identity owns authentication and authorization primitives. Identity does not own payment settlement, shipment execution, or marketplace matching.

## References
- `glossary.md`
- `identity-org-accounts-and-rbac.md`
- `identity-step-up-auth-and-sensitive-actions-policy.md`
