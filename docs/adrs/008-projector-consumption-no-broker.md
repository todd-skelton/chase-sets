# ADR 008: Projector Consumption (No Separate Broker for MVP)

## Status

Accepted

## Context

We need projectors to build and maintain read models from the event store (ADR 005).

For MVP we want the simplest reliable mechanism that supports:

- At-least-once processing
- Idempotency
- Replays
- Straightforward operations

## Options considered

1. Projectors read from the event store directly (no separate broker for MVP)
2. NATS JetStream
3. Kafka/Redpanda

## Decision

For MVP, **projectors consume events directly from the Postgres event store**, tracking their own checkpoint.

- Each projector keeps a durable checkpoint (last processed global position) in Postgres.
- Processing is at-least-once; projector handlers must be idempotent.
- Replays are done by resetting a checkpoint and reprocessing.

## Tradeoffs

- Pros:
  - Minimal infrastructure to operate early
  - Replay is straightforward
  - Keeps event sourcing “tight” and avoids premature distributed system complexity
- Cons:
  - Event store becomes both source-of-truth and primary fan-out mechanism
  - Higher read load on Postgres as projector count grows
  - Harder to support push-based subscriptions at large scale

## Consequences / follow-ups

- Define checkpoint table schema and idempotency keys.
- Add a clear “when we add a broker” threshold (lag, throughput, number of projectors).
