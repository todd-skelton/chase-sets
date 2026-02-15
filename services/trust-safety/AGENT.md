# Trust-Safety Service Agent Guide

## Purpose
- Define ownership and rules for policy enforcement, fraud/risk signals, and moderation workflows.

## Scope
- Owns:
  - Trust policy rules, abuse/fraud signal processing, moderation decisions and audit trails.
  - Risk score outputs and enforcement actions exposed to other contexts.
- Does not own:
  - Order source-of-truth, listing source-of-truth, account authentication credentials.

## Rules
- Public interfaces:
  - OpenAPI: `services/trust-safety/openapi/openapi.yaml`
  - Events emitted: `services/trust-safety/events/emitted/`
  - Events consumed: `services/trust-safety/events/consumed/`
- Data ownership:
  - Schema prefix: `trust_safety_*`
  - Migrations: `services/trust-safety/infra/db/migrations/`
- Invariants:
  - Enforcement actions are auditable with actor, reason, and policy version.
  - Risk and moderation outcomes are deterministic for identical inputs where policy requires.
  - TODO: define appeal workflow and SLA for human review.

## Checklist
- Local commands:
  - `pnpm -C services/trust-safety test`
  - `pnpm -C services/trust-safety lint`
  - `pnpm -C services/trust-safety typecheck`
- Testing expectations:
  - Unit tests for policy and scoring rule behavior.
  - Integration tests for event-driven enforcement and audit persistence.
  - Contract tests for trust decision APIs and enforcement events.

## Links
- `AGENT.md`
- `docs/domain/SKILL.md`
- `docs/events/SKILL.md`
