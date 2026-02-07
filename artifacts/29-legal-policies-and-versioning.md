# 5.x Legal/Policy Surface and Policy Versioning (Requirements)

## Purpose

Define cross-cutting requirements for the legal and policy surface needed to launch a marketplace, without drafting legal text.

This includes:

- Terms of Service and Privacy Policy presentation and acceptance
- Policy versioning and auditability
- Prohibited items/behavior policy hooks (ties to Trust & Safety)
- Dispute/returns policy presentation (ties to disputes/refunds)
- Fee transparency and disclosures

This is requirements-only (no implementation and no legal language).

---

## Goals

- Ensure users can understand and accept the rules of the platform.
- Ensure policy changes are versioned, auditable, and enforceable.
- Ensure key disclosures are presented at the right moments (fees, shipping, refunds).
- Ensure the platform can operate across policy changes over time.

## Non-goals (MVP)

- Writing actual Terms/Privacy legal text.
- Supporting every jurisdiction-specific legal regime day one.
- A full policy authoring system with complex workflows.

---

## Required policy documents (minimum viable)

The product must have a way to publish and reference versions of:

- Terms of Service
- Privacy Policy
- Prohibited items and conduct policy (marketplace rules)
- Returns/refund/dispute policy summary (buyer/seller expectations)
- Fee and pricing disclosures (seller fee, buyer processing fees, shipping credit model)

Note: these can be separate documents or sections, but must be separately versionable.

---

## Acceptance and versioning requirements

### Policy versioning

- Policies must be versioned with:
  - a unique version identifier
  - publish timestamp
  - effective timestamp (optional)
  - a changelog summary (non-legal, operator-readable)

### User acceptance

- The system must record which policy versions a user/account has accepted.
- The system must support gating access when acceptance is required (e.g., new Terms version).
- Acceptance events must be auditable.

### Organization acceptance

Because listings and bids are org-owned, the system should support (at least in the model):

- recording acceptance on behalf of an organization (actor = member/account)

MVP may function with a single-member org, but acceptance must remain explicit.

---

## Disclosures and “right moment” presentation

The product must be able to present and record acknowledgements for:

- Seller fee model (and any rounding rules)
- Buyer processing fees (pass-through) and payment rail differences
- Shipping credit model (5% credit) and how overages work
- Split shipment behavior (buyer pays shipping per shipment)
- Returns/refund/dispute expectations

Acknowledgements should be treated as configuration (which flows require them).

---

## Enforcement coupling (policy → action)

Policies must be enforceable operationally.

Requirements:

- Prohibited items/conduct policy must map to Trust & Safety case categories and enforcement actions.
- Policy version in effect at the time of an event should be discoverable for support (best-effort).

---

## Audit and retention

- Policy publication and edits must be auditable.
- Acceptance records must be retained according to compliance/retention needs.

---

## Required events (conceptual)

- `PolicyPublished` / `PolicyDeprecated`
- `PolicyAccepted` (by user/account)
- `OrgPolicyAccepted` (acceptance on behalf of an org)
- `DisclosureAcknowledged` (fee/shipping/refund disclosures)

---

## Open questions

## MVP defaults (proposed)

1. Launch geography: **US-only** at launch; add GDPR/CCPA posture as a planned follow-up.
2. Seller eligibility: sellers must be **18+** and provide valid identity + tax information before selling (per onboarding requirements).
3. Re-acceptance: require re-acceptance for **material** changes; record acceptance version either way.
4. Checkout acknowledgements (explicit):

- seller fee model + rounding rules
- shipping credit model + overage policy
- split shipment behavior (buyer pays per shipment)
- refund/dispute summary

5. Seller agreement: do not introduce a fully separate seller contract for MVP; instead add seller-specific sections/acknowledgements as needed (can split later).
