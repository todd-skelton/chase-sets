BEGIN;

CREATE TYPE data_classification AS ENUM (
  'public',
  'internal',
  'confidential',
  'restricted'
);

CREATE TABLE event_store (
  domain_position bigint GENERATED ALWAYS AS IDENTITY,
  event_id text NOT NULL,
  event_type text NOT NULL,
  schema_version integer NOT NULL CHECK (schema_version > 0),
  occurred_at timestamptz NOT NULL,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  producer text NOT NULL,
  aggregate_type text NOT NULL,
  aggregate_id text NOT NULL,
  aggregate_version bigint NOT NULL CHECK (aggregate_version > 0),
  correlation_id text NULL,
  causation_id text NULL,
  data jsonb NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  tenant_id text NULL,
  data_classification data_classification NOT NULL DEFAULT 'internal',
  traceparent text NULL,
  CONSTRAINT event_store_pkey PRIMARY KEY (event_id),
  CONSTRAINT event_store_domain_position_unique UNIQUE (domain_position),
  CONSTRAINT event_store_aggregate_version_unique
    UNIQUE (aggregate_type, aggregate_id, aggregate_version),
  CONSTRAINT event_store_metadata_is_object
    CHECK (jsonb_typeof(metadata) = 'object')
);

CREATE FUNCTION prevent_event_store_mutation()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'event_store is append-only (% not allowed)', TG_OP;
END;
$$;

CREATE TRIGGER event_store_append_only
  BEFORE UPDATE OR DELETE ON event_store
  FOR EACH ROW
  EXECUTE FUNCTION prevent_event_store_mutation();

-- Optional diagnostic index (adds write overhead; keep disabled unless needed):
-- CREATE INDEX event_store_recorded_at_idx ON event_store (recorded_at);

-- ID generation strategy (choose one, or allow app-supplied IDs).
-- This migration auto-selects a default only when a known generator function exists.
-- - ULID: function named gen_ulid() returning text/uuid
-- - UUIDv7: function named uuidv7() returning uuid
-- If neither function exists, event_id must be supplied by the application.
DO $$
BEGIN
  IF to_regprocedure('gen_ulid()') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE event_store ALTER COLUMN event_id SET DEFAULT gen_ulid()::text';
  ELSIF to_regprocedure('uuidv7()') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE event_store ALTER COLUMN event_id SET DEFAULT uuidv7()::text';
  END IF;
END $$;

COMMENT ON COLUMN event_store.domain_position IS
  'Strictly increasing domain-local cursor for projector catch-up and checkpointing.';
COMMENT ON COLUMN event_store.aggregate_version IS
  'Strictly increasing per aggregate stream; enforced by unique constraint.';
COMMENT ON COLUMN event_store.recorded_at IS
  'Write timestamp assigned by DB at insert time.';

COMMIT;

-- Reference query: append events atomically in one transaction (single event example).
-- BEGIN;
-- WITH stream AS (
--   SELECT COALESCE(MAX(aggregate_version), 0) AS current_version
--   FROM event_store
--   WHERE aggregate_type = $1
--     AND aggregate_id = $2
-- ),
-- guard AS (
--   SELECT current_version
--   FROM stream
--   WHERE current_version = $3
-- )
-- INSERT INTO event_store (
--   event_type,
--   schema_version,
--   occurred_at,
--   producer,
--   aggregate_type,
--   aggregate_id,
--   aggregate_version,
--   correlation_id,
--   causation_id,
--   data,
--   metadata,
--   tenant_id,
--   data_classification,
--   traceparent
-- )
-- SELECT
--   $4, $5, $6, $7, $1, $2, $3 + 1, $8, $9, $10, $11, $12, $13, $14
-- FROM guard
-- RETURNING event_id, domain_position, aggregate_version;
-- COMMIT;
--
-- Reference query: read one aggregate stream from version N (inclusive).
-- SELECT *
-- FROM event_store
-- WHERE aggregate_type = $1
--   AND aggregate_id = $2
--   AND aggregate_version >= $3
-- ORDER BY aggregate_version ASC;
--
-- Reference query: projector batch read by domain_position cursor.
-- SELECT *
-- FROM event_store
-- WHERE domain_position > $1
-- ORDER BY domain_position ASC
-- LIMIT $2;
