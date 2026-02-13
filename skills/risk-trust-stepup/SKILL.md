---
name: risk-trust-stepup
description: Implement or update risk controls, trust and safety enforcement hooks, and step-up authentication gating in Chase Sets. Use when adding sensitive-action checks, holds/freezes, case actions, or cross-domain enforcement events.
---

# Risk Trust Step-Up

## Read First
- `AGENT.md`
- `domains/identity/docs/32-step-up-auth-and-sensitive-actions-policy.md`
- `domains/identity/docs/17-org-accounts-and-rbac.md`
- `domains/risk/docs/22-fraud-abuse-and-risk-controls.md`
- `domains/trust-safety/docs/23-trust-safety-counterfeit-and-enforcement.md`
- `artifacts/23-domain-boundary-ownership-clarifications.md`
- `artifacts/25-admin-support-tooling-and-operations.md`

## Workflow
1. Identify the action and owning domain state transition.
2. Apply policy checks for risk flags, thresholds, and step-up triggers.
3. Enforce SoR boundary rules:
   - Risk emits holds/signals.
   - Trust and Safety emits enforcement decisions.
   - Payments/Marketplace/Orders apply state transitions in their own domain.
4. Record reason-coded, auditable events for each enforcement action.
5. Ensure support/admin views can inspect requirement state and outcomes.
6. Add abuse-rate limits and lockout behavior where applicable.

## Hard Rules
- Sensitive finance and security actions require step-up.
- Risk cannot directly mutate payout or listing state; it emits gating signals.
- Trust and Safety owns enforcement decisions; consuming domains execute state transitions.
- All overrides and bypasses are privileged, reason-coded, and auditable.

## Deliverables
- Policy-driven step-up and gating checks.
- Cross-domain enforcement event contracts.
- Admin/support visibility for holds, cases, and step-up outcomes.
- Tests for policy evaluation and permission boundaries.

## Quick Review Checklist
- Trigger conditions are configurable and not hardcoded to one threshold.
- Actor context (`identityId`, `accountId`, optional `orgId`) is captured.
- Bypass paths are tightly scoped and audited.
- Holds/freezes/reinstatements are reason-coded.
- Domain SoR boundaries are respected.
