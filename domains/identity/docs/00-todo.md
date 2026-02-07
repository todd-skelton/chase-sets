# Identity Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Identity (auth, orgs, RBAC, step-up).

## Inputs / dependencies

- Auth baseline: `artifacts/adrs/002-auth-and-account-recovery.md`
- Org/RBAC: `domains/identity/docs/17-org-accounts-and-rbac.md`
- Step-up policy: `domains/identity/docs/32-step-up-auth-and-sensitive-actions-policy.md`
- Audit requirements: `artifacts/26-observability-slos-audit-and-incident-response.md`

## Auth & session model

- [ ] Define session/token model (cookie/session vs JWT) consistent with the web app
- [ ] Define account recovery workflow and abuse mitigations

## Org/RBAC

- [ ] Define MVP roles and permissions (seller ops vs admin)
- [ ] Define invitation + membership lifecycle

## Step-up enforcement points

- [ ] Enumerate sensitive actions that require step-up (payout, payout destination changes, admin actions)
- [ ] Define step-up credential and expiry rules

## API surface (first implementation)

- [ ] Document API contracts for:
  - [ ] Magic link sign-in
  - [ ] Org creation / invite / role change
  - [ ] Step-up challenge/verify endpoints

## Tests (when code starts)

- [ ] Abuse tests for login rate-limits
- [ ] Permission matrix tests
