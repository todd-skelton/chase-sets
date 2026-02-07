# Trust & Safety Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Trust & Safety (counterfeit, misrepresentation, enforcement).

## Inputs / dependencies

- Enforcement requirements: `domains/trust-safety/docs/23-trust-safety-counterfeit-and-enforcement.md`
- Admin tooling requirements: `artifacts/25-admin-support-tooling-and-operations.md`
- Privacy posture (evidence retention/access): `artifacts/27-data-privacy-retention-export-and-deletion.md`

## Enforcement model

- [ ] Define takedown lifecycle and appeals
- [ ] Define strike model and thresholds (warnings → restrictions → bans)
- [ ] Define evidence attachment policy (types, access control, retention)

## Reporting and case management

- [ ] Define user reporting flows (buyer reports listing/order)
- [ ] Define case lifecycle events (opened/updated/closed)

## Cross-domain hooks

- [ ] Define integration points to:
  - [ ] Marketplace (listing takedowns)
  - [ ] Risk (org freezes)
  - [ ] Payments (payout holds)

## Tests (when code starts)

- [ ] Permission tests for evidence access
- [ ] Replay tests for case timelines
