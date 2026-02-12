# Infra

Infrastructure and deployment artifacts (containers, compose, etc.).

MVP posture is container-first.

See:

- `artifacts/adrs/006-containers-cdn-and-oss-baseline.md`
- `artifacts/12-delivery-and-release-model.md`

## Event Store and Projectors (Foundational Pattern)

Each bounded context uses its own Postgres database with one append-only `event_store` table.
Projectors consume events in ascending `domain_position` and persist their cursor in `projection_checkpoint.last_domain_position`.
Projectors should be idempotent and use `event_id` for dedupe when replaying/retrying.

Optimistic concurrency is enforced by `UNIQUE (aggregate_type, aggregate_id, aggregate_version)`.
Writers append with an `expected_version`; concurrent writers collide on this unique key and must retry from the latest stream version.

`event_id` supports sortable ULID or UUIDv7 values.
Use DB-generated defaults when your DB has a generator function (`gen_ulid()` or `uuidv7()`), otherwise supply IDs in the application.

Use `domain_position` for projection ordering because it is a strict, domain-local insertion sequence.
Do not use `domain_position` for domain invariants; use aggregate stream rules (`aggregate_version`) instead.
