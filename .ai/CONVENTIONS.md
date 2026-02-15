# Conventions

Related: `docs/api/ERRORS.md`, `docs/domain/EVENT_TAXONOMY.md`, `docs/data/SCHEMA_CONVENTIONS.md`

## Naming

- Use `snake_case` for database identifiers.
- Use `kebab-case` for file names.
- Use `PascalCase` for TypeScript types.
- Use `camelCase` for TypeScript fields and variables.

## Repository Layout

- `docs/product`: product intent and requirements
- `docs/domain`: bounded contexts, model, events, states
- `docs/architecture`: system-level concerns
- `docs/api`: API and integration contracts
- `docs/data`: storage and data movement policies
- `docs/engineering`: quality and delivery standards
- `docs/planning`: roadmap and execution templates
- `.ai`: compact AI-first canonical context

## Event Naming

- Format: `event_type = <context>.<aggregate>.<past_tense_verb>`
- Example: `orders.order.placed`
- Keep `event_type` stable; use `event_version` as integer, starting at `1`.
- Do not encode version in the event type name (no `.vN` suffix).

## API Error Envelope

All non-2xx responses should use:

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {},
    "retryable": false,
    "request_id": "uuid"
  }
}
```

## Idempotency

- Mutating endpoints require `Idempotency-Key`.
- Persist key with request hash and result for replay-safe retries.
- Expiration window default: 24 hours unless documented otherwise.

## Correlation and Causation IDs

- Every command and emitted event should include `correlation_id`.
- Events derived from another event should include `causation_id`.
- Propagate IDs into logs, traces, and webhook deliveries.
