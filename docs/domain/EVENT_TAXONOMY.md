# Event Taxonomy

Related: `docs/standards/versioning.md`, `docs/data/EVENT_STORE.md`, `docs/data/READ_MODELS.md`

## Naming Rules

- Pattern: `<context>.<aggregate>.<past_tense_verb>`
- Example: `marketplace.listing.created`
- Keep `event_type` stable; do not embed version in the name (no `.vN` suffix).

## Required Metadata

- `event_id`
- `event_type`
- `event_version`
- `occurred_at`
- `aggregate_id`
- `stream_id`
- `correlation_id`
- `causation_id` (if derived)
- `actor_id` (if user/system initiated)

## Versioning and Schema Evolution

- Additive changes are preferred.
- Breaking changes require new `event_version` and explicit upcaster strategy.
- Consumers must ignore unknown fields.

## Idempotency

- Command handling must be idempotent by key.
- Duplicate command retries must not produce duplicate business outcomes.
- Event store append uses optimistic concurrency on stream version.

## Event Categories

- Domain events: business facts used by other contexts.
- Integration events: externally published, stability-focused contracts.
- System events: operational telemetry, not domain truth.

