# Testing Standard

## Purpose
Define minimum test requirements for safe delivery and contract stability.

## Audience
- Engineers implementing domain, API, and integration behavior.
- AI agents producing implementation and verification guidance.

## Scope
Applies to all current and future services and shared modules.

## Requirements
- Tests must be layered: unit, integration, contract, and targeted end-to-end.
- New behavior must include tests in the smallest effective layer.
- Event-sourced behavior must include deterministic given/when/then coverage.
- Contract changes must include compatibility tests for API and event schemas.
- Tests must be deterministic and safe to run in parallel.
- Flaky tests are defects and must be fixed before relying on results.

## Procedure
1. Add or update unit tests for domain invariants and decision logic.
2. Add integration tests for persistence, orchestration, and adapter boundaries.
3. Add contract tests for API envelopes and event payloads.
4. Add end-to-end tests only for critical user journeys.
5. Verify deterministic replay coverage where projections or event handlers are involved.

## References
- [Test Strategy](../engineering/TEST_STRATEGY.md)
- [Versioning Standard](versioning.md)
- [Error Standard](errors.md)
