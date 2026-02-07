# 4.x Scale Targets and Capacity Planning (Requirements)

## Purpose

Define initial scale targets and capacity planning guardrails so we can:

- Size Postgres (event store + projections) and OpenSearch appropriately
- Avoid accidental overload (rate limits, backpressure, feature flags)
- Set realistic SLOs (ties to observability artifact)

This is cross-cutting and requirements-only (no implementation).

---

## Goals

- Establish **first-90-day** and **12-month** scale assumptions.
- Identify bottlenecks and operational guardrails before writing code.
- Make tradeoffs explicit (cost vs latency vs freshness).

## Non-goals

- A full performance test plan (can be added later).
- Premature micro-optimization.

---

## Key workloads to size

### 1) Read workloads (user-facing)

- Catalog search and browse
- SKU/order book views (bids/listings)
- Item details pages
- Checkout initiation and status views
- Buyer/seller dashboards

### 2) Write workloads (event streams)

- Listing/bid creation and updates
- Match creation (execution)
- Checkout creation + payment lifecycle events
- Shipment lifecycle updates
- Admin/support actions (takedowns, holds, refunds)

### 3) Background workloads (projections)

- Projectors building:
  - order books
  - search indexes
  - wallet/ledger balances
  - shipment status views
  - admin/support case views

---

## Scale targets (fill in)

### First 90 days (targets)

- Active users/day (DAU): 500 (proposed)
- Active sellers/day: 50 (proposed)
- New listings/day: 500 (proposed)
- Bid updates/day: 1,000 (proposed)
- Checkouts/day: 50 (proposed)
- Orders/day: 80 (proposed)
- Shipments/day: 100 (proposed)

### 12 months (targets)

- DAU: 10,000 (proposed)
- Orders/day: 1,500 (proposed)
- Listings total: 1,000,000 (proposed)
- Bids total: 200,000 (proposed)

### Peak assumptions

Define peaks (not averages):

- Peak read QPS: 50 (proposed)
- Peak write events/sec: 20 (proposed)
- Peak projector throughput needed (events/sec): 50 (proposed)

---

## Latency, freshness, and backpressure budgets

### Latency budgets (targets)

- Search API P95: <= 500ms
- Item details API P95: <= 400ms
- Checkout submission P95: <= 1,200ms

### Freshness budgets (projection lag)

- Search index freshness: < 5 minutes (steady state); < 30 minutes during incidents (proposed)
- Order book freshness: < 10 seconds (steady state); < 60 seconds during incidents (proposed)
- Wallet/ledger freshness: < 1 minute (steady state); < 10 minutes during incidents (proposed)

### Backpressure posture

The system must support backpressure when dependencies degrade:

- If OpenSearch is degraded, degrade gracefully (limited features, cached reads, or queue indexing).
- If shipping provider is degraded, allow retry and keep order state consistent.
- If Stripe is degraded, prevent partial/inconsistent checkouts.

---

## Guardrails (must exist before launch)

### Rate limiting and quotas

- Hard caps on:
  - auth attempts
  - listing/bid update frequency
  - checkout attempts
  - export requests

### Feature flags / kill switches

Minimum kill switches:

- Disable bid updates (leave bids but prevent churn)
- Disable new listings
- Disable checkout initiation
- Disable payouts
- Disable search vector features (fallback to lexical)

### Cost guardrails

- Control embedding/query costs (if hosted embeddings):
  - cap embedding calls per minute
  - cache popular queries
  - degrade to lexical-only under pressure

---

## Capacity planning questions (to answer)

1. What are realistic first-90-day numbers for DAU, listings/day, orders/day?
2. What are the expected peaks (marketing drops, live streams, set releases)?
3. How “real-time” do order books need to feel vs eventual consistency?
4. What is the acceptable maximum projection lag during incident conditions?
5. What is the budget range for OpenSearch and embeddings/month at launch?

---

## Dependencies

- Observability and SLO definition: see `artifacts/26-observability-slos-audit-and-incident-response.md`.
- Search engine: OpenSearch (ADR 012).
- Embeddings decision (ADR 016) impacts cost and latency.
