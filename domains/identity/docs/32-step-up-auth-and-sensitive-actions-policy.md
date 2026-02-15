# 5.x Step-Up Authentication and Sensitive Actions Policy (Requirements)

## Purpose

Define cross-cutting step-up authentication policy for high-risk and high-impact actions.

This document complements:

- Risk controls
- Seller onboarding/KYC and payout gating
- Admin/support tooling and auditability
- Legal/policy acceptance

This is requirements-only (no implementation).

---

## Goals

- Reduce account-takeover impact for financial and security-sensitive actions.
- Make triggers, UX expectations, and audit requirements explicit.
- Keep MVP friction reasonable (email-first, magic-link baseline).

## Non-goals (MVP)

- Full authenticator-app MFA support.
- Continuous ML risk scoring.

---

## Definitions

- **Step-up authentication**: an additional verification step beyond the active session.
- **Sensitive action**: an action that can move money, weaken account security, or materially change access.
- **StepUp Challenge**: action-bound challenge with nonce, method, and expiry.
- **Actor**: account performing an action in self or organization acting context.

---

## Sensitive actions (minimum set)

Step-up must be required for:

### Finance-sensitive

- Add/update/remove payout destination.
- Initiate payout.
- Change tax/KYC settings when payout eligibility may be affected.

### Security-sensitive

- Change primary email.
- Create/revoke integration credentials or approve delegated grants (post-MVP) for API clients acting on behalf of account/org.
- Delete account / request data deletion.
- Download high-sensitivity data exports.

### High-risk marketplace actions (policy-driven)

- High-value checkout submission above configured threshold.
- Rapid bidding/listing churn from a new device/session.

---

## Triggers (policy-driven)

Step-up triggers should include:

- New device/session.
- Unusual geo/IP reputation signals (best effort).
- Time since last successful step-up exceeds threshold.
- Action value exceeds threshold.
- Risk flags on account/org.

Trigger logic must be configurable.

---

## Step-up methods (MVP)

Allowed methods for MVP:

- Re-auth via magic-link confirmation for the specific action intent.
- Email OTP confirmation for the specific action intent.

Method selection can be policy-driven.

---

## UX requirements

- User is told why step-up is required in general terms without leaking internal risk signals.
- Challenge is bound to specific action intent and expires.
- Failure behavior is safe:
  - action is not executed
  - user can retry
  - repeated failures may trigger temporary lockout

---

## Audit requirements

Every step-up request and outcome must be auditable with:

- actor identity (`identityId`, `accountId`, optional `orgId`/`membershipId`)
- attempted action and target
- timestamp
- method used
- outcome (`required`, `satisfied`, `failed`, `expired`, `bypassed`)

---

## Admin/support requirements

- Support can see whether step-up is required or satisfied for a requested action.
- Support cannot bypass step-up for finance actions without privileged role and reason-coded override.

---

## Required events (conceptual)

- `StepUpAuthRequired`
- `StepUpAuthSatisfied`
- `StepUpAuthFailed`
- `StepUpAuthExpired`
- `StepUpAuthBypassed` (admin-only, reason-coded)

---

## MVP defaults

1. **High-value checkout threshold**

- Require step-up at checkout submission when cart total (items + shipping) >= **$250** (configurable).

2. **Payout destination changes**

- Require step-up for creating first payout destination and all subsequent updates/removals.

3. **Lockout policy**

- Max **5** failed step-up attempts per **15 minutes** per account.
- After limit is exceeded, block step-up attempts for **30 minutes**.
- If **10** failures occur in **24 hours**, require support review to unlock.

## Implementation Checklist
- Step-up policy must enumerate sensitive actions and required assurance level.
- Step-up verification windows must be explicit and bounded.
- Audit logs must capture step-up trigger, challenge method, and verification outcome.
- Step-up policy should align with payout and administrative risk controls.
