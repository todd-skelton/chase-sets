# ADR 007: Event Store Implementation (Postgres Event Streams)

## Status

Accepted

## Context

Chase Sets is event-sourced (ADR 005): domain events are the system of record and projections are derived.

We need an event store that is:

- Operationally simple for MVP
- Good enough for strict append-only semantics and optimistic concurrency
- Easy to backup/restore
- Compatible with replayable projections and idempotent projectors

## Options considered

1. Postgres-based event streams (append-only table(s) + stream/version conventions)
2. EventStoreDB

## Decision

Use **Postgres-based event streams** for MVP.

We will implement:

- A durable append-only `events` store in Postgres
- Stream identity (e.g., `stream_id`) and per-stream optimistic concurrency (`expected_version`)
- A monotonic event position for global ordering (e.g., bigserial `position`)
- An event envelope consistent with ADR 005 (contract fields `eventId`, `eventType`, `occurredAt`, `correlationId`, `causationId`, `schemaVersion`; stored internally in Postgres as needed)

## Tradeoffs

- Pros:
  - Lowest operational overhead; one primary datastore to run and back up
  - Great developer familiarity and tooling
  - Good enough for MVP scale with proper indexing and partitioning later
- Cons:
  - Some features (subscriptions, projections tooling) are DIY compared to EventStoreDB
  - Requires discipline to preserve append-only semantics and avoid ad-hoc mutation

## Consequences / follow-ups

- Define the initial Postgres event schema + indexes in the data/event model.
- Define projector consumption strategy (ADR 008).
- Confirm how we handle multi-tenant/business accounts (org streams vs per-user streams).
