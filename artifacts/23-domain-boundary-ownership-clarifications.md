# 2.3 Domain Boundary Ownership Clarifications (MVP)

## Purpose

This document resolves blurred ownership lines between domains and defines **systems of record**, **command/event contracts**, and **decision rules** that keep boundaries clear.

It follows the domain map in `artifacts/15-domain-map-and-integration-architecture.md` and the per-domain scope docs under `domains/*/docs/`.

---

## Boundary principles (best practices)

1. **Single System of Record (SoR)** per stateful concept.
2. **Commands flow inward** to the SoR; **events flow outward** from the SoR.
3. **Policy decisions** live with the domain that owns the policy; **state transitions** live with the domain that owns the state.
4. **Projections are read-only**; they never become SoR.
5. **Cross-domain actions** require an explicit event contract and idempotency rules.

---

## Ownership clarifications (decisions + contracts)

### 1) Inventory reservation & allocation

**Decision:** **Fulfillment** is the SoR for inventory reservation/allocation state. **Orders** may request reservations but does not own reservation state.

**Why:** Fulfillment already owns allocation concepts and physical shipment workflows.

**Contracts:**

- **Command (Orders → Fulfillment):** `ReserveInventory`
  - Inputs: `checkoutId`, `orderId`, `sellerOrgId`, `originLocationId?`, `lineItems[] (skuId, quantity)`
- **Event (Fulfillment → Orders):** `InventoryReserved` / `InventoryReservationFailed`
  - Includes reservation id and per-line status.

**Decision rule:** Orders never infer reservation state; they advance only on Fulfillment events.

---

### 2) Market view / order book projections

**Decision:** **Marketplace** is the SoR for order books and market views. **Search** indexes them for discovery but does not own market state.

**Contracts:**

- **Event (Marketplace → Search):** `OrderBookSnapshotUpdated`
  - Inputs: `skuId`, `bestBid`, `bestAsk`, `depthSummary`, `updatedAt`.

**Decision rule:** Search must not be the source for trading decisions; Marketplace remains authoritative.

---

### 3) Enforcement actions vs operational risk controls

**Decision:**

- **Trust & Safety** owns **policy decisions and enforcement actions**.
- **Risk** owns **risk scoring and operational holds**.
- **Marketplace/Orders/Payments** execute state changes only via commands triggered by those events.

**Contracts:**

- **Event (T&S → Marketplace/Orders):** `EnforcementActionApplied`
  - Inputs: `actionType` (delist, suspend, ban), `subjectType` (listing/account/org/order), `subjectId`, `reasonCode`.
- **Event (Risk → Payments/Orders):** `RiskHoldApplied` / `RiskHoldReleased`
  - Inputs: `holdType`, `scope`, `reasonCode`.

**Decision rule:** Risk cannot directly delist listings; it can trigger holds or request review. T&S cannot alter money movement state directly; it can request holds.

---

### 4) Review visibility & moderation

**Decision:** **Reputation** is the SoR for review visibility and moderation state. **Trust & Safety** provides policy triggers that Reputation consumes.

**Contracts:**

- **Event (T&S → Reputation):** `ReviewPolicyViolationFlagged`
  - Inputs: `reviewId`, `policyId`, `severity`, `recommendedAction`.
- **Event (Reputation → T&S):** `ReviewVisibilityChanged`
  - Inputs: `reviewId`, `visibilityState`, `reasonCode`.

**Decision rule:** Reputation owns the final visibility state; T&S owns the policy reasoning.

---

### 5) Payout holds & release authority

**Decision:** **Payments** is the SoR for payout state. **Risk** issues gating signals.

**Contracts:**

- **Event (Risk → Payments):** `PayoutHoldRequested` / `PayoutHoldCleared`
  - Inputs: `sellerOrgId`, `reasonCode`, `holdScope` (all payouts vs specific order).
- **Event (Payments → Risk):** `PayoutHoldApplied` / `PayoutHoldReleased`
  - Includes final decision + effective dates.

**Decision rule:** Payments makes the final state transition; Risk does not mutate payout state directly.

---

### 6) Refund state vs order state

**Decision:** **Payments** is the SoR for refunds/disputes/chargebacks. **Orders** reflects those states for customer visibility.

**Contracts:**

- **Command (Orders → Payments):** `RequestRefund`
  - Inputs: `orderId`, `amount`, `reasonCode`.
- **Event (Payments → Orders):** `RefundIssued` / `ChargebackFiled`
  - Inputs: `orderId`, `amount`, `status`.

**Decision rule:** Orders never finalize refund status; it relies on Payments events.

---

## Governance & documentation updates

To keep boundaries clear as the system grows:

1. **Add “SoR” fields** to each domain’s `README.md` (what state is owned).
2. **Require event contracts** for any cross-domain state change before implementation.
3. **Boundary review checklist** in each `domains/<domain>/docs/00-todo.md` for new capabilities.
4. **ADR required** when a boundary changes or a new SoR is introduced.

---

## Open items (to confirm)

- Confirm that Fulfillment owns reservation state (vs Orders). If not, swap ownership and adjust contracts.
- Confirm that Search only indexes market views and never becomes SoR.
- Confirm that T&S does not mutate payments directly.

