# ADR 005: Event Sourcing and Projections

## Status

Accepted

## Context

A core tenet of Chase Sets is: **if there wasn’t an event, it never happened**.

We need:

- Realtime processing (matching, order state, wallet/balance updates)
- A distributed system with clear boundaries and replayability
- Multiple read use cases (search, order books, user dashboards, ops tooling)

## Options considered

1. CRUD-only with audit logs
2. Hybrid: CRUD + domain events
3. **Event sourced system of record with projections**

## Decision

Chase Sets is event sourced:

- The system of record is an append-only event stream/store.
- All state is derived from events.
- Read models are projections built from events and optimized per use case:
  - JSON documents
  - relational tables
  - caches
  - search indexes

## Tradeoffs

- Pros:
  - Strong auditability and replayability
  - Clear integration boundary via event streams
  - Enables realtime projections and distributed processing
- Cons:
  - Higher complexity (idempotency, replay, projection drift)
  - Event schema versioning must be disciplined
- Risks:
  - Incorrect projection logic can produce user-visible inconsistencies
  - Poor partitioning can limit scale or break ordering assumptions

## Consequences / follow-ups

- Define event envelope conventions:
  - `eventId`, `eventType`, `occurredAt`
  - `aggregateType`, `aggregateId`
  - `schemaVersion`
  - `correlationId`, `causationId`
  - `idempotencyKey`
- Define partitioning/ordering strategy:
  - Ordering guaranteed within an aggregate stream.
  - Identify critical aggregates (Order, Listing, Bid, Item, Wallet).
- Define projector guarantees:
  - at-least-once consumption
  - idempotent handlers
  - rebuild/replay process
  - monitoring for lag and drift
- Define consistency expectations:
  - which queries are eventually consistent (most projections)
  - which flows require strong consistency (checkout/payment transitions)
- Define retention and PII strategy:
  - avoid placing sensitive PII in events where possible
  - define redaction policies if required
