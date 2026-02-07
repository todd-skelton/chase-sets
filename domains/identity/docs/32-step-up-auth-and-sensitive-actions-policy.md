# 5.x Step-Up Authentication and Sensitive Actions Policy (Requirements)

## Purpose

Define a cross-cutting step-up authentication policy for high-risk and high-impact actions.

This complements:

- Fraud/risk controls
- Seller onboarding/KYC and payout gating
- Admin/support tooling and auditability
- Legal/policy acceptance

This is requirements-only (no implementation).

---

## Goals

- Reduce account takeover impact for financial and security-sensitive actions.
- Make triggers, UX expectations, and audit requirements explicit.
- Keep MVP friction reasonable (email-first, magic link baseline).

## Non-goals (MVP)

- Full MFA app support (can come later).
- Continuous risk scoring ML.

---

## Definitions

- **Step-up auth**: an additional verification step beyond the current session.
- **Sensitive action**: an action that can move money, change payout destinations, or weaken account security.

---

## Sensitive actions (minimum set)

Step-up must be required for:

### Finance-sensitive

- Add/update/remove payout destination
- Initiate payout
- Change tax/KYC settings (if it affects payout eligibility)

### Security-sensitive

- Change primary email
- Create/revoke API keys or authorize external integrations (including AI assistants/agents) acting on behalf of the user/org
- Delete account / request data deletion
- Download data export (large or high-sensitivity export)

### High-risk marketplace actions (policy-driven)

- High-value checkout submission (threshold)
- Rapid bidding/listing churn from a new device/session

---

## Triggers (policy-driven)

Step-up triggers should include:

- New device/session
- Unusual geo/IP reputation signals (best-effort)
- Time since last step-up exceeds threshold
- Action value exceeds threshold
- Risk flags on the account/org

The trigger system must be configurable.

---

## Step-up methods (MVP-friendly)

Allowed methods for MVP:

- Re-auth via magic link confirmation for the specific action
- Email OTP confirmation for the specific action

Method selection can be policy-driven.

---

## UX requirements

- The user must be told _why_ step-up is required in general terms (without leaking risk signals).
- Step-up must be bound to a specific action intent (nonce) and expire.
- Failures must be safe:
  - action is not executed
  - user can retry
  - repeated failures may trigger temporary lockout

---

## Audit requirements

Every step-up request and outcome must be auditable:

- who requested (user/account id)
- what action was attempted
- timestamp
- method used
- outcome (required, satisfied, failed, expired)

---

## Admin/support requirements

- Support agents can see whether step-up is required/has been satisfied for a requested action.
- Support should not be able to bypass step-up for finance actions without a privileged role and a reason-coded override.

---

## Required events (conceptual)

Existing events:

- `StepUpAuthRequired`
- `StepUpAuthSatisfied`

Recommended additions:

- `StepUpAuthFailed`
- `StepUpAuthExpired`
- `StepUpAuthBypassed` (admin-only; reason-coded)

---

## Open questions

## MVP defaults (proposed)

1. **High-value checkout threshold**

- Require step-up at checkout submission when cart total (items + shipping) >= **$250** (configurable).

2. **Payout destination**

- Require step-up for **creating the first** payout destination and for all subsequent updates/removals.

3. **Lockout policy**

- Step-up attempts are rate limited:
  - max **5** failures per **15 minutes** (per account)
  - after exceeding, block step-up attempts for **30 minutes**
- Escalation:
  - if **10** failures in **24 hours**, require support review to unlock
