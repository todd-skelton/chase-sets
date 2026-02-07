# 4.7 MVP Decisions To Lock (Cross-Cutting)

This document is a **decision queue**: it collects the small number of cross-cutting choices that block building the MVP workflows end-to-end.

## How to use

- For each decision below, pick one option and (optionally) add 1–3 sentences of rationale.
- Once the top section is answered, we can:
  - update the workflow stitching doc
  - flip the relevant ADRs from **Proposed → Accepted**
  - drill down workflow-by-workflow in the domains

## Top blockers (answer these first)

### D1) Inventory reservation posture (Marketplace ↔ Fulfillment)

**Question:** When do we reserve inventory?

Choose one:

- [x] **Reserve at listing time** (quantity-bound listings always reserve)
  - Pros: prevents oversell; simpler buyer experience; fewer checkout failures.
  - Cons: sellers can “lock” inventory by listing; needs listing expiry/cancel semantics.
- [ ] **Reserve at checkout submit** (listings are “availability hinted” until checkout)
  - Pros: sellers can list without tying up inventory.
  - Cons: more checkout failures; requires strong concurrency handling; more buyer UX work.
- [ ] **Hybrid**
  - Quantity-bound listings reserve; other listing types reserve at checkout.

**Default recommendation:** Reserve at listing time for MVP for any listing that promises a specific quantity.

**Notes from current direction**

- Listings and buyer offers are **standing** until canceled (no counteroffers; no negotiation ladder in MVP).
- We want symmetric behavior: both sides can “rest” on the market until acted upon.

Locked MVP posture:

- Listings do **not** expire by default; they remain active until canceled by the seller (or canceled by admin for policy reasons).
- Inventory is reserved/held for the listing’s quantity for the lifetime of the listing (or until sold/canceled).

### D2) Funds hold posture (Marketplace/Orders ↔ Payments)

**Question:** When do we require a buyer funds hold/authorization?

Choose one:

- [ ] **At bid placement** (pre-authorize or verify funds when bid is placed)
  - Pros: fewer payment failures after matching.
  - Cons: hard UX; more payment complexity; requires auth refresh/expiry handling.
- [x] **At checkout submit** (authorize/capture only when buyer confirms)
  - Pros: simpler; familiar commerce flow.
  - Cons: can fail after match; needs timeout + unwind policy.
- [ ] **Hybrid**
  - Hold for higher-risk cases (new accounts, high order value), otherwise at checkout.

**Default recommendation:** At checkout submit for MVP, with explicit match→checkout timeout/unwind rules.

**Notes from current direction**

- For MVP, “Buy now” is the primary UX; “Add to cart” is secondary; “Make offer” is tertiary.
- We have not yet committed to funds holds at offer placement.

Locked MVP posture:

- No funds hold at offer creation.
- When an offer is accepted (or an offer/listing crosses automatically), Orders creates a checkout that must be completed within a short timeout window.
  - Default: **15 minutes** (configurable).
  - If payment fails or times out: unwind and notify both sides.

### D3) Matching behavior (Marketplace)

**Question:** What matching rules are in MVP?

Answer these:

- [x] **Partial fills:** allowed (may be satisfied across multiple listings when quantity is requested and a single listing cannot satisfy it).
- [x] **Crossing rule:** executions occur at the **resting (book) order price**.
  - If a new listing crosses an existing offer, the trade price is the offer price (benefits the seller).
  - If a new offer crosses an existing listing, the trade price is the listing price (benefits the buyer).
- [x] **Tie-breakers:** price-time priority with deterministic ordering keys (created timestamp + stable id).
- [x] **Self-trade prevention:** required in MVP.

**Direction captured**

- Automatic matching for crossing offers/listings is **in scope**.
- "Sell now" and "Buy now" are first-class actions.

Price improvement expectation (locked):

- The resting order sets the execution price. “Price improvement” accrues to the party whose order was already on the books.

**MVP posture:** keep it deterministic and auditable; every execution emits `TradeExecuted(executionId, ...)`.

### D4) Stripe marketplace model validation (Payments)

This drives whether we can implement a single buyer charge with multi-seller split.

- Primary doc: [adrs/013-stripe-marketplace-model.md](adrs/013-stripe-marketplace-model.md)

Validation tasks (record evidence before go-live):

- [ ] Confirm Stripe primitives for **single buyer charge + multiple transfers** (limits, timing, fees).
- [ ] Confirm dispute/chargeback liability posture for the chosen charge type.
- [ ] Confirm refund unwind approach (partial refunds, per-seller unwind).
- [ ] Confirm onboarding + payout methods required at MVP launch.

Locked MVP posture:

- Merchant of record: **platform**.
- Stripe: **Connect Express + separate charges and transfers**, with a **single buyer charge** split across sellers.
- Disputes/chargebacks: **platform initially liable**; handled case-by-case; seller balances may go negative for unwind where policy dictates.
- Payout availability: **delayed until delivery confirmation** for MVP (can evolve to risk-based holds later).

### D5) Replay-safe side effects and event envelope (System)

This locks the “safe replay by default” contract.

