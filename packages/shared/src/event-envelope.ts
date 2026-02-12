export type DataClassification =
  | "public"
  | "internal"
  | "confidential"
  | "restricted";

declare const eventTypeBrand: unique symbol;
export type EventType = string & { readonly [eventTypeBrand]: true };

export interface AggregateRef {
  aggregate_type: string;
  aggregate_id: string;
}

export interface EventEnvelope<TData = unknown> extends AggregateRef {
  event_id: string;
  event_type: EventType | string;
  schema_version: number;
  occurred_at: Date | string;
  recorded_at: Date | string;
  producer: string;
  aggregate_version: bigint;
  correlation_id: string | null;
  causation_id: string | null;
  data: TData;
  metadata: Record<string, unknown>;
  tenant_id: string | null;
  data_classification: DataClassification;
  traceparent: string | null;
}

export interface PersistedEventEnvelope<TData = unknown>
  extends EventEnvelope<TData> {
  domain_position: bigint;
}

export interface ProjectorCheckpoint {
  projection_name: string;
  last_domain_position: bigint;
  updated_at: Date | string;
}

export interface SqlQueryResult<TRow> {
  rows: TRow[];
  rowCount: number;
}

export interface SqlClient {
  query<TRow = unknown>(
    sql: string,
    params?: readonly unknown[],
  ): Promise<SqlQueryResult<TRow>>;
}

export interface SqlDatabase {
  withTransaction<T>(handler: (tx: SqlClient) => Promise<T>): Promise<T>;
}

export interface AppendEventInput<TData = unknown> {
  event_id?: string;
  event_type: EventType | string;
  schema_version: number;
  occurred_at: Date | string;
  producer: string;
  correlation_id?: string | null;
  causation_id?: string | null;
  data: TData;
  metadata?: Record<string, unknown>;
  tenant_id?: string | null;
  data_classification?: DataClassification;
  traceparent?: string | null;
}

export const SQL_GET_STREAM_VERSION = `
SELECT COALESCE(MAX(aggregate_version), 0)::text AS current_version
FROM event_store
WHERE aggregate_type = $1
  AND aggregate_id = $2
`;

export const SQL_INSERT_EVENT_WITH_ID = `
INSERT INTO event_store (
  event_id,
  event_type,
  schema_version,
  occurred_at,
  producer,
  aggregate_type,
  aggregate_id,
  aggregate_version,
  correlation_id,
  causation_id,
  data,
  metadata,
  tenant_id,
  data_classification,
  traceparent
) VALUES (
  $1, $2, $3, $4, $5,
  $6, $7, $8, $9, $10,
  $11, $12, $13, $14, $15
)
RETURNING
  event_id,
  event_type,
  schema_version,
  occurred_at,
  recorded_at,
  producer,
  aggregate_type,
  aggregate_id,
  aggregate_version::text AS aggregate_version,
  correlation_id,
  causation_id,
  data,
  metadata,
  tenant_id,
  data_classification,
  traceparent,
  domain_position::text AS domain_position
`;

export const SQL_INSERT_EVENT_USING_DEFAULT_ID = `
INSERT INTO event_store (
  event_type,
  schema_version,
  occurred_at,
  producer,
  aggregate_type,
  aggregate_id,
  aggregate_version,
  correlation_id,
  causation_id,
  data,
  metadata,
  tenant_id,
  data_classification,
  traceparent
) VALUES (
  $1, $2, $3, $4, $5,
  $6, $7, $8, $9, $10,
  $11, $12, $13, $14
)
RETURNING
  event_id,
  event_type,
  schema_version,
  occurred_at,
  recorded_at,
  producer,
  aggregate_type,
  aggregate_id,
  aggregate_version::text AS aggregate_version,
  correlation_id,
  causation_id,
  data,
  metadata,
  tenant_id,
  data_classification,
  traceparent,
  domain_position::text AS domain_position
`;

