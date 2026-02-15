# Requirements

Related: `docs/product/PRD.md`, `docs/product/ACCEPTANCE_CRITERIA.md`, `docs/architecture/QUALITY_ATTRIBUTES.md`

## Functional Requirements

- FR-1: Users can register, authenticate, recover accounts, and add passkeys.
- FR-2: Sellers can create, update, and deactivate listings.
- FR-3: Buyers can search, browse, and submit offers.
- FR-4: System can produce a match and create an order.
- FR-5: Buyers can pay through Stripe-backed checkout.
- FR-6: Sellers can progress fulfillment with shipment metadata.
- FR-7: Platform can determine payout eligibility and release payouts.
- FR-8: Users and operations can open and manage disputes.

## Non-functional Requirements

- NFR-1: Event sourcing for core transactional domains.
- NFR-2: API idempotency for all mutating endpoints.
- NFR-3: End-to-end traceability via correlation IDs.
- NFR-4: Vendor-agnostic observability.
- NFR-5: Cloud-agnostic deployment artifacts.

## Constraints

- Search/index engine is OpenSearch for MVP (ADR 012).
- No explicit compliance certification target in initial scope.

## Product Principles (Canonical)

- Fair by default:
  - Fees, execution rules, and tradeoffs are transparent.
  - No hidden costs or deceptive ranking behavior.
  - Current fee posture: seller fee defaults to 5 percent per item; buyer-facing payment processing costs are explicit.
- Catalog truth over convenience:
  - Canonical catalog correctness outranks speed of ad hoc catalog edits.
  - Catalog changes are auditable.
- Fast to value:
  - New users should be able to search and complete a meaningful action quickly (target: under two minutes for core buy/sell paths).
- API-first platform:
  - The web app and external clients use the same platform API contracts.
  - No hidden capabilities for first-party clients.
  - Guardrails are required (pagination, rate limits, quotas, idempotency).
  - Assistant/agent clients are first-class external clients with explicit consent, scoped access, and strong auditability.
- Secure by design:
  - Minimize sensitive data storage and exposure.
  - High-risk actions require stronger controls and verifiable audit trails.
- OSS-first, container-first delivery:
  - Backend services and background workers run as OCI containers.
  - Web assets are CDN-served.
  - Prefer open-source infrastructure where it supports product and operational goals.
