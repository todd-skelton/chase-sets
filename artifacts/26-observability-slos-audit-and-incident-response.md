# 5.x Observability, SLOs, Audit Logging, and Incident Response (Requirements)

## Purpose

Define cross-cutting operability requirements so Chase Sets can be run safely at launch:

- Detect issues quickly (metrics/logs/traces)
- Measure reliability and performance (SLIs/SLOs)
- Audit sensitive actions (admin + finance + catalog)
- Respond to incidents consistently (runbooks, severity, comms)

This is requirements-only (no implementation).

---

## Goals

- Make the system diagnosable end-to-end across critical user journeys.
- Make event sourcing practical to operate (projection lag/drift, replay/rebuild).
- Provide defensible audit trails for support, risk, trust & safety, and catalog.
- Define initial SLOs so “good enough” is measurable.

## Non-goals (MVP)

- Perfect observability coverage on day one.
- Full SIEM/SOC program.
- Fully automated incident remediation.

---

## Observability pillars (minimum viable)

### 1) Metrics

System must emit metrics sufficient to answer:

- Is the platform up?
- Are critical journeys healthy (search → item → checkout)?
- Are background processors/projections keeping up?
- Are external dependencies failing (payments, shipping, search engine)?

Minimum metric categories:

- Request rate, error rate, latency (RED)
- Saturation (CPU/memory/queue depth)
- Dependency health (timeouts, retries, error codes)
- Business-safety signals (payment failures, payout holds, dispute volume)

### 2) Logs

Requirements:

- Structured logs (machine-parseable)
- Consistent correlation fields:
  - `requestId`
  - `userId` (if known)
  - `orgId` (if applicable)
  - `checkoutId` / `orderId` / `shipmentId` (when relevant)
  - `eventId` and `streamId` for event-sourced operations
- Clear error classification (expected vs unexpected)
- No sensitive secrets in logs; PII should be minimized and policy-gated

### 3) Traces

Requirements:

- Distributed tracing across API → background processing → dependencies
- Spans must include the same correlation fields as logs where possible
- Trace sampling policy must be configurable

---

## Event sourcing operability requirements

### Projection lag and drift

The system must provide operator visibility into:

- Per-projector checkpoint position
- Lag (time-based and event-count-based)
- Failure rates and last error

### Replay/rebuild workflow

Operators must be able to:

- Rebuild a projection from the event store deterministically
- Verify rebuild completion and compare counts/checksums (best-effort)
- Avoid double-processing via idempotency rules

### Dead-letter handling

When a projection or background process cannot process an event:

- The event must be captured for investigation (dead-letter concept)
- Operators must be able to retry after remediation

---

## SLOs and SLIs (initial, cross-cutting)

### SLO philosophy

- Start with a small set of SLOs tied to user impact.
- Prefer simple, measurable indicators over many fragile ones.

### Proposed SLO groups (initial targets; confirm)

1. **API availability**
   - SLI: successful request ratio for core APIs
   - SLO: 99.9% monthly (proposed)

2. **Core journey latency**
   - SLI: P95 end-to-end latency for:
     - search
     - item details
     - checkout submission
   - SLO (proposed):
     - search P95 <= 500ms
     - item details P95 <= 400ms
     - checkout submission P95 <= 1,200ms

3. **Background freshness**
   - SLI: projection lag (minutes) for critical read models (search index, order book views, balances)
   - SLO (proposed):
     - search index: 99% of time lag < 5 minutes
     - order books: 99% of time lag < 10 seconds
     - wallet/ledger balances: 99% of time lag < 1 minute

4. **Dependency reliability**
   - SLI: payment provider error rate; shipping label purchase success rate
   - SLO (proposed):
     - payment provider authorization+capture success rate >= 99.5%
     - shipping label purchase success rate >= 99.0%

5. **Financial correctness guardrails**
   - SLI: reconciliation mismatch rate between ledger projection and underlying events
   - SLO (proposed): 0 mismatches for finalized settlements; alert on any mismatch > 0.

---

## Alerting and dashboards (minimum viable)

### Alerting principles

- Alerts must be actionable (include runbook link and common causes).
- Prefer symptom-based alerts (user impact) over noisy internal signals.

### Required alerts

- API error rate spikes (4xx/5xx by endpoint category)
- Latency spikes (P95/P99)
- Payment capture/authorization failures above threshold
- Shipping label purchase failures above threshold
- Projection lag exceeds threshold
- Projection error loop / dead-letter growth
- Search engine cluster health degraded
- Event store availability/connection issues

### Required dashboards

- Platform overview (availability, latency, errors)
- Core journey dashboard (search → checkout)
- Projection health (lag, throughput, failures)
- Payment/ledger dashboard (auth/capture/refund/dispute rates)
- Shipping dashboard (label success, delivery times, exception rates)
- Trust/risk dashboard (holds, freezes, takedowns, dispute volume)

---

## Audit logging requirements

Audit logging must cover at minimum:

- Admin/support actions (refunds, takedowns, freezes, overrides)
- Catalog changes (create/update/merge/split/deprecate)
- Risk policy changes (holds/velocity/flags)
- Finance-sensitive actions (payout destination changes, payout actions)

Audit entries must include:

- Actor identity
- Timestamp
- Action type
- Target entity references
- Reason code + notes

---

## Incident response (minimum viable)

### Severity model

Define a simple severity rubric (e.g., Sev0–Sev3) tied to:

- User impact
- Financial risk
- Data/security impact

### Expectations

- Every Sev0/Sev1 incident produces a short post-incident summary:
  - timeline
  - root cause
  - remediation items
  - prevention items

### Runbooks

Minimum runbooks to draft before launch:

- Payment provider outage / elevated declines
- Projection backlog / projector crash loop
- Search engine degradation
- Shipping label purchase failures
- Data correction workflows (catalog correction; rollback messaging)

---

## Open questions

1. What initial SLO targets do you want for availability and freshness?
2. Do you want on-call from day one, or “best effort” during business hours?
3. What is the acceptable maximum projection lag during incidents?
4. What audit log retention window do you want (and what privacy constraints apply)?
