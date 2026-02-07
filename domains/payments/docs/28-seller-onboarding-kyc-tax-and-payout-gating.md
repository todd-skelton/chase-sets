# 5.x Seller Onboarding, KYC/KYB, Tax, and Payout Gating (Requirements)

## Purpose

Define cross-cutting requirements for seller onboarding and compliance posture that affect:

- Payments and payouts
- Fraud/risk holds and velocity limits
- Admin/support operations
- Privacy and retention

This is requirements-only (no implementation).

---

## Goals

- Enable sellers to start selling quickly while controlling payout risk.
- Make verification requirements explicit, policy-driven, and auditable.
- Support marketplace compliance needs (identity verification and tax reporting posture).
- Provide clear gating rules for payouts and high-risk actions.

## Non-goals (MVP)

- Supporting every global tax/compliance regime.
- Perfect automated verification decisioning.
- A full seller CRM.

---

## Definitions

- **Seller**: an Organization that can list items and receive proceeds.
- **KYC/KYB**: identity/business verification requirements (handled by Stripe Connect verification flows in MVP).
- **Payout destination**: bank account or equivalent destination used for payouts (details delegated to the payout provider).
- **Payout gating**: rules that determine when funds become withdrawable.

---

## Onboarding stages (minimum viable)

The system must represent seller readiness via stages (policy-driven):

1. **Created**: org exists; can browse.
2. **CanSell (restricted)**: can create listings and sell, but withdrawals may be restricted.
3. **CanWithdraw (conditional)**: payouts enabled subject to holds/velocity limits.
4. **Suspended/Restricted**: cannot sell and/or cannot withdraw.

---

## Verification requirements

### 1) Identity/business verification (KYC/KYB)

Requirements:

- The platform must support requiring verification before enabling payouts.
- Verification requirements must be policy-driven and vary by:
  - payout volume
  - dispute/chargeback history
  - account age / seller history
  - risk flags

MVP posture (directional):

- Sellers must be **18+** and complete identity + tax requirements before selling.
- Withdrawability is restricted until verification is satisfied.

### 2) Payout destination verification

Requirements:

- Changing payout destination is a sensitive action and must require step-up auth.
- Payout destination changes must be auditable and may trigger temporary payout holds.

### 3) Tax information collection posture

Requirements:

- The platform must be able to collect and store references to required tax forms/info (without storing more than necessary).
- The platform must support a policy for when tax information becomes required (e.g., before first payout, or after crossing thresholds).

Note: exact form types and thresholds are jurisdiction-dependent and should be treated as configuration.

---

## Payout gating and risk holds

### Gating rules (must be supported)

Payout eligibility must be blocked or limited when:

- KYC/KYB is required but not complete
- Tax information is required but missing
- There are open disputes/chargebacks above policy thresholds
- The org is frozen/suspended
- Balance is negative (policy-driven)

### Holds and velocity limits

- Default holds/velocity limits must be policy-driven and can be stricter for new sellers.
- Holds can be triggered by risk flags or trust/safety actions.

Locked MVP default hold posture:

- Funds are not withdrawable until **delivery confirmation** (can evolve later to risk-based holds).

---

## User-facing requirements (seller experience)

Sellers must be able to see:

- Current onboarding stage
- What is required next (verification steps)
- Payout eligibility status and reason codes
- Expected hold periods (if any)

The UX must not disclose internal risk signals in a way that enables evasion.

---

## Admin/support requirements

Admins/support need:

- View seller onboarding stage and verification status
- View payout gating reasons
- Apply temporary holds and overrides (role-gated)
- Trigger verification re-check or request additional documentation (if supported)

All actions must be auditable.

---

## Privacy and retention considerations

- Do not place raw identity documents in domain events.
- If documents are collected, they must have strict access controls and retention windows.
- All sensitive data access must be audited (ties to the privacy and observability artifacts).

---

## Required events (conceptual)

- `SellerOnboardingStarted` / `SellerOnboardingUpdated`
- `SellerVerificationRequired` / `SellerVerificationSubmitted` / `SellerVerificationPassed` / `SellerVerificationFailed`
- `TaxInfoRequired` / `TaxInfoSubmitted` / `TaxInfoVerified`
- `PayoutDestinationAdded` / `PayoutDestinationUpdated` / `PayoutDestinationRemoved`
- `PayoutEligibilityChanged` (reason-coded)

(Existing events still apply: `OrgFrozen`, `OrgSuspended`, `PayoutHeld`, `StepUpAuthRequired`.)

---

## Open questions

1. Do we allow selling before KYC/KYB, or require verification before first listing?

- MVP: require verification (18+ and valid ID) before selling.

2. Do we require tax info before first payout, or only after a threshold?

- MVP: require tax info as part of seller eligibility (before selling / first payout).

3. Do we want instant payouts at launch, or only standard payouts?
4. What is the default hold policy for new sellers (first N orders / first N days)?

- MVP: hold until delivery confirmation (baseline), then evolve to risk-based holds.

5. What are the initial payout velocity limits you want (daily/weekly caps)?
