# Test Strategy

Related: `docs/domain/STATE_MACHINES.md`, `docs/api/openapi.yaml`

## Test Pyramid

- Unit tests: aggregate decision logic and invariants
- Integration tests: repository, event store append, projector behavior
- Contract tests: API and webhook payload compatibility
- End-to-end tests: critical buyer/seller journeys

## Event-sourcing Specific Coverage

- Given-when-then tests over event histories
- Upcaster and event version compatibility tests
- Replay tests for projection determinism

## Test Data and Fixtures

- Use canonical fixtures for collectible versions and condition grades.
- Keep deterministic IDs and timestamps for reproducibility.
- Isolate Stripe integration tests via adapter boundaries and test doubles where possible.
