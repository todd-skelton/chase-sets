# 4.9 MVP Backlog: Initiatives → Epics → Stories → Tasks

## Purpose

This document is the **execution-ready backlog** for Chase Sets MVP.

It translates:

- **Problem statements + user stories** into a work breakdown: [20-mvp-problem-statements-and-user-stories.md](20-mvp-problem-statements-and-user-stories.md)
- **End-to-end workflows** into cross-domain epics: [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)
- **Policies/guardrails** into explicit tasks: [19-mvp-decisions-to-lock.md](19-mvp-decisions-to-lock.md)

This is intentionally “breadth-first”: it favors thin vertical slices that prove end-to-end flow over deep optimization.

---

## How to use

- Treat **Initiatives** as the “why / outcome”.
- Treat **Epics** as the “what slice / deliverable”.
- Treat **Stories** as the “user-facing behavior” (with acceptance criteria).
- Treat **Tasks** as the “engineering work items” that produce the slice.

Where details belong:

- Cross-cutting backlog lives here (under `artifacts/`).
- Domain-specific breakdowns and deeper checklists live under `domains/<domain>/docs/00-todo.md`.

---

## Conventions

### ID scheme

- Initiative: `INI-XX`
- Epic: `EP-<AREA>-XX`
- Story: `US-<FLOW>-X.Y` (references the canonical stories in the MVP stories doc)
- Task: `T-<AREA>-NNN`

### Status

Use one of: `Proposed`, `Ready`, `In Progress`, `Blocked`, `Done`.

### Definition of Ready (DoR)

A story/epic is **Ready** when:

- Acceptance criteria exists (or is linked).
- Domain boundaries are known (which app/domain owns it).
- External dependencies are explicit (Stripe/EasyPost/OpenSearch).

### Definition of Done (DoD)

A story/epic is **Done** when:

- A happy-path flow works end-to-end in local dev.
- Observability exists at least at “MVP baseline” (logs + basic metrics) where appropriate.
- Idempotency/replay posture is not violated (event-sourced guarantees).

---

## Initiatives (MVP)

### INI-01 — Product discovery that resolves a stable SKU

**Problem addressed:** “Variant-heavy catalog makes it hard to buy confidently.”

**Outcome:** a user can search → open item detail → select variant path → get a deterministic `skuId`.

**Primary workflow:** #1 in [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)

**Epics:**

- EP-DISC-01 Search and result quality
- EP-DISC-02 Item detail + variant selector + SKU resolve
- EP-DISC-03 Catalog governance minimums (admin edits/corrections)

Slice spec:

- [22-slice-1-catalog-discovery.md](22-slice-1-catalog-discovery.md)

---

### INI-02 — Marketplace listing + offer lifecycle, visible to users

**Problem addressed:** “Selling is high friction without trustworthy listing workflows.”

**Outcome:** sellers can list; buyers can offer; both can cancel; market view renders.

**Primary workflows:** #2 and #3 in [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)

**Epics:**

- EP-MKT-01 Listing lifecycle (reserve-at-listing)
- EP-MKT-02 Offer lifecycle (standing offers)
- EP-MKT-03 Market view projections (order book / recent sales)

---

### INI-03 — Deterministic matching that hands off to Orders

**Problem addressed:** “Trust is fragile” + “multi-seller checkout is complex” (the handoff must be audit-friendly).

**Outcome:** crossing triggers deterministic executions; emits `TradeExecuted` idempotently.

**Primary workflow:** #4 in [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)

**Epics:**

- EP-MATCH-01 Matching engine determinism + self-trade prevention
- EP-MATCH-02 Trade execution event contract to Orders

---

### INI-04 — Checkout submit → payment → ledger allocation

**Problem addressed:** “Multi-seller checkout is inherently complex.”

**Outcome:** buyer pays once; payment captured on submit; ledger allocates per seller; system never ends up in stuck ambiguous states.

**Primary workflow:** #5 in [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)

**Epics:**

- EP-ORD-01 Checkout state machine + timeouts
- EP-PAY-01 Single charge + multi-seller allocation (Stripe posture)
- EP-PAY-02 Refund/dispute unwind primitives (admin hooks)

