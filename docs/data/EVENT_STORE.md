# Event Store

Related: `docs/domain/EVENT_TAXONOMY.md`, `docs/data/READ_MODELS.md`

## Store Model

Postgres-backed event store is the source of truth for event-sourced contexts.

## Stream Strategy

Two viable patterns:

- Per-aggregate streams (`orders-<order_id>`): strong locality and version checks.
- Shared per-context streams (`orders`): easier broad subscriptions.

Initial recommendation:
- Use per-aggregate streams for write consistency.
- Publish projector feeds by context for read scalability.

## Retention

- Domain events are retained long term for audit and replay.
- Operational/system events may have bounded retention.
- TODO(QUESTION): formal event retention windows by category

## Projections and Replay

- Projections are disposable and rebuildable.
- Track projector checkpoints for replay recovery.
- Run replay in controlled batches to avoid production saturation.
