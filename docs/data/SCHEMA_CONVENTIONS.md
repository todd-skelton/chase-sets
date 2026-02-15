# Schema Conventions

Related: `docs/data/MIGRATIONS.md`, `docs/data/EVENT_STORE.md`

## Naming

- Tables: `snake_case`, singular by aggregate or projection purpose
- Columns: `snake_case`
- Primary keys: `id` (UUID)
- Foreign keys: `<referenced_table>_id`

## Standard Columns

- `created_at` (UTC timestamp)
- `updated_at` (UTC timestamp)
- `deleted_at` (nullable, for soft delete when needed)
- `created_by` and `updated_by` where audit context matters

## Event Tables

- Immutable rows only
- Required metadata columns from event taxonomy
- JSON payload column with explicit schema version

## Data Integrity

- Use constraints for invariants where practical.
- Prefer explicit unique indexes for business identity.
- Keep enum-like domain concepts in code + docs unless stable enough for DB enum.
