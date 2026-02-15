# ADR 018: Event Store Operability, Retention, and Idempotency

## Status

Accepted (MVP)

## Context

We use Postgres as the event store (ADR 007) and projectors consume directly from it (ADR 008). Because the system is event sourced, operational correctness depends on:

- Deterministic replays
- Idempotent event handling
- Clear checkpointing
- Defined retention and PII posture

We also need a practical operator story for:

- projector failures
- backfills
- event schema evolution

## Options considered

1. Keep streams small (many streams; e.g., per aggregate) and rely on projector checkpoints
2. Use fewer, larger streams (global streams) with careful indexing
3. Introduce a broker later (Kafka) and treat Postgres as authoritative source

## Decision

Accepted (MVP posture):

- Keep Postgres as source of truth.
- Maintain explicit per-projector checkpoints.
- Require idempotency in projectors.
- Use **many streams (per aggregate)** and a **global ordering cursor** for projectors.
- Use **at-least-once** projector processing semantics.

Locked retention posture (MVP):

- **Event store is append-only and retained indefinitely** for MVP, with strict avoidance of raw PII in event payloads.
- If legal/privacy require deletion, prefer deleting/redacting PII in projections/side stores, and keep immutable events minimal (IDs and references) rather than raw PII.

## Decision drivers

- Operational simplicity for MVP
- Ability to replay deterministically
- Performance under expected write rate
- Retention requirements vs storage cost
- Privacy constraints (avoid PII in events)

## Requirements

### Event envelope contract (MVP)

Minimum required fields on every event:

- `eventId`: ULID (globally unique; sortable)
- `streamId`: aggregate stream identifier
- `streamPosition`: monotonic per-stream sequence
- `position`: global ordering cursor (monotonic across all events, assigned by the event store)
- `occurredAt`: business time
- `schemaVersion`: per-event schema version
- `correlationId`, `causationId`: tracing

Notes:

- Projectors checkpoint by global `position`.
- We keep ULID `eventId` so events are globally unique and naturally sortable; it can be used for human-friendly ordering and as a stable idempotency key.

### Checkpointing

- Every projector must persist:
  - last processed event position
  - processing lag metrics
  - last error

### Idempotency

- Projectors must tolerate duplicates and retries.
- Event handlers must be idempotent by design.

### Backfill/replay

- Operators can reset a checkpoint and replay from a known position.
- Replay must not require engineering intervention for routine cases.

### Retention

- Event store retention is **indefinite** for MVP.
- Derived stores (projections, logs, attachments) still define retention windows (at least by category):
  - financial projections
  - catalog/search projections
  - support/admin projections
  - privacy/export/deletion artifacts

### PII posture

- Avoid storing raw PII in event payloads where feasible.
- Support redaction in projections/side stores while keeping immutable events.

## Consequences / follow-ups

- Define stream key strategy (aggregate types and identifiers).
- Define event versioning strategy and schema evolution approach.
- Align observability alerts for projector lag/drift.

## Open questions

Resolved for MVP:

1. Stream key strategy: **per aggregate** (Order, Listing, Bid/Offer, Wallet, etc.).
2. Projector semantics: **at-least-once** with idempotency required.
3. Retention: event store retained **indefinitely** for MVP; checkpoints retained long-term.
4. Replays and external side effects: **outbox / intent-event pattern** for all side effects; safe-by-default on replay.

## Operational rules (MVP)

- Side effects (emails, webhooks) must be driven by a dedicated mechanism that supports dedupe (e.g., outbox-style intent events) so replays do not resend by default.
- Operators must be able to:
  - pause a projector
  - reset its checkpoint
  - replay deterministically into a read model
  - run a backfill in a â€œno-side-effectsâ€ mode

## Validation worksheet (required evidence)

Record the agreed operational contract.

- Date:
- Owner:
- Summary conclusion:

Acceptance criteria:

- Stream key strategy is explicitly chosen (which aggregates get their own streams) and written down.
- Event envelope contract is defined (minimum fields): `eventId`, `streamId`, `streamPosition` (or equivalent), global ordering cursor (`position` or equivalent), `occurredAt`, `schemaVersion`, `correlationId`, `causationId`.
- Projector contract is defined:
  - checkpoint storage shape
  - at-least-once semantics
  - idempotency rule (what key is used to dedupe)
- Side-effects contract is defined so replays are safe-by-default:
  - â€œintent/outboxâ€ style events (or equivalent)
  - dedupe key and replay behavior documented
- Retention posture is aligned with privacy requirements:
  - event payloads avoid raw PII by design
  - deletion/redaction happens in projections/side stores per `docs/engineering/SECURITY.md`

If any acceptance criterion fails:

- Document the risk and adopt a mitigation (e.g., stricter event payload minimization, stronger dedupe keys, or tighter replay tooling requirements).

