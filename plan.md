# New Technology Product – Core Context Artifacts

This document defines the **core artifacts** required to provide shared context, alignment, and decision clarity when building a brand-new technology product. These artifacts are intentionally outcome-focused and designed to scale with team size and product maturity.

---

## 1. Product & Business Context (Why This Exists)

### 1.1 Product Vision & Narrative

**Purpose:** Establish a shared mental model of the product’s future state.

**Should Answer:**

- What problem are we solving, for whom, and why now?
- What does success look like in 1–3 years?
- What is explicitly out of scope?

**Format:**

- 1–2 page narrative (PR/FAQ style recommended)

**Outcome:**

- Teams can independently evaluate tradeoffs without constant escalation.

---

### 1.2 Value Proposition & Differentiation

**Purpose:** Anchor technical and product decisions in market reality.

**Should Include:**

- Ranked value propositions
- Differentiators vs alternatives
- Explicit tradeoffs and non-goals

**Outcome:**

- Prevents gold-plating and unfocused abstraction.

---

### 1.3 Success Metrics & Guardrails

**Purpose:** Define how success and correctness are measured.

**Should Include:**

- North-star metric
- Leading indicators
- Constraints (latency, cost, scale, compliance)

**Outcome:**

- Teams optimize for outcomes, not activity.

---

## 2. User & Domain Understanding (What Problem Space We’re In)

### 2.1 User Personas & Primary Journeys

**Purpose:** Ground development in real user behavior.

**Should Include:**

- Primary personas
- Core user journeys
- Critical moments (onboarding, failure, recovery)

**Outcome:**

- Engineers understand intent behind workflows.

---

### 2.2 Domain Model & Ubiquitous Language

**Purpose:** Create a shared vocabulary across disciplines.

**Should Include:**

- Core domain concepts
- Definitions and relationships
- Canonical naming

**Format:**

- Glossary + simple diagrams

**Outcome:**

- Prevents semantic drift and API mismatch.

---

## 3. Product Definition (What We’re Building First)

### 3.1 Product Principles

**Purpose:** Act as decision filters during tradeoffs.

**Examples:**

- Fast over complete
- Opinionated defaults
- Secure by design

**Outcome:**

- Consistent decisions without centralized approval.

---

### 3.2 MVP / Phase Plan

**Purpose:** Prevent scope creep and over-engineering.

**Should Include:**

- Phase 0 / MVP scope
- Explicit exclusions
- Learning goals per phase

**Outcome:**

- Focus on validation before optimization.

---

### 3.3 Outcome-Based Requirements

**Purpose:** Define _what must be true_, not how to implement it.

**Format:**

- Capability statements
- System-level acceptance criteria

**Outcome:**

- Preserves engineering autonomy.

---

## 4. Technical Context (How It Works)

### 4.1 System Architecture Overview

**Purpose:** Provide a shared mental map of the system.

**Should Include:**

- Major components
- Data flows
- Integration boundaries
- Trust and security zones

**Format:**

- Single diagram + narrative

**Outcome:**

- Engineers can reason about impact and dependencies.

---

### 4.2 Architecture Decision Records (ADRs)

**Purpose:** Capture the rationale behind key decisions.

**Template:**

- Context
- Options considered
- Decision
- Tradeoffs

**Outcome:**

- Prevents re-litigation and knowledge loss.

---

### 4.3 Data & Event Model

**Purpose:** Treat data as a first-class concern.

**Should Include:**

- Core entities and relationships
- Events and state transitions
- Ownership boundaries

**Outcome:**

- Avoids accidental coupling and schema chaos.

---

### 4.4 Non-Functional Requirements

**Purpose:** Avoid costly architectural rework later.

**Should Include:**

- Scalability assumptions
- Performance targets
- Availability and reliability goals
- Security and compliance needs

**Outcome:**

- Informs correct architectural choices early.

---

## 5. Execution & Operating Model (How We Build)

### 5.1 Development Principles & Standards

**Purpose:** Reduce friction and inconsistency.

**Should Include:**

- Coding standards
- Testing philosophy
- API and versioning rules
- Documentation expectations

**Outcome:**

- Faster onboarding and fewer debates.

---

### 5.2 Delivery & Release Model

**Purpose:** Align expectations around change.

**Should Include:**

- Environments
- Deployment cadence
- Feature flag strategy
- Rollback expectations

**Outcome:**

- Predictable releases with lower operational risk.

---

### 5.3 Ownership & Responsibility Model

**Purpose:** Eliminate ambiguity in decision-making.

**Should Include:**

- Service ownership
- On-call expectations
- Decision authorities

**Outcome:**

- Fewer bottlenecks and escalations.

---

## 6. Living Artifacts

These artifacts must evolve with the product:

- Product roadmap
- Architecture diagrams
- Domain glossary
- ADRs
- Metrics dashboards