export const SQL_LOAD_STREAM = `
SELECT
  event_id,
  event_type,
  schema_version,
  occurred_at,
  recorded_at,
  producer,
  aggregate_type,
  aggregate_id,
  aggregate_version::text AS aggregate_version,
  correlation_id,
  causation_id,
  data,
  metadata,
  tenant_id,
  data_classification,
  traceparent,
  domain_position::text AS domain_position
FROM event_store
WHERE aggregate_type = $1
  AND aggregate_id = $2
  AND aggregate_version >= $3
ORDER BY aggregate_version ASC
`;

export const SQL_READ_FOR_PROJECTION = `
SELECT
  event_id,
  event_type,
  schema_version,
  occurred_at,
  recorded_at,
  producer,
  aggregate_type,
  aggregate_id,
  aggregate_version::text AS aggregate_version,
  correlation_id,
  causation_id,
  data,
  metadata,
  tenant_id,
  data_classification,
  traceparent,
  domain_position::text AS domain_position
FROM event_store
WHERE domain_position > $1
ORDER BY domain_position ASC
LIMIT $2
`;

export const SQL_UPDATE_PROJECTION_CHECKPOINT = `
INSERT INTO projection_checkpoint (
  projection_name,
  last_domain_position
) VALUES ($1, $2)
ON CONFLICT (projection_name) DO UPDATE
SET
  last_domain_position = GREATEST(
    projection_checkpoint.last_domain_position,
    EXCLUDED.last_domain_position
  ),
  updated_at = now()
RETURNING
  projection_name,
  last_domain_position::text AS last_domain_position,
  updated_at
`;

type EventStoreRow<TData> = {
  event_id: string;
  event_type: string;
  schema_version: number;
  occurred_at: Date | string;
  recorded_at: Date | string;
  producer: string;
  aggregate_type: string;
  aggregate_id: string;
  aggregate_version: string;
  correlation_id: string | null;
  causation_id: string | null;
  data: TData;
  metadata: Record<string, unknown>;
  tenant_id: string | null;
  data_classification: DataClassification;
  traceparent: string | null;
  domain_position: string;
};

type ProjectionCheckpointRow = {
  projection_name: string;
  last_domain_position: string;
  updated_at: Date | string;
};

export class OptimisticConcurrencyError extends Error {
  constructor(
    readonly aggregate_type: string,
    readonly aggregate_id: string,
    readonly expected_version: bigint,
    readonly actual_version: bigint,
  ) {
    super(
      `Optimistic concurrency conflict for ${aggregate_type}/${aggregate_id}. ` +
        `Expected version ${expected_version}, actual ${actual_version}.`,
    );
    this.name = "OptimisticConcurrencyError";
  }
}

export function buildEventType(
  domain: string,
  entity: string,
  action: string,
  version: number,
): EventType {
  if (!Number.isInteger(version) || version < 1) {
    throw new Error("event type version must be a positive integer");
  }

  const parts = [domain, entity, action].map(normalizeEventTypePart);
  return `${parts[0]}.${parts[1]}.${parts[2]}.v${version}` as EventType;
}

export function validateEventEnvelope(
  value: unknown,
): asserts value is EventEnvelope<unknown> {
  if (!value || typeof value !== "object") {
    throw new Error("event envelope must be an object");
  }

  const event = value as Partial<EventEnvelope>;
  requireNonEmptyString("event_id", event.event_id);
  requireNonEmptyString("event_type", event.event_type);
  requirePositiveInt("schema_version", event.schema_version);
  requireDateLike("occurred_at", event.occurred_at);
  requireDateLike("recorded_at", event.recorded_at);
  requireNonEmptyString("producer", event.producer);
  requireNonEmptyString("aggregate_type", event.aggregate_type);
  requireNonEmptyString("aggregate_id", event.aggregate_id);
  requireBigIntAtLeastOne("aggregate_version", event.aggregate_version);
  requireNullableString("correlation_id", event.correlation_id);
  requireNullableString("causation_id", event.causation_id);
  if (event.data === undefined) {
    throw new Error("data is required");
  }
  requireObject("metadata", event.metadata);
  requireNullableString("tenant_id", event.tenant_id);
  requireNullableString("traceparent", event.traceparent);

  if (!event.data_classification) {
    throw new Error("data_classification is required");
  }
  if (!isDataClassification(event.data_classification)) {
    throw new Error(
      "data_classification must be one of public, internal, confidential, restricted",
    );
  }
}

