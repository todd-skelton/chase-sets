# Testing Standard

## Purpose
- Define minimum testing expectations for safe, fast delivery.

## Scope
- Applies to all services and shared packages.

## Rules
- Use a testing pyramid:
  - Unit tests for domain logic and invariants.
  - Integration tests for application workflows and DB interactions.
  - Contract tests for API and event schemas.
  - Targeted e2e tests for critical user journeys.
- New behavior requires tests in the smallest effective layer.
- Keep tests deterministic and parallel-safe.
- Flaky tests are defects and must be fixed quickly.

## Checklist
- [ ] Unit tests added for new domain logic.
- [ ] Integration tests cover persistence and orchestration paths.
- [ ] Contract tests validate API/event compatibility.
- [ ] Critical path e2e updated when user journey changes.
