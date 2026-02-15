# Schema Rollout

## Purpose
Define schema rollout rules for a forward-only event-sourced platform.

## Audience
- Engineers planning data schema updates.
- AI agents documenting operational sequencing.

## Scope
Applies to Postgres schema changes and projection schema evolution.

## Policy
- Schema rollout must be forward-only.
- Changes must be reviewed for read/write compatibility during deployment windows.
- Rollout scripts should be deterministic and repeatable.

## Compatibility Rules
- Use expand-then-contract sequencing for incompatible changes.
- Deploy code that supports old and new schema shapes before cleanup.
- Keep long-running reads safe during rollout.

## Rollout Steps
1. Apply schema changes in staging.
2. Validate read/write behavior and data integrity checks.
3. Deploy application updates.
4. Apply production rollout with monitoring.

## References
- `SCHEMA_CONVENTIONS.md`
- `../engineering/RELEASES.md`
- `../runbooks/README.md`