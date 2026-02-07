# 5.x Data Privacy, Retention, Export, and Deletion (Requirements)

## Purpose

Define cross-cutting requirements for handling personal data and sensitive data across the entire platform:

- What data we store vs delegate (e.g., payment processor)
- How long we retain it (retention windows)
- How we export it (user/org portability)
- How we delete it (privacy requests) while respecting event-sourcing constraints

This is requirements-only (no implementation).

---

## Goals

- Minimize privacy risk while supporting operational needs (support, disputes, fraud, trust & safety).
- Be explicit about data categories and retention windows.
- Provide user-facing rights workflows (export, deletion) appropriate for launch scope.
- Keep event sourcing workable (events remain immutable; PII handling must be designed accordingly).

## Non-goals (MVP)

- Full global compliance program for every jurisdiction.
- Automating legal review.
- Comprehensive anonymization across all derived analytics on day one.

---

## Data classification (minimum viable)

Define and apply a consistent classification:

1. **Public catalog data**
   - Product names, sets, variants
2. **Operational marketplace data**
   - Listings/offers/orders/shipments (mostly non-PII but can include references)
3. **Personal data (PII)**
   - Email
   - Names/addresses (shipping)
4. **Sensitive financial references**
   - Processor IDs (Stripe, EasyPost)
   - Bank/payout destination references (never store raw bank details)
5. **Risk and enforcement data**
   - Fraud flags, trust cases, evidence attachments (may contain highly sensitive imagery)

---

## Data minimization and delegation

Requirements:

- Store the minimum PII needed to operate the marketplace.
- Delegate PCI scope and sensitive payment details to the payment processor.
- Do not place unnecessary PII inside domain events.

Practical rule:

- Domain events should prefer referencing an internal `userId`/`orgId` and storing PII in a separate, access-controlled store where feasible.

---

## Access control requirements (privacy-by-default)

- PII access is role-gated (support roles vs general admins).
- Support staff should see redacted views by default, with explicit “reveal” actions that are audited.
- Evidence attachments (trust/safety) require stricter access controls and logging.

---

## Retention policy requirements

The system must define explicit retention windows for:

- Auth/account data (email, login history)
- Order and shipment records
- Addresses
- Support cases and internal notes
- Dispute/chargeback artifacts
- Trust & safety evidence
- Audit logs

Guidance (policy; see proposed defaults below):

- Retain only what is necessary for:
  - financial reconciliation
  - dispute windows
  - fraud prevention
  - legal obligations

## Proposed retention windows (MVP defaults)

These are starting points to make behavior deterministic. Adjust if counsel/accounting requirements differ.

- Orders/shipments/payments/ledger-related records: **7 years**
- Audit logs (admin/support actions, policy acceptance): **2 years**
- Support cases and internal notes: **3 years**
- Trust & safety evidence attachments: **2 years** (stricter access controls)
- Shipping addresses:
  - active customers: retained while account is active
  - after account deletion/deactivation: redact within **30 days**
  - operational copies in order records: retain for **7 years** (but minimize and/or store as references where possible)
- Auth/login history (non-PII security signals): **1 year**

Note: event payloads should avoid raw PII so long-term event retention does not imply long-term PII retention.

MVP posture:

- Event store retention is **indefinite** for MVP.
- PII deletion/redaction is handled in projections/side stores (events remain immutable and should not contain raw PII).

---

## Export (portability) requirements

### User export

A user must be able to request an export of:

- Profile data
- Purchase history
- Sales history (if seller)
- Support cases they are party to (excluding internal-only notes)

### Organization export

An org must be able to export:

- Listings/offers history
- Orders and payouts history
- Inventory adjustments history

Export requirements:

- Provide a machine-readable format (CSV and/or JSON)
- Exports must be auditable and rate-limited
- Exports should be delivered securely (time-limited download)

---

## Deletion and event sourcing constraints

### Immutable events

Because events are append-only, “deletion” must be modeled as one of:

- **Erasure of PII in side stores** (preferred)
- **Cryptographic erasure** (delete keys, render data unrecoverable)
- **Tombstoning/redaction in projections** (derived read models)

Requirements:

- The platform must support processing privacy deletion requests without rewriting event history.
- Projections must be rebuildable in a way that respects redactions.

---

## Auditability requirements

- All access to sensitive PII (including “reveal” actions) must be auditable.
- All export and deletion requests must be auditable (who requested, who approved, when executed).

---

## Security requirements (privacy-adjacent)

- Secrets management is required; never log secrets.
- Encrypt sensitive data at rest and in transit (baseline expectation: TLS for service-to-service and provider-managed encryption-at-rest for databases/object stores).
- Define breach response expectations (ties to incident response artifact).

---

## Required events (conceptual)

- `DataExportRequested` / `DataExportPrepared` / `DataExportDelivered` / `DataExportFailed`
- `DataDeletionRequested` / `DataDeletionApproved` / `DataDeletionCompleted` / `DataDeletionRejected`
- `PiiRedacted` (or equivalent redaction marker)
- `SensitiveDataAccessed` (for audited “reveal” actions)

---

## Open questions

## MVP defaults (proposed)

1. Launch geography: **US-only** at launch; treat GDPR/CCPA as a near-term follow-up item (confirm).
2. Retention windows: use the defaults listed above.
3. Deletion meaning: default is **deactivate + redact PII** (events remain immutable; projections/side stores are redacted).
4. Export formats: support **both CSV and JSON** (CSV for human review; JSON for portability).
