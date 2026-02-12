BEGIN;

CREATE TYPE projection_failure_status AS ENUM (
  'failed',
  'skipped',
  'resolved'
);

CREATE TABLE projection_checkpoint (
  projection_name text PRIMARY KEY,
  last_domain_position bigint NOT NULL DEFAULT 0 CHECK (last_domain_position >= 0),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE projection_failures (
  projection_name text NOT NULL,
  event_id text NOT NULL,
  domain_position bigint NOT NULL,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  attempts integer NOT NULL DEFAULT 1 CHECK (attempts > 0),
  last_error text NOT NULL,
  status projection_failure_status NOT NULL DEFAULT 'failed',
  updated_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz NULL,
  CONSTRAINT projection_failures_pkey PRIMARY KEY (projection_name, event_id),
  CONSTRAINT projection_failures_event_id_fkey
    FOREIGN KEY (event_id) REFERENCES event_store(event_id),
  CONSTRAINT projection_failures_domain_position_fkey
    FOREIGN KEY (domain_position) REFERENCES event_store(domain_position),
  CONSTRAINT projection_failures_resolved_at_guard CHECK (
    (status <> 'resolved' AND resolved_at IS NULL) OR
    (status = 'resolved' AND resolved_at IS NOT NULL)
  )
);

CREATE INDEX projection_failures_retry_idx
  ON projection_failures (projection_name, status, domain_position);

COMMENT ON TABLE projection_checkpoint IS
  'One row per projector consumer in this domain DB.';
COMMENT ON TABLE projection_failures IS
  'Optional capture of projector processing failures for retries/manual resolution.';

COMMIT;

-- Reference query: update projector checkpoint monotonically.
-- INSERT INTO projection_checkpoint (projection_name, last_domain_position)
-- VALUES ($1, $2)
-- ON CONFLICT (projection_name) DO UPDATE
-- SET
--   last_domain_position = GREATEST(
--     projection_checkpoint.last_domain_position,
--     EXCLUDED.last_domain_position
--   ),
--   updated_at = now()
-- RETURNING projection_name, last_domain_position, updated_at;
--
-- Reference query: upsert a projector failure and increment attempts.
-- INSERT INTO projection_failures (
--   projection_name,
--   event_id,
--   domain_position,
--   last_error,
--   status
-- )
-- VALUES ($1, $2, $3, $4, 'failed')
-- ON CONFLICT (projection_name, event_id) DO UPDATE
-- SET
--   attempts = projection_failures.attempts + 1,
--   last_error = EXCLUDED.last_error,
--   status = 'failed',
--   updated_at = now();
