# Infrastructure Playbook

## Purpose
- Align environment, secrets, migrations, and observability expectations.

## Scope
- Applies to service runtime, deployment, and shared platform configuration.

## Rules
- Environments:
  - `local`: local and feature branch testing.
  - `staging`: production-like integration and pre-release verification.
  - `production`: customer-facing workloads.
  - TODO: define promotion gates between `staging` and `production`.
- Secrets management:
  - Commit only placeholders in `.env.example`.
  - Real secrets must come from managed secret store at runtime.
- Migration cadence:
  - Run forward-only DB migrations per deployment unit.
  - Prefer small, frequent migrations using expand/contract strategy.
- Observability wiring:
  - Structured logs, metrics, and tracing enabled by default.
  - Include `correlationId`, `tenantId`, and service name in telemetry.

## Checklist
1. Verify environment config keys are documented.
2. Confirm secrets source and rotation plan.
3. Validate migration ordering and rollout safety.
4. Ensure traces, metrics, and logs are emitted.
5. Link new operational risks in runbook.

## Links
- `docs/runbooks/README.md`
- `docs/standards/testing.md`
- `docs/standards/versioning.md`