Stale artifacts become liabilities.

---

## Minimum Viable Artifact Set (Ruthless Version)

If constrained, start with:

1. Product vision narrative
2. Domain model & glossary
3. MVP scope & non-goals
4. System architecture diagram
5. ADRs for major decisions
6. Success metrics & constraints

Everything else can grow organically.

---

# Chase Sets — Build Readiness & Implementation TODOs

This section is the actionable backlog for starting implementation.

## 0) Navigation

- Cross-cutting docs: [artifacts/README.md](artifacts/README.md)
- Domain drill-down: [domains/README.md](domains/README.md)
- ADRs: [artifacts/adrs/README.md](artifacts/adrs/README.md)
- MVP backlog (initiatives/epics/stories/tasks): [artifacts/21-initiatives-epics-stories-and-tasks.md](artifacts/21-initiatives-epics-stories-and-tasks.md)

## 1) Gate: High-level items are accounted for

These should be “good enough” before deep domain implementation.

- [ ] Vision and non-goals are stable enough for MVP: [artifacts/01-product-vision.md](artifacts/01-product-vision.md), [artifacts/03-mvp-scope-and-non-goals.md](artifacts/03-mvp-scope-and-non-goals.md)
- [ ] Glossary + SKU identity rules are stable: [artifacts/02-domain-model-and-glossary.md](artifacts/02-domain-model-and-glossary.md)
- [ ] Architecture overview reflects current ADRs: [artifacts/04-system-architecture-overview.md](artifacts/04-system-architecture-overview.md)
- [ ] Multi-channel posture is documented (even though MVP is marketplace-only): [artifacts/17-channels-and-integrations-architecture.md](artifacts/17-channels-and-integrations-architecture.md)
- [ ] MVP workflows are stitched end-to-end (doc-first): [artifacts/18-mvp-workflows-and-event-flows.md](artifacts/18-mvp-workflows-and-event-flows.md)
- [ ] Cross-cutting MVP decisions are captured (to unblock implementation): [artifacts/19-mvp-decisions-to-lock.md](artifacts/19-mvp-decisions-to-lock.md)
- [ ] MVP problem statements + user stories are written (implementation-ready): [artifacts/20-mvp-problem-statements-and-user-stories.md](artifacts/20-mvp-problem-statements-and-user-stories.md)
- [ ] NFR/SLO/scale targets are acceptable for MVP: [artifacts/10-non-functional-requirements.md](artifacts/10-non-functional-requirements.md), [artifacts/26-observability-slos-audit-and-incident-response.md](artifacts/26-observability-slos-audit-and-incident-response.md), [artifacts/30-scale-targets-and-capacity-planning.md](artifacts/30-scale-targets-and-capacity-planning.md)
- [ ] Privacy retention/export/deletion posture is acceptable: [artifacts/27-data-privacy-retention-export-and-deletion.md](artifacts/27-data-privacy-retention-export-and-deletion.md)
- [ ] Legal/policy posture is acceptable for launch: [artifacts/29-legal-policies-and-versioning.md](artifacts/29-legal-policies-and-versioning.md)

## 2) Decisions to lock (blockers for building)

- [ ] Answer cross-cutting policy decisions: [artifacts/19-mvp-decisions-to-lock.md](artifacts/19-mvp-decisions-to-lock.md)
- [ ] Record Stripe validation evidence (even though ADR 013 is Accepted as MVP posture): [artifacts/adrs/013-stripe-marketplace-model.md](artifacts/adrs/013-stripe-marketplace-model.md)
- [ ] Run golden-query evaluation and record evidence (ADR 016): [artifacts/adrs/016-embedding-strategy.md](artifacts/adrs/016-embedding-strategy.md)
- [ ] Confirm replay/side-effects + retention contract is implemented as specified (ADR 018): [artifacts/adrs/018-event-store-operability-and-retention.md](artifacts/adrs/018-event-store-operability-and-retention.md)
- [ ] Lock external API posture for AI agents (MVP: read-only search/browse; Phase 1+: delegated access) (ADR 019 / D10): [artifacts/adrs/019-external-api-auth-and-agent-access.md](artifacts/adrs/019-external-api-auth-and-agent-access.md)

## 3) Repo scaffolding TODOs (first code)

Create only what we need to start slicing the MVP:

- [x] Create repo skeleton: `apps/`, `packages/`, `infra/` (docs-only until code starts)
- [ ] Add workspace tooling baseline (formatter/linter/test runner) per [artifacts/11-development-standards.md](artifacts/11-development-standards.md)
- [ ] Define a minimal service boundary set for MVP:
  - `apps/api` (HTTP)
  - `apps/web` (UI)
  - `apps/workers` (projectors/background)
- [ ] Define shared packages:
  - `packages/shared` (ids, time, event envelope)
  - `packages/config` (variant schemas, validation)