export async function appendToStream<TData>(
  db: SqlDatabase,
  aggregate_type: string,
  aggregate_id: string,
  expected_version: bigint,
  events: readonly AppendEventInput<TData>[],
): Promise<PersistedEventEnvelope<TData>[]> {
  if (events.length === 0) {
    return [];
  }

  return db.withTransaction(async (tx) => {
    const versionResult = await tx.query<{ current_version: string }>(
      SQL_GET_STREAM_VERSION,
      [aggregate_type, aggregate_id],
    );
    const actualVersion = BigInt(versionResult.rows[0]?.current_version ?? "0");
    if (actualVersion !== expected_version) {
      throw new OptimisticConcurrencyError(
        aggregate_type,
        aggregate_id,
        expected_version,
        actualVersion,
      );
    }

    const persisted: PersistedEventEnvelope<TData>[] = [];

    for (let i = 0; i < events.length; i += 1) {
      const nextVersion = expected_version + BigInt(i + 1);
      const event = events[i];
      validateAppendEventInput(event);

      try {
        const inserted = event.event_id
          ? await tx.query<EventStoreRow<TData>>(SQL_INSERT_EVENT_WITH_ID, [
              event.event_id,
              event.event_type,
              event.schema_version,
              event.occurred_at,
              event.producer,
              aggregate_type,
              aggregate_id,
              nextVersion.toString(),
              event.correlation_id ?? null,
              event.causation_id ?? null,
              event.data,
              event.metadata ?? {},
              event.tenant_id ?? null,
              event.data_classification ?? "internal",
              event.traceparent ?? null,
            ])
          : await tx.query<EventStoreRow<TData>>(SQL_INSERT_EVENT_USING_DEFAULT_ID, [
              event.event_type,
              event.schema_version,
              event.occurred_at,
              event.producer,
              aggregate_type,
              aggregate_id,
              nextVersion.toString(),
              event.correlation_id ?? null,
              event.causation_id ?? null,
              event.data,
              event.metadata ?? {},
              event.tenant_id ?? null,
              event.data_classification ?? "internal",
              event.traceparent ?? null,
            ]);

        persisted.push(mapEventStoreRow(inserted.rows[0]));
      } catch (error) {
        if (isUniqueViolation(error)) {
          throw new OptimisticConcurrencyError(
            aggregate_type,
            aggregate_id,
            expected_version,
            actualVersion,
          );
        }
        throw error;
      }
    }

    return persisted;
  });
}

export async function loadStream<TData>(
  client: SqlClient,
  aggregate_type: string,
  aggregate_id: string,
  fromVersion: bigint = 1n,
): Promise<PersistedEventEnvelope<TData>[]> {
  const result = await client.query<EventStoreRow<TData>>(SQL_LOAD_STREAM, [
    aggregate_type,
    aggregate_id,
    fromVersion.toString(),
  ]);

  return result.rows.map(mapEventStoreRow);
}

export async function readForProjection<TData>(
  client: SqlClient,
  afterDomainPosition: bigint,
  limit: number,
): Promise<PersistedEventEnvelope<TData>[]> {
  if (!Number.isInteger(limit) || limit < 1) {
    throw new Error("limit must be a positive integer");
  }

  const result = await client.query<EventStoreRow<TData>>(SQL_READ_FOR_PROJECTION, [
    afterDomainPosition.toString(),
    limit,
  ]);
  return result.rows.map(mapEventStoreRow);
}