---

### INI-05 — Shipping + delivery confirmation gates withdrawability

**Problem addressed:** “Selling requires reliable fulfillment + payout rules.”

**Outcome:** shipments exist per seller/origin; label purchase is replay-safe; delivery confirmation unblocks withdrawability.

**Primary workflow:** #6 in [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)

**Epics:**

- EP-FUL-01 Inventory reservation + shipment creation
- EP-FUL-02 Label purchase + tracking updates (EasyPost)
- EP-PAY-03 Payout gating policy (delivery confirmed)

---

## Epics (with stories + tasks)

Each epic below includes:

- **Stories**: canonical user stories that define acceptance criteria
- **Tasks**: work items to build the slice

If a task is domain-specific, prefer to copy it into the relevant domain checklist under `domains/<domain>/docs/00-todo.md` and keep only the cross-cutting pointer here.

---

### EP-DISC-01 — Search and result quality

**Status:** Proposed

Slice spec: [22-slice-1-catalog-discovery.md](22-slice-1-catalog-discovery.md)

**Stories**

- `US-DISC-1.1`: Search by identifiers (Story 1.1)
- `US-DISC-1.2`: Natural language discovery (Story 1.2)

**Tasks**

- [ ] T-SEARCH-001 Define MVP index mappings + analyzers (Search)
- [ ] T-SEARCH-002 Define identifier query parsing rules (Search)
- [ ] T-SEARCH-003 Define hybrid scoring behavior and “exact match guardrails” (Search)
- [ ] T-SEARCH-004 Define the config-driven facet/filter schema (Config package)
- [ ] T-SEARCH-005 Define golden query set + acceptance thresholds (Search)
- [ ] T-API-001 Draft `GET /search` contract (API)
- [ ] T-WORK-001 Define projection → indexer flow and replay-safe indexing posture (Workers)

References:

- Search TODOs: [../domains/search/docs/00-todo.md](../domains/search/docs/00-todo.md)
- Search requirements: [../domains/search/docs/19-search-and-filtering-requirements.md](../domains/search/docs/19-search-and-filtering-requirements.md)

---

### EP-DISC-02 — Item detail + variant selector + SKU resolve

**Status:** Proposed

Slice spec: [22-slice-1-catalog-discovery.md](22-slice-1-catalog-discovery.md)

**Stories**

- `US-DISC-1.3`: Deterministic SKU selection (Story 1.3)

**Tasks**

- [ ] T-CAT-001 Confirm canonical variant schema + validation rules (Catalog)
- [ ] T-CAT-002 Define `VariantPath` normalization rules (Catalog)
- [ ] T-CAT-003 Define deterministic SKU identity + resolution rules (Catalog)
- [ ] T-WEB-001 Define the variant selector UX requirements and failure states (Web)
- [ ] T-API-003 Draft `GET /catalog/items/{catalogItemId}` contract (API)
- [ ] T-API-004 Draft `POST /skus/resolve` contract (API)
- [ ] T-WORK-002 Define catalog public-view projection shape (Workers)

References:

- Catalog TODOs: [../domains/catalog/docs/00-todo.md](../domains/catalog/docs/00-todo.md)
- Variant system: [../domains/catalog/docs/15-variant-system.md](../domains/catalog/docs/15-variant-system.md)

---

### EP-MKT-01 — Listing lifecycle (reserve-at-listing)

**Status:** Proposed

**Stories**

- `US-MKT-2.2`: Create listing reserves inventory (Story 2.2)
- `US-MKT-2.3`: Listings are standing until canceled (Story 2.3)

**Tasks**

- [ ] T-MKT-001 Confirm aggregate boundaries (Listing, Bid/Offer, projections) (Marketplace)
- [ ] T-FUL-001 Define ReserveInventoryForListing contract and failure codes (Fulfillment)
- [ ] T-MKT-002 Define cancellation race handling (cancel vs match) (Marketplace)

References:

- Marketplace TODOs: [../domains/marketplace/docs/00-todo.md](../domains/marketplace/docs/00-todo.md)
- Decision D1: [19-mvp-decisions-to-lock.md](19-mvp-decisions-to-lock.md)

