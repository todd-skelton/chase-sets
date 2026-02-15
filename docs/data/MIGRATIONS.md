# Migrations

Related: `docs/data/SCHEMA_CONVENTIONS.md`, `docs/engineering/RELEASES.md`

## Policy

- Forward-only migrations.
- Every schema change must be reviewed for backward compatibility.
- Migration scripts are deterministic and idempotent where possible.

## Rollback Strategy

- Prefer roll-forward fixes.
- If rollback is required, use compensating migration with explicit data safety notes.

## Compatibility Guidelines

- Expand and contract pattern for breaking changes.
- Deploy code that supports both old and new schema before cleanup migration.
- Protect long-running reads during migration windows.

## Operational Steps

1. Apply migrations in staging.
2. Run validation checks.
3. Deploy app changes.
4. Apply production migrations with monitoring.
