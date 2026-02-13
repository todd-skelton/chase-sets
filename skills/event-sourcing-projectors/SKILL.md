---
name: event-sourcing-projectors
description: Build or change event envelopes, event store writes, projectors, checkpoints, replay behavior, or outbox side effects in Chase Sets. Use when implementing event-sourced flows, projector idempotency, replay/backfill safety, or event schema evolution.
---

# Event Sourcing Projectors

## Read First
- `AGENT.md`
- `artifacts/adrs/005-event-sourcing-and-projections.md`
- `artifacts/adrs/007-postgres-event-store.md`
- `artifacts/adrs/008-projector-consumption-no-broker.md`
- `artifacts/adrs/018-event-store-operability-and-retention.md`
- `infra/README.md`

## Workflow
1. Confirm the owning aggregate and stream boundary.
2. Define or update the event contract with required envelope fields.
3. Ensure writer path enforces optimistic concurrency and expected version behavior.
4. Implement projector changes with idempotent handling and durable checkpoint updates.
5. Route external side effects through outbox/intent events.
6. Validate replay behavior by resetting checkpoint and reprocessing.
7. Update docs if contracts or operational rules changed.

## Hard Rules
- Keep event store append-only.
- Treat projector processing as at-least-once.
- Deduplicate by stable idempotency key (`eventId` or domain-specific key).
- Never put raw PII into domain events.
- Keep replay safe by default; do not resend side effects on replay.

## Deliverables
- Updated event type(s) and schema version notes.
- Updated projector logic and checkpoint handling.
- Replay/idempotency tests.
- Doc updates to ADR-aligned contract notes where needed.

## Quick Review Checklist
- Envelope includes: `eventId`, `streamId`, `streamPosition`, `position`, `occurredAt`, `schemaVersion`, `correlationId`, `causationId`.
- Handler is idempotent under duplicates and retries.
- Checkpoint updates are monotonic and durable.
- Side effects are outbox-driven.
- Event payload excludes raw PII.
