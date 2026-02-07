# 4.4 Non-Functional Requirements

## Scalability assumptions

- Users (first 90 days): ~500 DAU (proposed; update once you have launch funnel data)
- Listings/Bids (first 90 days): ~500 new listings/day; ~1,000 bid updates/day (proposed)
- Read/write patterns: read-heavy search/browse; write bursts during listing/bid creation and checkout.

- Scale targets and capacity planning guardrails are defined in: `artifacts/30-scale-targets-and-capacity-planning.md`.

## Performance targets

- P50/P95 latency (proposed initial targets):
  - Search P95: <= 500ms
  - Item details P95: <= 400ms
  - Checkout submission P95: <= 1,200ms

## Availability & reliability

- Uptime target (proposed): 99.9% monthly for core API surfaces.
- RPO/RTO (proposed):
  - RPO: <= 15 minutes
  - RTO: <= 4 hours
- Backup/restore:
  - automated backups with PITR (where feasible)
  - restore testing at least quarterly

## Observability & incident response

- The platform must have end-to-end observability (metrics/logs/traces), explicit SLOs, and an incident response posture.
- See: `artifacts/26-observability-slos-audit-and-incident-response.md`.

## Auditability

- Admin/support actions must be auditable with actor, timestamp, reason codes, and target references.
- Catalog changes must be fully auditable (create/update/merge/split/deprecate).

## Security & privacy

- Auth approach: email magic link baseline (see `artifacts/adrs/002-auth-and-account-recovery.md`).
- Data sensitivity: payment and customer information is highly sensitive.
- Principle: minimize stored PII; delegate PCI scope to payment processor where possible.

- Data privacy, retention, export, and deletion requirements are defined in: `artifacts/27-data-privacy-retention-export-and-deletion.md`.

Fraud/abuse posture (MVP):

- Rate limiting and bot protection for auth, bids/listings, and checkout.
- Policy-driven holds/velocity limits to manage chargeback risk.
- Step-up auth for finance actions.

## Operability & portability

- Services run as OCI containers.
- The web app is deployed as static assets served via CDN.
- Prefer open-source infrastructure components where feasible.

---

## Questions to answer

## Open questions

1. What’s the worst-case data loss you can tolerate (RPO) for orders vs catalog vs bids/listings?
2. How quickly must we recover from outage (RTO)?
3. What fraud/abuse threats matter most (scraping, bot bidding, chargebacks, account takeover)?
4. Are we in scope for GDPR/other privacy regimes at launch?
