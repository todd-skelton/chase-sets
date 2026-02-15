# API Error Usage

## Purpose
Describe API-facing usage of the canonical error contract.

## Audience
- Engineers implementing HTTP handlers.
- AI agents generating API examples.

## Scope
This file describes usage. The canonical envelope and rules are defined in `../standards/errors.md`.

## How It Works
1. Return the standard envelope for every non-2xx response.
2. Use stable machine codes.
3. Keep `message` safe for clients.
4. Include `request_id` for support and tracing.

## Standard Codes
- `AUTH_UNAUTHORIZED`
- `AUTH_FORBIDDEN`
- `VALIDATION_FAILED`
- `IDEMPOTENCY_CONFLICT`
- `RESOURCE_NOT_FOUND`
- `STATE_TRANSITION_INVALID`
- `RATE_LIMITED`
- `INTERNAL_ERROR`
- `UPSTREAM_PAYMENT_ERROR`

## References
- `../standards/errors.md`
- `openapi.yaml`