# API Errors

Related: `.ai/CONVENTIONS.md`, `docs/api/openapi.yaml`

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

## Standard Error Codes (Initial)

- `AUTH_UNAUTHORIZED`
- `AUTH_FORBIDDEN`
- `VALIDATION_FAILED`
- `IDEMPOTENCY_CONFLICT`
- `RESOURCE_NOT_FOUND`
- `STATE_TRANSITION_INVALID`
- `RATE_LIMITED`
- `INTERNAL_ERROR`
- `UPSTREAM_PAYMENT_ERROR`

## Guidelines

- `message` is user-safe and non-sensitive.
- `details` contains machine-readable structured fields.
- `retryable` indicates safe retry behavior.
- `request_id` must be returned and logged for support correlation.