---

### EP-MKT-02 — Offer lifecycle (standing offers)

**Status:** Proposed

**Stories**

- `US-MKT-3.1`: Place an offer (Story 3.1)
- `US-MKT-3.2`: No funds hold at offer creation (Story 3.2)

**Tasks**

- [ ] T-MKT-003 Define offer placement and cancellation policy + idempotency keys (Marketplace)
- [ ] T-RISK-001 Identify risk hooks for offer spam/velocity without polluting core matching (Risk)

---

### EP-MKT-03 — Market view projections

**Status:** Proposed

**Stories**

- Supports: “Users can view all offers and listings for a SKU” (Decision D9 / workflow requirements)

**Tasks**

- [ ] T-MKT-004 Define SKU market view projection shape (Marketplace)
- [ ] T-MKT-005 Define “my open orders/offers/listings” projection shape (Marketplace)

---

### EP-MATCH-01 — Matching determinism + self-trade prevention

**Status:** Proposed

**Stories**

- `US-MATCH-4.1`: Deterministic matching (Story 4.1)
- `US-MATCH-4.2`: Resting order sets price (Story 4.2)

**Tasks**

- [ ] T-MATCH-001 Specify price-time priority tie-breakers precisely (Marketplace)
- [ ] T-MATCH-002 Specify self-trade prevention rule and identifiers (Marketplace/Identity)
- [ ] T-MATCH-003 Define match idempotency key strategy (executionId) (Marketplace)

---

### EP-MATCH-02 — Trade execution event contract to Orders

**Status:** Proposed

**Stories**

- Supports: `TradeExecuted` handoff to Orders (workflow #4)

**Tasks**

- [ ] T-MATCH-004 Define `TradeExecuted` payload fields (Marketplace → Orders)
- [ ] T-ORD-001 Define `CreateCheckoutFromTrades` contract and idempotency strategy (Orders)

---

### EP-ORD-01 — Checkout state machine + timeouts

**Status:** Proposed

**Stories**

- `US-ORD-5.2`: Funds hold at checkout submit (Story 5.2)
- `US-ORD-5.4`: Offer acceptance requires timely checkout (Story 5.4)

**Tasks**

- [ ] T-ORD-002 Define Checkout and Order state transitions (Orders)
- [ ] T-ORD-003 Define timeout/unwind events and notification intents (Orders)

References:

- Orders TODOs: [../domains/orders/docs/00-todo.md](../domains/orders/docs/00-todo.md)

---

### EP-PAY-01 — Single charge + multi-seller allocation

**Status:** Proposed

**Stories**

- `US-PAY-5.1`: Single buyer charge, multi-seller allocation (Story 5.1)

**Tasks**

- [ ] T-PAY-001 Capture Stripe validation evidence and constraints (Payments)
- [ ] T-PAY-002 Define ledger allocation event model + invariants (Payments)

References:

- Payments TODOs: [../domains/payments/docs/00-todo.md](../domains/payments/docs/00-todo.md)
- Stripe ADR: [adrs/013-stripe-marketplace-model.md](adrs/013-stripe-marketplace-model.md)

---

### EP-FUL-01 — Inventory reservation + shipment creation

**Status:** Proposed

**Stories**

- `US-FUL-6.1`: Create shipments per seller/origin (Story 6.1)

**Tasks**

- [ ] T-FUL-002 Define shipment creation events and references (Fulfillment)
- [ ] T-FUL-003 Define PII posture for addresses (references vs inline) (Fulfillment/Privacy)

References:

- Fulfillment TODOs: [../domains/fulfillment/docs/00-todo.md](../domains/fulfillment/docs/00-todo.md)

---

## Task templates (copy/paste)

### Initiative template

- **Problem:**
- **Outcome:**
- **Success metric(s):**
- **Non-goals:**
- **Epics:**

### Epic template

- **Status:**
- **Why now:**
- **Scope:**
- **Out of scope:**
- **Stories (links):**
- **Tasks:**
- **Dependencies:**
- **Acceptance check:** “how we know it’s working locally”
