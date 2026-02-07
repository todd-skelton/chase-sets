# 4.8 MVP Problem Statements & User Stories (Implementation-Ready)

## Purpose

Translate the cross-cutting direction into **implementation-ready user stories** with acceptance criteria.

This doc is intentionally scoped to MVP workflows and avoids deep technical design details (those live in domain docs + ADRs).

## Canonical inputs

- MVP workflows (end-to-end stitching): [18-mvp-workflows-and-event-flows.md](18-mvp-workflows-and-event-flows.md)
- Cross-cutting decisions (policy queue): [19-mvp-decisions-to-lock.md](19-mvp-decisions-to-lock.md)
- Product vision: [01-product-vision.md](01-product-vision.md)
- Outcome requirements: [08-outcome-based-requirements.md](08-outcome-based-requirements.md)

---

## Problem statements (MVP)

1. **Version-heavy catalog makes it hard to buy confidently**
   - Buyers struggle to find the exact item form (single vs sealed vs graded), version attributes, and condition/grade.

2. **Selling is high-friction without trustworthy listing + fulfillment workflows**
   - Sellers need a clear, low-effort way to list inventory tied to a ship-from location, fulfill reliably, and get paid.

3. **Trust is fragile in peer-to-peer commerce**
   - Fraud, non-fulfillment, and disputes must be handled with clear policies and auditable outcomes.

4. **Multi-seller checkout is inherently complex**
   - Buyers want one checkout even when multiple sellers/shipments are involved; the system must choose good fulfillments automatically.

---

## Cross-cutting user stories (workflow-aligned)

### 1) Catalog search → item detail → Version resolution

**Story 1.1 — Search by identifiers**

As a buyer, I can search by set + card number and get the correct item at the top so I can buy quickly.

Acceptance criteria:

- Exact identifier queries (set + number, exact card name) reliably return correct results in top-k.
- Filters are config-driven (admin-defined), not hardcoded.

**Story 1.2 — Natural language discovery**

As a buyer, I can search with natural language (nicknames, descriptors) and see relevant results without losing exact-match behavior.

Acceptance criteria:

- Hybrid retrieval/ranking (lexical + vector) is used.
- If embeddings are unavailable, results degrade to lexical-only (with monitoring).

**Story 1.3 — Deterministic Version selection**

As a buyer or seller, I can choose version attributes (condition/grade/etc.) and the system resolves a stable `versionId`.

Acceptance criteria:

- Version resolution is deterministic and stable over time.
- Version identity rules are documented in the glossary.

---

### 2) Create listing (sell)

**Story 2.1 — Seller eligibility before selling**

As a seller, I must be verified (18+, identity + tax) before creating listings so the marketplace can manage compliance and payout risk.

Acceptance criteria:

- A seller cannot create a listing unless they meet the MVP onboarding requirements.
- A support/admin can see why a seller is blocked.

**Story 2.2 — Create listing reserves inventory**

As a seller, when I create a listing for a Version and quantity at a ship-from location, the system reserves the inventory so it cannot be oversold.

Acceptance criteria:

- Inventory is reserved at listing time for the listing’s quantity.
- If reservation fails, the listing is not created.
- A listing is tied to a single fulfillment origin location.

**Story 2.3 — Listings are standing until canceled**

As a seller, my listing stays active until I cancel it (or an admin cancels for policy reasons).

Acceptance criteria:

- Listings do not expire by default.
- Cancellation releases the reserved inventory.

---

### 3) Make offer (buy)

**Story 3.1 — Place an offer**

As a buyer, I can make an offer for a Version and quantity so I can wait for a seller to accept.

Acceptance criteria:

- Offers appear in the Version market view.
- Offers are standing until canceled.

**Story 3.2 — No funds hold at offer creation**

As a buyer, I can make an offer without authorizing payment immediately so the flow is familiar and low-friction.

Acceptance criteria:

- No payment authorization occurs when an offer is created.
- The buyer is informed that payment is required at checkout.

---

### 4) Automatic matching (buy-now / sell-now / crossing)

**Story 4.1 — Deterministic matching**

As the platform, matching must be deterministic and auditable so outcomes are explainable.

Acceptance criteria:

- Matching follows price-time priority within a Version.
- Self-trade prevention is enforced (an org cannot match itself).
- Every execution emits `TradeExecuted(executionId, ...)` and is idempotent by `executionId`.

**Story 4.2 — Execution price is the resting order price**

As a buyer or seller, when an offer and listing cross, the trade price is predictable and based on the resting order.

Acceptance criteria:

