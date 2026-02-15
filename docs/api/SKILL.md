# API Playbook

## Purpose

- Standardize REST API design and delivery with an OpenAPI-first workflow.

## Scope

- Applies to all HTTP endpoints in `services/*`.

## Rules

- Endpoint versioning strategy: URL versioning (`/v1/...`).
- Define or update OpenAPI before implementation.
- Use canonical error format from `docs/standards/errors.md`.
- Pagination conventions:
  - Cursor pagination for unbounded lists.
  - Include `nextCursor` and `pageSize` with deterministic sort key.
  - Enforce max page size server-side.
- Filtering conventions:
  - Explicit filter params, no implicit fuzzy matching in core APIs.
  - Document defaults and allowed operators in OpenAPI.
- AuthN/AuthZ boundaries:
  - Authenticate at edge, authorize in application use case.
  - Enforce tenant scoping in queries and commands.
- Idempotency:
  - All mutating endpoints require `Idempotency-Key`.
  - Replays by the same key must return the same semantic outcome.
- Guardrails:
  - Rate limits and quotas are required.
  - Scope limits by IP, account, organization, and auth method where applicable.
  - Prefer async/batch workflows for heavy operations.
- External and assistant/agent clients:
  - Use the same platform contracts as first-party clients.
  - Start allowlisted and scoped in MVP.
  - Require explicit consent and strong auditing for user/org delegated actions.
  - High-impact actions should support preview/quote semantics before commit when feasible.

## Checklist

1. Update `services/<context>/openapi/openapi.yaml` first.
2. Add validation for request params/body.
3. Apply authn and authz checks.
4. Return standard errors and status codes.
5. Add unit/integration/contract tests.
6. Add metrics, traces, and structured logs.
7. Update service `AGENT.md` and runbook when behavior changes.

## Links

- `docs/standards/errors.md`
- `docs/standards/versioning.md`
- `docs/standards/testing.md`
