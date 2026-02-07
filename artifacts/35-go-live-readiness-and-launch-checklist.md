# 6.x Go-Live Readiness and Launch Checklist (Requirements)

## Purpose

Define the cross-cutting readiness criteria required before writing production code and before launch.

This is a checklist artifact (requirements-only).

---

## Goals

- Make go-live blockers explicit (decisions, policies, operational readiness).
- Prevent “launch with unknowns” in payments, disputes, privacy, and observability.

---

## Pre-implementation (before writing code)

### Decisions to lock

- Stripe marketplace model (ADR 013)
- Embedding strategy (ADR 016)
- Shipping credit overage policy
- Pickup scope: **ship-only in MVP**; ensure future pickup remains compatible
- Step-up auth policy thresholds
- Initial scale targets (90 days)

### Cross-cutting definitions

- Money math invariants (fees, credits, rounding, unwind)
- Audit logging requirements
- Retention windows (privacy, evidence)

---

## Pre-launch (before real users)

### Operational readiness

- Runbooks exist for:
  - Stripe outage / payment failures
  - projector lag and replay
  - OpenSearch degradation
  - shipping label purchase failures
- Alerting and dashboards exist and are tested.
- Backups are automated and restore tests have been run.

### Security and privacy

- Sensitive actions require step-up auth.
- PII redaction/export/deletion flows exist and are audited.
- Secrets management and logging redaction in place.

### External API + AI assistant readiness

- MVP external/partner access (read-only) is supported behind guardrails:
  - enforced pagination and maximum page sizes
  - rate limits/quotas (by IP + integration API key; configurable)
  - safe degradation posture under overload
- Integration credential ops are operable:
  - issue/rotate/revoke integration API keys
  - audit logs can attribute requests to the integration/client
- Kill switches exist for overload/abuse:
  - disable external API access (globally or per key/org)
  - tighten limits dynamically by policy

Phase 1+ (delegated access / write actions):

- Delegated access is operable (user/org consent): grant scoped access and revoke it
- Step-up required for granting/changing sensitive scopes
- Kill switches exist for write/high-risk workflows (checkout, payouts) by policy

### Trust and safety

- Takedown/freeze/suspension workflows are operable.
- Evidence retention policy defined.

### Finance correctness

- Reconciliation approach defined and tested in staging.
- Refund/chargeback unwind behavior is validated.

---

## Launch criteria (minimum viable)

- A buyer can complete: search → select SKU → checkout → see shipment status.
- A seller can complete: list → sell → buy label → deliver → see proceeds.
- Support can resolve common issues without engineers.

---

## Open questions

## MVP defaults (proposed)

1. Launch strategy: **invite-only beta** first (friends/family + a small set of trusted sellers), then widen.
2. Yes: start with a private beta with limited sellers to reduce fulfillment/payment risk.
3. Support SLA at launch:

- first response: **within 24 hours** (business days)
- Sev0/Sev1: **ASAP**