- Primary doc: [adrs/018-event-store-operability-and-retention.md](adrs/018-event-store-operability-and-retention.md)

Answer these:

- [x] Stream key strategy (which aggregates get their own streams) + global ordering.
- [x] Event envelope minimum fields:
  - `eventId`, `streamId`, `streamPosition`, global `position`, `occurredAt`, `schemaVersion`, `correlationId`, `causationId`
- [x] Side-effects contract (outbox/intent events) and replay behavior.

Locked MVP posture:

- Streams: **per aggregate** (Order, Listing, Bid/Offer, Wallet, etc.).
- Global ordering: `eventId` is a ULID (sortable), and the event store assigns a monotonic global `position` cursor for projector checkpointing.
- Side effects: standardize on an **outbox / intent-event pattern** for all external effects (emails, webhooks, label purchase), safe-by-default on replay.
- PII: **no raw PII in event payloads** (IDs + references only).
- Retention: event store retained **indefinitely** for MVP.

---

## Marketplace UX + terminology (to keep it retail-friendly)

### D8) Buyer actions and cart semantics (Marketplace ↔ Orders)

**Question:** What does “Add to cart” mean?

Direction captured:

- “Add to cart” does **not** select a specific listing.
- Cart is a buyer intent over `SKU + quantity`.
- At checkout, an optimizer selects listings to fulfill the whole order with:
  - least total cost and/or
  - fewest shipments

Remaining decision to lock:

- [x] Primary objective: **lowest total cost** (MVP default).
  - Follow-up: optionally support “fewest shipments” preference (buyer opts into higher cost to consolidate).
- [x] Constraint: optimizer may choose sellers automatically without manual override in MVP.

Locked MVP default (best-practice posture):

- Once the optimizer selects listings at checkout, those selections are locked/held for the checkout timeout window (default **15 minutes**, configurable) to prevent concurrent sells.

### D9) Retail-friendly UI vocabulary (keep exchange terms internal)

**Goal:** Avoid stock-trading terminology while still supporting an exchange-like matching engine.

Baseline requirements captured:

- Users can view **all** buyer offers and seller listings for a SKU.
- User-facing copy avoids “executed/matched/spread/depth” and favors “bought/sold/offer accepted”.

Options to choose from (UI nouns):

- [x] Option A (recommended): **Listing** (sell) + **Offer** (buy)
- [ ] Option B: **For sale** (sell) + **Offers** (buy)
- [ ] Option C (more exchange-y): **Buy order** + **Sell order** (avoid for MVP unless strongly preferred)

We can keep `Bid`/`OrderBook` internal if we choose Option A/B.

Locked direction:

- UI says **Offer** (buy side) and **Listing** (sell side).
- Internally we still use `Bid` and `OrderBook` as domain terms and projections.

### D10) External API delegated access (incl. AI assistants)

Goal: enable deep integrations (including AI assistant/agent clients) over the same platform APIs, with guardrails.

- Primary doc: `artifacts/adrs/019-external-api-auth-and-agent-access.md`

Decisions to lock:

- [x] MVP scope for agentic clients:
  - [x] read-only public data (catalog + search; optionally public listings/offers)
  - [ ] plus “draft” actions (prepare cart/offer) requiring user confirmation
  - [ ] allow submitting high-risk actions (checkout/offer placement) with step-up + confirmations
- [x] MVP external auth posture: allowlisted **integration API keys** for read-only scopes
- [ ] Delegated access mechanism (OAuth vs PAT vs hybrid) for Phase 1+ user/org consent, and required scopes
- [ ] Default quotas/rate limits for agentic clients vs interactive sessions

Locked MVP direction:

- External AI/agent clients support **product discovery** (read-only) first.
- No user-private data (e.g., order status) and no transactional writes via external clients in MVP.

---

## Second wave (high leverage, but not required for Slice 1–2)

### D6) Embeddings posture (Search)

- Primary doc: [adrs/016-embedding-strategy.md](adrs/016-embedding-strategy.md)

Choose one:

- [ ] No embeddings in MVP (lexical only; evaluate later)
- [ ] Embeddings for re-ranking only
- [x] Full semantic search path

### D7) Shipping quote timing (Orders ↔ Fulfillment ↔ Payments)

Answer these:

- [x] Do we estimate shipping before payment authorization sizing?
- [x] Is there a “max auth amount” buffer policy?
- [x] When does the 5% shipping credit apply (at checkout vs after label purchase)?

Locked MVP posture:

- Checkout review shows an **estimated shipping total** (per shipment) derived from SKU dimensions/weight + EasyPost rates.
- Payments authorization is sized to include an explicit **shipping buffer** to avoid authorization failures due to small rate drift.
  - Default buffer: `max($1.00, 10% * estimated_shipping_total)` capped at **$10.00** per checkout (configurable).
- Shipping credit (5%) is applied in buyer-facing totals at checkout review and finalized at settlement against the **actual label cost**.

---

## Notes

- This doc intentionally does not replace the domain docs; it just centralizes the few decisions that affect multiple domains at once.
