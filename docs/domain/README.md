---
owner: docs
status: active
audience: all
last_reviewed: 2026-02-16
---

# Domain Docs

## Purpose
- Define canonical domain modeling docs for shared concepts.
- Index domain-specific requirement docs by bounded context.
- Centralize lifecycle and terminology ownership in one location.

## Scope / Non-scope
- In scope: glossary, bounded contexts, events, state-machine index, and context-specific requirement docs.
- Non-scope: service implementation details.

## Start Here
1. [Glossary](glossary.md)
2. [Bounded Contexts](BOUNDED_CONTEXTS.md)
3. [Domain Model](DOMAIN_MODEL.md)
4. [Event Taxonomy](EVENT_TAXONOMY.md)
5. [State Machines](STATE_MACHINES.md)

## Domain Requirement Docs
- Catalog: [Terminology](catalog-terminology-and-definitions.md), [Version Identity and Resolution](catalog-version-identity-and-resolution.md), [MVP Version Keys and Facets](catalog-mvp-version-keys-and-facets.md), [Version Model Examples](catalog-version-model-examples.md), [Version System](catalog-version-system.md), [Governance and Corrections](catalog-governance-and-corrections.md)
- Marketplace: [Terminology](marketplace-terminology-and-definitions.md), [Scope and Model](marketplace-scope-and-model.md), [Domain Model](marketplace-domain-model.md)
- Orders: [Terminology](orders-terminology-and-definitions.md), [Scope and Lifecycle](orders-scope-and-lifecycle.md)
- Payments: [Terminology](payments-terminology-and-definitions.md), [Money Math and Ledger Invariants](payments-money-math-fees-shipping-credit-and-ledger-invariants.md), [Disputes and Unwind](payments-disputes-refunds-chargebacks-and-ledger-unwind.md), [Onboarding and Payout Gating](payments-seller-onboarding-kyc-tax-and-payout-gating.md)
- Fulfillment: [Terminology](fulfillment-terminology-and-definitions.md), [Shipping and Fulfillment MVP](fulfillment-shipping-and-fulfillment-mvp.md), [Locations and Fulfillment Modes](fulfillment-locations-inventory-and-fulfillment-modes.md), [Fulfillment Modes and Pickup Scope](fulfillment-modes-and-pickup-scope.md)
- Identity: [Terminology](identity-terminology-and-definitions.md), [Org Accounts and RBAC](identity-org-accounts-and-rbac.md), [Step-Up Auth Policy](identity-step-up-auth-and-sensitive-actions-policy.md)
- Search: [Terminology](search-terminology-and-definitions.md), [Search and Filtering Requirements](search-filtering-requirements.md), [Relevance Evaluation and Golden Queries](search-relevance-evaluation-and-golden-queries.md)
- Reputation: [Terminology](reputation-terminology-and-definitions.md), [Scope and Model](reputation-scope-and-model.md)

## Rules
- New business terms must be added to `glossary.md`.
- Cross-context handoffs must be modeled as explicit events.
- Aggregate invariants must be explicit and testable.

## Related docs
- `../architecture/README.md`
- `../product/REQUIREMENTS.md`
- `../../services/README.md`

## Next steps
- Add concise state transition tables in context-owned files as requirements stabilize.
- Promote stable requirements to contract-level API/data docs during implementation.
