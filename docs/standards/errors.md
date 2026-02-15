# Error Standard

## Purpose
Define the canonical API error contract.

## Audience
- Engineers implementing API and integration handlers.
- AI agents writing API documentation and examples.

## Scope
Applies to all HTTP and integration boundary error responses.

## Error Envelope
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

## Requirements
- `code` must be stable and machine-readable.
- `message` must be safe for client exposure.
- `details` should contain structured fields only.
- `retryable` must reflect safe retry semantics.
- `request_id` must be returned and logged.

## Operational Rules
- Systems must not leak stack traces, SQL internals, or secrets.
- Services should map domain failures to deterministic status codes.
- Contract tests must validate error envelope shape.

## References
- `../api/ERRORS.md`
- `versioning.md`
- `testing.md`