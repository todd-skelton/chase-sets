# Error Standard

## Purpose
- Define a stable API error shape and handling expectations.

## Scope
- Applies to all service HTTP responses and integration boundary adapters.

## Rules
- Use a consistent JSON envelope:
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
  - `code`: stable machine-readable error code.
  - `message`: safe human-readable summary.
  - `details`: optional structured validation or domain details.
  - `retryable`: indicates safe retry behavior.
  - `request_id`: support correlator returned to clients and logged.
- Do not leak stack traces, SQL messages, secrets, or provider internals.
- Map domain failures to deterministic status codes.
- Preserve idempotency semantics for retriable operations.

## Checklist
- [ ] Error code documented and stable.
- [ ] `request_id` included.
- [ ] Sensitive data redaction verified.
- [ ] Contract tests cover error responses.

## Open Questions
- TODO: finalize shared error code namespace by context.
