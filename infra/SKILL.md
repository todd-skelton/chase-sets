# Infrastructure Playbook

## Purpose
Align environment, data-rollout, and observability expectations.

## Scope
Applies to service runtime, deployment, and shared platform configuration.

## Rules
- Environments:
  - `local`: local and feature-branch validation.
  - `staging`: production-like pre-release validation.
  - `production`: customer-facing workloads.
- Secrets management:
  - Commit only placeholders in `.env.example`.
  - Runtime secrets must come from a managed secret store.
- Data rollout cadence:
  - Apply forward-only schema rollout steps per deployment unit.
  - Prefer small, frequent expand/contract-compatible updates.
- Observability wiring:
  - Structured logs, metrics, and tracing enabled by default.
  - Include `correlationId`, `tenantId`, and service name in telemetry.

## Checklist
1. Verify environment config keys are documented.
2. Confirm secrets source and rotation plan.
3. Validate data-rollout ordering and rollback safety.
4. Ensure traces, metrics, and logs are emitted.
5. Link new operational risks in runbook.

## References
- [Runbooks](../docs/runbooks/README.md)
- [Testing Standard](../docs/standards/testing.md)
- [Versioning Standard](../docs/standards/versioning.md)