export async function updateProjectionCheckpoint(
  client: SqlClient,
  projection_name: string,
  last_domain_position: bigint,
): Promise<ProjectorCheckpoint> {
  requireNonEmptyString("projection_name", projection_name);
  if (last_domain_position < 0n) {
    throw new Error("last_domain_position must be >= 0");
  }

  const result = await client.query<ProjectionCheckpointRow>(
    SQL_UPDATE_PROJECTION_CHECKPOINT,
    [projection_name, last_domain_position.toString()],
  );

  const row = result.rows[0];
  return {
    projection_name: row.projection_name,
    last_domain_position: BigInt(row.last_domain_position),
    updated_at: row.updated_at,
  };
}

function mapEventStoreRow<TData>(
  row: EventStoreRow<TData>,
): PersistedEventEnvelope<TData> {
  return {
    event_id: row.event_id,
    event_type: row.event_type,
    schema_version: row.schema_version,
    occurred_at: row.occurred_at,
    recorded_at: row.recorded_at,
    producer: row.producer,
    aggregate_type: row.aggregate_type,
    aggregate_id: row.aggregate_id,
    aggregate_version: BigInt(row.aggregate_version),
    correlation_id: row.correlation_id,
    causation_id: row.causation_id,
    data: row.data,
    metadata: row.metadata,
    tenant_id: row.tenant_id,
    data_classification: row.data_classification,
    traceparent: row.traceparent,
    domain_position: BigInt(row.domain_position),
  };
}

function validateAppendEventInput<TData>(
  event: AppendEventInput<TData>,
): void {
  requireNonEmptyString("event_type", event.event_type);
  requirePositiveInt("schema_version", event.schema_version);
  requireDateLike("occurred_at", event.occurred_at);
  requireNonEmptyString("producer", event.producer);
  if (event.event_id !== undefined) {
    requireNonEmptyString("event_id", event.event_id);
  }
  requireNullableString("correlation_id", event.correlation_id);
  requireNullableString("causation_id", event.causation_id);
  requireNullableString("tenant_id", event.tenant_id);
  requireNullableString("traceparent", event.traceparent);
  if (event.metadata !== undefined) {
    requireObject("metadata", event.metadata);
  }
  if (event.data === undefined) {
    throw new Error("data is required");
  }
  if (
    event.data_classification !== undefined &&
    !isDataClassification(event.data_classification)
  ) {
    throw new Error(
      "data_classification must be one of public, internal, confidential, restricted",
    );
  }
}

function normalizeEventTypePart(value: string): string {
  const normalized = value.trim().toLowerCase().replace(/\s+/g, "-");
  if (!normalized || !/^[a-z0-9._-]+$/.test(normalized)) {
    throw new Error(
      `event type segment "${value}" is invalid; allowed chars: a-z, 0-9, ., _, -`,
    );
  }
  return normalized;
}

function requireNonEmptyString(name: string, value: unknown): void {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${name} must be a non-empty string`);
  }
}

function requirePositiveInt(name: string, value: unknown): void {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    throw new Error(`${name} must be a positive integer`);
  }
}

function requireNullableString(name: string, value: unknown): void {
  if (value === null || value === undefined) {
    return;
  }
  if (typeof value !== "string") {
    throw new Error(`${name} must be a string or null`);
  }
}

function requireDateLike(name: string, value: unknown): void {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      throw new Error(`${name} must be a valid Date`);
    }
    return;
  }

  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
      throw new Error(`${name} must be an ISO-8601 date string or Date`);
    }
    return;
  }

  throw new Error(`${name} must be an ISO-8601 date string or Date`);
}

function requireObject(name: string, value: unknown): void {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${name} must be an object`);
  }
}

function requireBigIntAtLeastOne(name: string, value: unknown): void {
  if (typeof value !== "bigint" || value < 1n) {
    throw new Error(`${name} must be a bigint >= 1`);
  }
}

function isDataClassification(value: string): value is DataClassification {
  return (
    value === "public" ||
    value === "internal" ||
    value === "confidential" ||
    value === "restricted"
  );
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}
