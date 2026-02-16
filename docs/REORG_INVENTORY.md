# Reorganization Inventory

| Path | Title (H1) | Inferred purpose | Overlaps/duplication | Classification |
| --- | --- | --- | --- | --- |
| `AGENT.md` | Chase Sets Marketplace Agent Guide | supporting documentation | none significant | canonical |
| `CONTRIBUTING.md` | Contributing | supporting documentation | none significant | canonical |
| `docs/adrs/0001-initial-architecture.md` | ADR 0001: Initial Architecture | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/000-template.md` | ADR NNN: Title | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/001-payments-and-payouts.md` | ADR 001: Payments and Payouts | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/002-auth-and-account-recovery.md` | ADR 002: Authentication and Account Recovery | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/003-offers-listings-and-matching.md` | ADR 003: Offers, Listings, and Matching Model | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/004-config-driven-version-system.md` | ADR 004: Config-Driven Version System | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/005-event-sourcing-and-projections.md` | ADR 005: Event Sourcing and Projections | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/006-containers-cdn-and-oss-baseline.md` | ADR 006: Containers, CDN, and OSS Baseline | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/007-postgres-event-store.md` | ADR 007: Event Store Implementation (Postgres Event Streams) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/008-projector-consumption-no-broker.md` | ADR 008: Projector Consumption (No Separate Broker for MVP) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/009-ingress-nginx.md` | ADR 009: Kubernetes Ingress Controller (NGINX Ingress) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/010-shipping-easypost.md` | ADR 010: Shipping Integration Provider (EasyPost) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/011-typescript-e2e-stack.md` | ADR 011: Application Stack (TypeScript End-to-End) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/012-search-engine-mvp.md` | ADR 012: Search Engine for Catalog + SKU Facets | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/013-stripe-marketplace-model.md` | ADR 013: Stripe Marketplace Model (Connect + Checkout/Capture) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/014-shipping-rebate-cap.md` | ADR 014: Shipping Credit (5%) / Escrow Settlement | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/015-locations-and-inventory-scope.md` | ADR 015: Location-Scoped Inventory (Global as Projection) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/016-embedding-strategy.md` | ADR 016: Embedding Strategy (Semantic Search) | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/017-single-charge-multi-seller-split.md` | ADR 017: Single Buyer Charge (Checkout) With Multi-Seller Split | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/018-event-store-operability-and-retention.md` | ADR 018: Event Store Operability, Retention, and Idempotency | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/019-external-api-auth-and-agent-access.md` | ADR 019: External API Authentication and Agent Access | architecture decision record | overlaps decision topics; ADR numbering separates scope | supporting |
| `docs/adrs/README.md` | Architecture Decision Records | architecture decision record | overlaps index/navigation role | canonical |
| `docs/AGENT_GUIDE.md` | Agent Workflow Guide | supporting documentation | none significant | canonical |
| `docs/api/ERRORS.md` | API Error Usage | supporting documentation | none significant | supporting |
| `docs/api/SKILL.md` | API Playbook | agent playbook | none significant | supporting |
| `docs/api/WEBHOOKS.md` | Webhooks | supporting documentation | none significant | supporting |
| `docs/architecture/DEPLOYMENT_TOPOLOGY.md` | Deployment Topology | architecture design | none significant | supporting |
| `docs/architecture/QUALITY_ATTRIBUTES.md` | Quality Attributes | architecture design | none significant | supporting |
| `docs/architecture/README.md` | Architecture Docs | architecture design | overlaps index/navigation role | supporting |
| `docs/architecture/SYSTEM_OVERVIEW.md` | System Overview | architecture design | none significant | supporting |
| `docs/architecture/THREAT_MODEL.md` | Threat Model | architecture design | none significant | supporting |
| `docs/data/EVENT_STORE.md` | Event Store | data model guidance | none significant | supporting |
| `docs/data/READ_MODELS.md` | Read Models | data model guidance | none significant | supporting |
| `docs/data/SCHEMA_CONVENTIONS.md` | Schema Conventions | data model guidance | none significant | supporting |
| `docs/data/SCHEMA_ROLLOUT.md` | Schema Rollout | data model guidance | none significant | supporting |
| `docs/domain/BOUNDED_CONTEXTS.md` | Bounded Contexts | domain model or domain requirement | none significant | supporting |
| `docs/domain/catalog-governance-and-corrections.md` | 3.x Catalog Governance: Curation, Corrections, and Audit (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/catalog-mvp-version-keys-and-facets.md` | Catalog â€” MVP Version Modeling Conventions, Keys, and Facets | domain model or domain requirement | none significant | supporting |
| `docs/domain/catalog-terminology-and-definitions.md` | Catalog Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/catalog-version-identity-and-resolution.md` | Catalog â€” Version Identity, Version Path Normalization, and Resolution (MVP) | domain model or domain requirement | none significant | supporting |
| `docs/domain/catalog-version-model-examples.md` | Catalog â€” VersionModel Examples (Canonical, Doc-Only) | domain model or domain requirement | none significant | supporting |
| `docs/domain/catalog-version-system.md` | Version System (Config-Driven) | domain model or domain requirement | none significant | supporting |
| `docs/domain/DOMAIN_MODEL.md` | Domain Model | domain model or domain requirement | none significant | supporting |
| `docs/domain/EVENT_TAXONOMY.md` | Event Taxonomy | domain model or domain requirement | none significant | supporting |
| `docs/domain/fulfillment-locations-inventory-and-fulfillment-modes.md` | 3.x Locations, Inventory, and Fulfillment Modes | domain model or domain requirement | none significant | supporting |
| `docs/domain/fulfillment-modes-and-pickup-scope.md` | 3.x Fulfillment Modes and Pickup Scope (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/fulfillment-shipping-and-fulfillment-mvp.md` | 3.x Shipping & Fulfillment (MVP Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/fulfillment-terminology-and-definitions.md` | Fulfillment Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/glossary.md` | Domain Glossary | domain model or domain requirement | none significant | supporting |
| `docs/domain/identity-org-accounts-and-rbac.md` | 2.x Organization Accounts & RBAC (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/identity-step-up-auth-and-sensitive-actions-policy.md` | 5.x Step-Up Authentication and Sensitive Actions Policy (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/identity-terminology-and-definitions.md` | Identity Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/marketplace-domain-model.md` | Marketplace Domain â€” Domain Model (Documentation) | domain model or domain requirement | none significant | supporting |
| `docs/domain/marketplace-scope-and-model.md` | Marketplace Domain â€” Scope & Model (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/marketplace-terminology-and-definitions.md` | Marketplace Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/orders-scope-and-lifecycle.md` | Orders Domain â€” Scope & Lifecycle | domain model or domain requirement | none significant | supporting |
| `docs/domain/orders-terminology-and-definitions.md` | Orders Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/payments-disputes-refunds-chargebacks-and-ledger-unwind.md` | 3.x Disputes, Refunds, Chargebacks, and Ledger Unwind (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/payments-money-math-fees-shipping-credit-and-ledger-invariants.md` | 4.x Money Math: Fees, Shipping Credit, Allocations, and Ledger Invariants (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/payments-seller-onboarding-kyc-tax-and-payout-gating.md` | 5.x Seller Onboarding, KYC/KYB, Tax, and Payout Gating (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/payments-terminology-and-definitions.md` | Payments Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/README.md` | Domain Docs | domain model or domain requirement | overlaps index/navigation role | canonical |
| `docs/domain/reputation-scope-and-model.md` | Reputation Domain â€” Scope & Model (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/reputation-terminology-and-definitions.md` | Reputation Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/search-filtering-requirements.md` | 3.x Search & Filtering (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/search-relevance-evaluation-and-golden-queries.md` | 3.x Search Relevance Evaluation and Golden Query Set (Requirements) | domain model or domain requirement | none significant | supporting |
| `docs/domain/search-terminology-and-definitions.md` | Search Terminology and Definitions | domain model or domain requirement | overlaps with `docs/domain/glossary.md` by design; scoped terms only | supporting |
| `docs/domain/SKILL.md` | Domain Modeling Playbook | domain model or domain requirement | none significant | supporting |
| `docs/domain/STATE_MACHINES.md` | State Machines | domain model or domain requirement | none significant | supporting |
| `docs/engineering/CODING_STANDARDS.md` | Coding Standards | engineering standard | none significant | supporting |
| `docs/engineering/OBSERVABILITY.md` | Observability | engineering standard | none significant | supporting |
| `docs/engineering/OWNERSHIP_AND_SUPPORT.md` | Ownership and Support | engineering standard | none significant | supporting |
| `docs/engineering/RELEASES.md` | Releases | engineering standard | none significant | supporting |
| `docs/engineering/SECURITY.md` | Security | engineering standard | none significant | supporting |
| `docs/engineering/TEST_STRATEGY.md` | Test Strategy | engineering standard | none significant | supporting |
| `docs/environment-variables.md` | Environment Variables | supporting documentation | none significant | supporting |
| `docs/events/SKILL.md` | Events Playbook | agent playbook | none significant | supporting |
| `docs/planning/DEFINITION_OF_DONE.md` | Definition Of Done | planning artifact | none significant | supporting |
| `docs/planning/DEFINITION_OF_READY.md` | Definition Of Ready | planning artifact | none significant | supporting |
| `docs/planning/EPICS.md` | Epics | planning artifact | none significant | supporting |
| `docs/planning/ROADMAP.md` | Roadmap | planning artifact | none significant | supporting |
| `docs/planning/STORIES_TEMPLATE.md` | Story Template | planning artifact | none significant | supporting |
| `docs/product/ACCEPTANCE_CRITERIA.md` | Acceptance Criteria | product requirements | none significant | supporting |
| `docs/product/PRD.md` | Product Requirements Document (PRD) | product requirements | none significant | supporting |
| `docs/product/REQUIREMENTS.md` | Requirements | product requirements | none significant | supporting |
| `docs/product/USER_FLOWS.md` | User Flows | product requirements | none significant | supporting |
| `docs/README.md` | Documentation Index | docs entry point | none significant | canonical |
| `docs/REORG_INVENTORY.md` | Reorganization Inventory | supporting documentation | none significant | supporting |
| `docs/runbooks/README.md` | Runbooks | operations runbook | overlaps index/navigation role | supporting |
| `docs/setup.md` | Setup | supporting documentation | none significant | supporting |
| `docs/standards/errors.md` | Error Standard | engineering standard | none significant | supporting |
| `docs/standards/testing.md` | Testing Standard | engineering standard | none significant | supporting |
| `docs/standards/versioning.md` | Versioning Standard | engineering standard | none significant | supporting |
| `infra/SKILL.md` | Infrastructure Playbook | agent playbook | none significant | supporting |
| `README.md` | Chase Sets Marketplace | repo entry | none significant | canonical |
| `services/accounts/AGENT.md` | Accounts Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `services/catalog/AGENT.md` | Catalog Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `services/integrations/AGENT.md` | Integrations Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `services/listings/AGENT.md` | Listings Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `services/orders/AGENT.md` | Orders Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `services/README.md` | Services Documentation | service docs index/contract | overlaps index/navigation role | supporting |
| `services/search/AGENT.md` | Search Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `services/SERVICE_GUIDE_CONTRACT.md` | Service Guide Contract | service docs index/contract | none significant | supporting |
| `services/shipping/AGENT.md` | Shipping Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `services/trust-safety/AGENT.md` | Trust-Safety Service Guide | service-local guide | overlaps global agent guidance; service scope only | supporting |
| `SKILL.md` | Chase Sets Marketplace Skill Index | agent playbook | none significant | supporting |

## Removed During Reorganization

| Path | Title (H1) | Inferred purpose | Overlaps/duplication | Classification |
| --- | --- | --- | --- | --- |
| `.ai/PROJECT_BRIEF.md` | Project Brief | agent summary | duplicated canonical product docs | remove |
| `.ai/CONTEXT_INDEX.md` | Context Index | agent navigation index | duplicated docs index | remove |
| `.ai/DECISIONS.md` | Decisions | compact decisions summary | duplicated ADR index and ADRs | remove |
| `.ai/GLOSSARY.md` | Glossary | compact glossary alias | duplicated domain glossary | remove |
| `.ai/CONVENTIONS.md` | Conventions | compact conventions summary | duplicated standards docs | remove |
| `domains/README.md` | Domains | secondary domain index | duplicated `docs/domain/README.md` | remove |
| `domains/*/README.md` | <domain> Domain | per-domain local indexes | duplicated centralized domain index | remove |
