# Test Strategy

## Purpose
Define repository-level testing execution guidance.

## Audience
- Engineers planning and reviewing test coverage.
- AI agents generating test plans and acceptance checks.

## Scope
This document complements the canonical [Testing Standard](../standards/testing.md) with repository-specific focus areas.

## Priority Coverage Areas
- Domain invariants and aggregate decision logic.
- Event append concurrency and idempotency behavior.
- Projection replay determinism and checkpoint handling.
- API and webhook contract compatibility.
- Critical buyer and seller lifecycle flows.

## Procedure
1. Start with requirements and acceptance criteria in product/domain docs.
2. Map each requirement to at least one test layer.
3. Prefer unit and integration tests before end-to-end coverage.
4. Add regression coverage for any production-facing contract risk.
5. Keep fixtures deterministic (IDs, timestamps, and payload ordering).

## References
- [Testing Standard](../standards/testing.md)
- [State Machines](../domain/STATE_MACHINES.md)
- `../api/openapi.yaml`
