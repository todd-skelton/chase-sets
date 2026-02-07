# Risk Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Risk (fraud/abuse controls, holds, velocity).

## Inputs / dependencies

- Risk controls: `domains/risk/docs/22-fraud-abuse-and-risk-controls.md`
- Step-up policy: `domains/identity/docs/32-step-up-auth-and-sensitive-actions-policy.md`
- Payout/withdrawability policies live in Payments; risk provides the gating signals

## Policy model

- [ ] Define a policy configuration model (limits, thresholds, allow/deny lists)
- [ ] Define reason codes and audit fields for all risk actions

## Enforcement points

- [ ] Define enforcement hooks for:
  - [ ] account creation/login
  - [ ] bid/listing creation
  - [ ] checkout
  - [ ] payout request
- [ ] Define holds/velocity limit mechanics and required events

## Admin workflows

- [ ] Define org freeze/unfreeze workflow and dual-approval constraints
- [ ] Define manual review workflow (queue + decision events)

## Tests (when code starts)

- [ ] Policy evaluation tests
- [ ] Replay tests for risk projections