- New listing crosses existing offer → trade price is the offer price.
- New offer crosses existing listing → trade price is the listing price.

---

### 5) Checkout submit → payment auth/capture → ledger allocation

**Story 5.1 — Single buyer charge, multi-seller allocation**

As a buyer, I pay once per checkout even if multiple sellers are involved.

Acceptance criteria:

- One buyer payment is created per checkout.
- The internal ledger records allocation per seller.

**Story 5.2 — Funds hold at checkout submit**

As the platform, we authorize/capture payment only when checkout is submitted.

Acceptance criteria:

- Checkout submission triggers payment authorization/capture.
- Payment failure leaves the system in a consistent state (no paid order without captured funds).

**Story 5.3 — Cart optimizer selects listings at checkout**

As a buyer, I can add `Version + quantity` to cart, and at checkout the system selects listings to minimize my total cost.

Acceptance criteria:

- Primary objective: lowest total cost.
- Selection happens at checkout (not when adding to cart).
- Buyer cannot manually override selection in MVP.
- Buyer can still choose a specific listing by using the “view all listings” surface and doing buy-now on that listing.

**Story 5.4 — Offer acceptance requires timely checkout**

As a seller, when my item sells via an offer being accepted, the buyer must complete checkout in a short time window or the sale unwinds.

Acceptance criteria:

- System defines a timeout window (policy/config).
  - Default: **15 minutes**.
- On timeout/payment failure: unwind deterministically and notify buyer + seller.

**Story 5.5 — Shipping estimate, authorization sizing, and settlement**

As a buyer, I see estimated shipping (net of shipping credit) before I pay, and I am ultimately charged based on the actual label cost.

Acceptance criteria:

- Checkout shows estimated shipping per shipment and applies the 5% shipping credit in the buyer-facing total.
- Payment authorization sizing includes an explicit shipping buffer to reduce failures due to small rate drift.
- Shipping settles to the actual EasyPost label cost; any difference is handled deterministically.

---

### 6) Shipment creation → label purchase → tracking → delivery

**Story 6.1 — Create shipments per seller/origin**

As a buyer, my order is split into shipments as needed based on seller/origin so fulfillment is accurate.

Acceptance criteria:

- Shipments are created per seller/origin.
- Tracking updates are recorded and visible.

**Story 6.2 — Delivery confirmation unblocks seller withdrawability**

As a seller, my funds become withdrawable after delivery is confirmed so the marketplace reduces dispute risk.

Acceptance criteria:

- Funds are not withdrawable before delivery confirmation (MVP default).
- Delivery updates are auditable and drive payout eligibility changes.

---

### 7) Refunds / disputes (admin + ledger)

**Story 7.1 — Reason-coded unwind**

As support/admin, I can issue refunds and handle disputes in a way that deterministically unwinds ledger allocations.

Acceptance criteria:

- Refunds/disputes generate unwind events that reconcile allocations.
- Seller balances may go negative if policy dictates.
- Platform is initially liable; case-by-case outcomes are recorded via reason codes.

---

## Domain story slices (implementation breakdown)

These are not exhaustive; they are the minimum slices to implement the cross-cutting workflows without mixing responsibilities.

### Marketplace

- Implement listing lifecycle with inventory reservation handshake (Fulfillment owns inventory; Marketplace owns listing intent).
- Implement offer lifecycle (standing offers, cancel).
- Implement deterministic matching + `TradeExecuted` handoff.

### Orders

- Implement checkout state machine for buy-now, cart checkout, and offer-accepted checkout.
- Implement timeouts/unwind triggers for unpaid accepted offers.

### Payments

- Implement checkout payment orchestration (single charge) and ledger allocation.
- Implement payout gating: withdrawable only after delivery confirmation.
- Implement dispute/refund unwind events and negative balance rules.

### Fulfillment

- Implement listing-time inventory reservation at a location.
- Implement shipment creation, label purchase as replay-safe side effects, and delivery confirmation events.

### Search

- Implement hybrid lexical + vector retrieval/ranking.
- Implement admin-configurable filters.
- Create and maintain a golden query set for relevance evaluation.

---

## Remaining “best practices” details to lock (configurable defaults)

These are intentionally left as policy/config defaults but should be set explicitly before implementation:

- Offer-accepted checkout timeout window (default **15 minutes**, configurable).
- Cart checkout selection lock behavior and timeout if payment fails (default **15 minutes**, configurable).
- Shipping quote/auth-buffer policy is locked (see the cross-cutting decisions + Fulfillment shipping requirements).
