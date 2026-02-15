# Acceptance Criteria

Related: `docs/product/REQUIREMENTS.md`, `docs/planning/DEFINITION_OF_DONE.md`

## Cross-cutting Criteria

- Every user-visible flow has measurable acceptance criteria.
- Every mutating action is idempotent.
- All key domain transitions emit versioned events.
- Errors conform to `docs/api/ERRORS.md` envelope.

## Examples

- AC-1 (Listing): creating a listing persists canonical condition grade from glossary.
- AC-2 (Order): a successful checkout emits `orders.order.placed` exactly once per idempotency key.
- AC-3 (Payout): payout cannot transition to paid before settlement eligibility rules pass.
- AC-4 (Dispute): dispute opening records actor, reason, and timestamp in event stream.

## Exit Criteria For MVP Doc Readiness

- PRD, requirements, and user flows are cross-linked and internally consistent.
- Domain model and state machines cover all required lifecycle transitions.
