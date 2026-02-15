# ADR 018: Event Store Operability, Retention, and Idempotency

## Status
Accepted

## Context
The platform uses Postgres-backed event streams and projector processing. Operational correctness depends on deterministic replay, checkpointing, and idempotent consumers.

## Options Considered
1. Per-aggregate streams with projector checkpoints.
2. Larger shared streams with indexed selectors.
3. Broker-assisted fanout while Postgres remains source of truth.

## Decision
- Keep Postgres as the event source of truth.
- Use per-aggregate stream strategy.
- Require projector idempotency.
- Use at-least-once projector semantics with checkpointing.
- Retain event streams indefinitely for baseline posture.

## Requirements
- Event envelopes must include stable identifiers and trace fields.
- Projectors must persist last processed position and failure state.
- Replay operations must be deterministic.
- Side effects must be replay-safe through explicit dedupe controls.

## Consequences
- Operational tooling must support checkpoint reset and controlled replay.
- Event payloads should avoid raw personal data where possible.

## References
- `007-postgres-event-store.md`
- `008-projector-consumption-no-broker.md`
- `../data/EVENT_STORE.md`