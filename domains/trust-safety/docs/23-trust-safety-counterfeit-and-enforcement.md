# 3.x Trust & Safety: Counterfeit, Misrepresentation, and Enforcement (Requirements)

## Purpose

Define MVP Trust & Safety requirements that protect marketplace trust in a Pokémon TCG context (singles, sealed, and graded), while fitting:

- Event sourcing + projections (auditability)
- Multi-seller checkout + split shipments
- Stripe + wallet/ledger (holds, disputes, chargebacks)

This is requirements-only (no implementation).

---

## Goals

- Prevent and quickly remove counterfeit or misrepresented items.
- Provide clear buyer/seller flows for reporting and resolution.
- Create consistent, auditable enforcement with escalating consequences.
- Reduce loss and reputational damage through fast containment (takedowns, holds).
- Provide minimum viable admin tooling so cases don’t get stuck.

## Non-goals (MVP)

- Perfect detection or automated authenticity verification.
- Full ML moderation.
- A complete legal policy set (Terms of Service / Privacy still required before launch).

---

## Scope: what Trust & Safety covers

### Prohibited / restricted items and behaviors (MVP)

The platform must be able to detect/report/enforce against:

- Counterfeit cards or counterfeit sealed products.
- Resealed/tampered sealed products.
- Altered cards (trimmed, recolored, inked, etc.) unless explicitly disclosed and permitted by policy.
- Misrepresentation:
  - Wrong edition/language/condition
  - Wrong card or wrong quantity
  - Wrong graded card (mismatched cert/serial) or incorrect grade claims
- Stolen goods (reported with credible evidence).
- Marketplace integrity violations:
  - Self-dealing / shill bidding (org buying from itself or coordinated manipulation)
  - Evasion (relisting after takedown, creating new orgs after suspension)

This list is intentionally MVP-scoped; it must be policy/config driven and extensible.

### Objects that can be reported

A report/case must be able to reference one or more of:

- Listing
- Shipment / tracking / fulfillment
- Order
- Organization
- User
- Message/thread (if messaging exists)

---

## User-facing flows

### 1) Report flow (buyer or user)

Minimum capabilities:

- A user can submit a report with:
  - Category (counterfeit, resealed/tampered, misrepresented, stolen goods, other)
  - Target reference (listing/order/shipment/org/user)
  - Freeform description
  - Evidence attachments (photos; and later video)
- The reporter can see status updates (submitted, under review, resolved).
- The system can acknowledge receipt and provide a reference ID.

### 2) Seller response flow

If a case involves a seller/org:

- The seller can be notified of the case (unless doing so creates safety risk or invites evasion).
- The seller can submit evidence (photos, graded cert details, shipping receipt).
- The seller can accept a proposed resolution (e.g., refund + return) or contest.

### 3) Resolution outcomes (minimum viable)

A case resolution must support:

- Listing takedown (temporary or permanent).
- Order resolution paths:
  - Full refund
  - Partial refund (e.g., condition mismatch)
  - Return required before refund (policy-driven)
  - No action (report rejected)
- Enforcement action against seller/org:
  - Warning
  - Strike
  - Selling restriction (cannot create new listings)
  - Org freeze (cannot payout; see risk controls)
  - Org suspension (cannot transact)

---

## Containment actions and SLAs

MVP requires explicit containment actions with short, operator-friendly SLAs:

- Temporary listing takedown (hide from search and purchase) while under review.
- Temporary payout holds for involved seller(s) when authenticity is in question.
- Optional temporary suspension of repeat-offender orgs.

SLA requirements (policy-driven targets):

- Initial triage within X hours for “high severity” categories.
- Resolution target within Y days, with automated escalations to admins.

---

## Evidence and authenticity handling

### Evidence requirements (MVP)

The system must support structured evidence submission. At minimum:

- Photos of item received (front/back; closeups where relevant)
- Photos of packaging and shipping label
- For graded items: cert number + slab photos
- For sealed: seal condition and box/pack condition photos

Evidence requirements should be category-specific and policy-driven.

### Return-and-verify path

For authenticity disputes, the platform must support a policy option to require return before refund.

Requirements:

- Ability to specify who pays return shipping (policy-driven; typically seller/marketplace for counterfeit).
- Ability to issue/withhold refunds based on return status.
- Ability to handle multi-shipment orders (return applies to a specific shipment/order line).

---

## Enforcement and identity linkage

### Escalation model

Enforcement must support progressive escalation (configurable), such as:

- First offense: warning
- Repeated offenses: strikes and restrictions
- Severe offense: immediate suspension and fund holds

### Evasion controls (MVP)

The system must support basic evasion mitigation:

- Link enforcement actions to the org as the primary actor (org-owned listings/bids).
- Support freezing/suspending an org as an operational action.
- Maintain an audit trail of enforcement actions and reasons.

---

## Operational requirements (admin/support)

### Minimum viable Trust & Safety console

Admins/support need:

- Case queue with filters (severity, age, category, assignee)
- Case detail view:
  - Timeline of events
  - Linked entities (listing/order/shipment/org/user)
  - Evidence attachments
  - Communication log
- One-click actions (with mandatory reason codes):
  - Takedown listing
  - Reinstate listing
  - Apply strike/warning
  - Freeze/unfreeze org
  - Suspend/reinstate org
  - Initiate refund/return flow (or hand off to dispute flow)

### Auditability

Every admin action must be captured as an event with:

- Actor (admin user id)
- Timestamp
- Reason code + freeform notes
- Target reference

---

## Projections and metrics (MVP)

Required projections:

- Trust case read model (status, severity, owner, linked entities)
- Seller/org “trust profile”:
  - Strikes count
  - Recent cases and outcomes
  - Fulfillment performance signals (from shipping)

Required metrics:

- Time to triage, time to resolve
- Counterfeit/misrepresentation rate (per seller, per SKU, overall)
- Recidivism rate (repeat offenders)

---

## Required events (conceptual)

- `TrustReportSubmitted`
- `TrustCaseOpened` / `TrustCaseUpdated` / `TrustCaseClosed`
- `TrustEvidenceSubmitted`
- `ListingTakedownRequested` / `ListingTakedownApplied` / `ListingReinstated`
- `SellerStrikeApplied` / `SellerStrikeRemoved`
- `OrgSuspended` / `OrgReinstated`

(Existing risk/payment events also apply, e.g. `PayoutHeld`, `OrgFrozen`, `RefundIssued`, `DisputeOpened`.)

---

## Open questions

1. What is the default policy for “return required before refund” on counterfeit vs misrepresentation?
2. What categories should trigger immediate takedown + payout hold?
3. Do we allow “altered” listings if clearly labeled, or prohibit entirely?
4. What seller strike thresholds trigger automatic restrictions/suspension?
5. Do we need an “authenticity guarantee” marketing promise at launch (and what are its financial limits)?
