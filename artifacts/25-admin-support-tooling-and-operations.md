# 5.x Admin/Support Tooling and Operations (Requirements)

## Purpose

Define the minimum viable internal tooling and operational workflows required to run Chase Sets at launch.

This is requirements-only (no implementation). It intentionally centralizes admin/support needs that are currently scattered across:

- Shipping & fulfillment
- Disputes/refunds/chargebacks
- Fraud/risk controls
- Trust & safety enforcement
- Catalog governance

---

## Goals

- Ensure the marketplace is operable without engineers on every incident.
- Make event sourcing practical: every operator action is auditable and replay-safe.
- Provide fast triage and consistent outcomes for buyers and sellers.
- Minimize financial loss and customer harm through containment actions.

## Non-goals (MVP)

- A full CRM platform replacement.
- Full self-serve seller dispute arbitration.
- Perfect automation; humans can do the first pass.

---

## Guiding principles

1. **Audit first**: every admin action emits a domain event.
2. **Least privilege**: admin roles separated (support vs finance vs catalog).
3. **Safe by default**: dangerous actions require reason codes and/or dual approval.
4. **Read models are primary**: internal consoles are powered by projections.

---

## Admin roles (minimum viable)

- **Support Agent**: view all entities; initiate support cases; issue refunds within limits.
- **Risk/Trust Agent**: apply holds/freezes; takedown listings; manage trust cases.
- **Finance Admin**: manual ledger adjustments (rare); payout gating policy overrides.
- **Catalog Admin**: approve/publish catalog changes; deprecate/reactivate items.
- **Super Admin**: manage roles; emergency actions.

---

## Core internal consoles (MVP)

### 1) Unified entity lookup (“omnibox”)

Support needs to search by:

- Order/Checkout ID
- Shipment tracking number
- Payment reference (Stripe ids)
- Email/user id
- Org id
- Listing/Bid id

Results must show:

- Canonical entity details
- Cross-links to related entities
- A timeline of recent events

### 2) Order/checkout console

Capabilities:

- View checkout → underlying orders per seller
- View shipment breakdown (multi-location/multi-seller)
- View payment status and allocations
- View shipping credit calculations and actual label costs
- Actions (policy-gated):
  - cancel order (pre-ship)
  - initiate refund (full/partial)
  - initiate claim/trust handoff

### 3) Shipping/fulfillment console

Capabilities:

- View shipment status across all carriers
- Investigate common failures:
  - label purchase failed
  - address validation failure
  - tracking stale
  - delivered/not received
- Actions:
  - re-attempt label purchase
  - update shipment metadata (with audit)
  - trigger “shipment investigation” workflow

### 4) Disputes/claims console

Capabilities:

- Case queue with statuses and SLAs
- Evidence checklist
- Timeline (events, messages, admin notes)
- Link to refunds/chargebacks and ledger unwind
- Actions:
  - issue refund/partial refund
  - mark claim resolved
  - apply payout hold / freeze org

### 5) Risk console

Capabilities:

- View risk flags and triggers
- View payout holds and velocity constraints
- View seller negative balance exposure
- Actions:
  - raise/clear risk flag
  - hold/release payout
  - freeze/unfreeze org
  - require step-up auth for next action

### 6) Trust & safety console

Capabilities and actions are defined in the Trust & Safety artifact, but must be implemented as an internal view in the same admin suite.

### 7) Catalog console

Capabilities and actions are defined in the Catalog Governance artifact, but must be implemented as an internal view in the same admin suite.

---

## Operational workflows (MVP)

### 1) Customer support case workflow

- A support agent can open a support case linked to one or more entities.
- Support cases can be reassigned and have internal notes.
- Statuses: `Open` → `WaitingOnBuyer`/`WaitingOnSeller` → `Resolved` → `Closed`.

### 2) Refund workflow (pre-ship)

- Cancel order(s)
- Issue refund
- Ensure allocation unwind occurs (ledger-safe)
- Notify buyer and seller

### 3) “Not received” workflow

- Confirm carrier status
- If delivered but buyer disputes:
  - collect evidence
  - apply risk hold if needed
  - direct into claim/dispute flow

### 4) Seller non-fulfillment workflow

- Detect SLA breach (no label purchased by X)
- Notify seller
- Allow limited grace period
- If not resolved:
  - cancel order
  - refund buyer
  - apply seller enforcement (strike/limits)

### 5) Emergency containment

- Immediate listing takedown
- Freeze org
- Hold payouts

All emergency actions require reason codes.

---

## Policy-gated controls

Certain actions must be constrained by configuration and/or approvals:

- Refund amount limits per agent role
- Manual ledger adjustments
- Unfreezing an org
- Reinstating a taken-down listing

---

## Audit and retention

- All admin actions must produce an event including actor, reason code, and references.
- Admin notes are part of the audit trail.
- Evidence attachments must have retention rules aligned with the privacy policy (see `artifacts/27-data-privacy-retention-export-and-deletion.md`; MVP default: 2 years for trust & safety evidence).

---

## Required projections

- Entity timeline projection (cross-aggregate event timeline)
- Support case projection
- Risk dashboard projection
- Trust case projection
- Dispute/claim projection
- Catalog change request projection

---

## Required events (conceptual)

- `SupportCaseOpened` / `SupportCaseUpdated` / `SupportCaseClosed`
- `SupportNoteAdded`
- `AdminActionRecorded` (fallback event when a domain-specific event is not appropriate)

(Prefer domain-specific events whenever possible, e.g., `RefundIssued`, `OrgFrozen`, `ListingTakedownApplied`.)

---

## Open questions

## MVP defaults (proposed)

1. Admin tooling: start with **one unified admin app** with role-based sections (support/catalog/risk) to minimize operational overhead.
2. Refund limits:

- Support Agent can issue refunds up to **$100** without escalation (proposed; reason-coded).
- Above $100 requires escalation/approval.

3. Dual approval:

- Require dual approval for **unfreezing orgs** and **reinstating listings** (proposed) to reduce internal abuse risk.

4. Support SLA at launch:

- first response within **24 hours** (business days)
- resolution best-effort; publish expectations to users
