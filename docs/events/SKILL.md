# Events Playbook

## Purpose
- Standardize event design, publishing, and consumption across contexts.

## Scope
- Applies to all domain and integration events.

## Rules
- Naming convention: `event_type = <context>.<aggregate>.<past_tense_verb>`
- Required envelope fields:
  - `event_id`
  - `event_type`
  - `event_version`
  - `occurred_at`
  - `aggregate_id`
  - `correlation_id`
  - `causation_id`
- Idempotency strategy:
  - Producers emit stable `eventId` per fact.
  - Consumers store processed `eventId` (or deterministic key) and ignore duplicates.
- Outbox publishing notes:
  - Write domain state and outbox record in the same DB transaction.
  - Publisher reads outbox, sends event, marks dispatched with retry metadata.
- Backward compatibility rules:
  - Additive fields only within same `event_version`.
  - Breaking change requires a new `event_version` and compatibility plan.

## Checklist
1. Define event purpose and owning context.
2. Freeze envelope and payload schema.
3. Validate versioning and compatibility impact.
4. Implement outbox write in transaction.
5. Add consumer idempotency checks.
6. Add contract tests for publish and consume paths.
7. Document event path in `services/<context>/events/*`.

## Links
- `docs/standards/versioning.md`
- `docs/standards/testing.md`
- `SKILL.md`