## 4) Domain drill-down TODOs (what to build)

### Marketplace (highest priority)

- [ ] Track drill-down tasks: [domains/marketplace/docs/00-todo.md](domains/marketplace/docs/00-todo.md)
- [ ] Flesh out events/commands/invariants for bids, listings, matching: [domains/marketplace/docs/01-marketplace-scope-and-model.md](domains/marketplace/docs/01-marketplace-scope-and-model.md)
- [ ] Define time-in-force + cancellation policy (MVP)
- [ ] Define the trade execution payload to Orders (TradeExecuted / MatchCreated)

### Orders (Checkout + Order lifecycle)

- [ ] Track drill-down tasks: [domains/orders/docs/00-todo.md](domains/orders/docs/00-todo.md)
- [ ] Define checkout/order lifecycle + contracts: [domains/orders/docs/01-orders-scope-and-lifecycle.md](domains/orders/docs/01-orders-scope-and-lifecycle.md)
- [ ] Define split policy (seller vs location) and cancellation/timeouts (MVP)
- [ ] Define boundaries with Payments and Fulfillment (events + idempotency)

### Payments

- [ ] Track drill-down tasks: [domains/payments/docs/00-todo.md](domains/payments/docs/00-todo.md)
- [ ] Validate wallet/ledger invariants are implementable: [domains/payments/docs/31-money-math-fees-shipping-credit-and-ledger-invariants.md](domains/payments/docs/31-money-math-fees-shipping-credit-and-ledger-invariants.md)
- [ ] Define Stripe webhook-to-event mapping + reconciliation story (doc-first)
- [ ] Define dispute/refund unwind mechanics as events (doc-first): [domains/payments/docs/21-disputes-refunds-chargebacks-and-ledger-unwind.md](domains/payments/docs/21-disputes-refunds-chargebacks-and-ledger-unwind.md)

### Fulfillment

- [ ] Track drill-down tasks: [domains/fulfillment/docs/00-todo.md](domains/fulfillment/docs/00-todo.md)
- [ ] Define shipment splitting + label purchasing event flow
- [ ] Define address handling boundaries (PII posture + references)

### Catalog

- [ ] Track drill-down tasks: [domains/catalog/docs/00-todo.md](domains/catalog/docs/00-todo.md)
- [ ] Confirm variant model schema and validation rules: [domains/catalog/docs/15-variant-system.md](domains/catalog/docs/15-variant-system.md)
- [ ] Confirm catalog correction/audit workflow: [domains/catalog/docs/24-catalog-governance-and-corrections.md](domains/catalog/docs/24-catalog-governance-and-corrections.md)

### Search

- [ ] Track drill-down tasks: [domains/search/docs/00-todo.md](domains/search/docs/00-todo.md)
- [ ] Confirm analyzers/fields/facets requirements: [domains/search/docs/19-search-and-filtering-requirements.md](domains/search/docs/19-search-and-filtering-requirements.md)
- [ ] Extend golden query set with expected real launch queries: [domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md](domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md)

### Identity / Risk / Trust & Safety

- [ ] Track drill-down tasks: [domains/identity/docs/00-todo.md](domains/identity/docs/00-todo.md)
- [ ] Track drill-down tasks: [domains/risk/docs/00-todo.md](domains/risk/docs/00-todo.md)
- [ ] Track drill-down tasks: [domains/trust-safety/docs/00-todo.md](domains/trust-safety/docs/00-todo.md)
- [ ] Confirm step-up and sensitive actions policy hooks are complete: [domains/identity/docs/32-step-up-auth-and-sensitive-actions-policy.md](domains/identity/docs/32-step-up-auth-and-sensitive-actions-policy.md)
- [ ] Confirm hold/velocity enforcement points are explicit in domain flows: [domains/risk/docs/22-fraud-abuse-and-risk-controls.md](domains/risk/docs/22-fraud-abuse-and-risk-controls.md)
- [ ] Confirm enforcement events and evidence handling boundaries: [domains/trust-safety/docs/23-trust-safety-counterfeit-and-enforcement.md](domains/trust-safety/docs/23-trust-safety-counterfeit-and-enforcement.md)

## 5) MVP vertical slices (recommended build order)

- [ ] Slice 1: Catalog browse/search → item detail → SKU resolution (no checkout) — [artifacts/22-slice-1-catalog-discovery.md](artifacts/22-slice-1-catalog-discovery.md)
- [ ] Slice 2: Create listing/bid → view SKU order book (no payment)
- [ ] Slice 3: Match execution → order created (no payment capture)
- [ ] Slice 4: Checkout/payment capture → ledger allocation → seller proceeds
- [ ] Slice 5: Shipping label purchase → tracking updates → delivery completion
- [ ] Slice 6: Refund flow + unwind + admin tooling hooks
