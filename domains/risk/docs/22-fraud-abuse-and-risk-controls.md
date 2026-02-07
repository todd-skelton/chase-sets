# 3.x Fraud, Abuse, and Risk Controls (Requirements)

## Purpose

Define a pragmatic MVP posture for fraud/abuse mitigation that fits:

- Marketplace dynamics (bids/listings, multi-seller checkout)
- Event sourcing + projections (auditability and replay)
- Stripe payments + wallet/ledger (risk/holds/chargebacks)

This is requirements-only (no implementation).

See also:

- `domains/identity/docs/32-step-up-auth-and-sensitive-actions-policy.md`

---

## Goals

- Reduce financial loss (stolen cards, chargebacks, seller non-fulfillment)
- Protect marketplace integrity (bot bidding, price manipulation)
- Protect accounts (ATO, credential stuffing—even with magic links)
- Provide operational visibility (support/admin workflows)
- Make risk posture configurable and evolvable

## Non-goals (MVP)

- Fully automated ML fraud detection
- Automated evidence generation for disputes
- Perfect prevention (we will iterate)

---

## Threat model (what we must handle)

### Payment & financial risk

- Stolen cards → chargebacks
- Friendly fraud (buyer claims not received)
- Refund abuse
- Negative balances (seller withdraws then chargeback hits)

### Marketplace manipulation

- Bot bidding / bid spam / bid shading
- Wash trading (buy/sell to self or colluding accounts)
- Fake listings / bait-and-switch

### Fulfillment abuse

- Seller ships wrong item / empty box
- Tracking number reuse
- Shipping label games (origin mismatch, late shipment)

### Account abuse

- Account takeover via compromised email
- Disposable emails / multi-accounting
- Social engineering of support

---

## Core controls (MVP)

### 1) Rate limiting + bot protection

- Rate limit:
  - auth requests (magic links)
  - listing creation
  - bid placement/updates
  - checkout attempts
  - API key/token authenticated requests (especially write endpoints)
- Add bot protection (CAPTCHA / Turnstile / similar) on:
  - repeated auth attempts
  - high-frequency bid/list actions

Notes for AI assistant/agent clients:

- Treat agentic traffic as automation: stricter default quotas, with explicit allowlisting/tiered limits.
- Prefer two-step flows for high-risk actions (preview/quote → confirm) and require step-up for commits when policy dictates.
- Ensure every API key/token can be revoked quickly (kill switch posture for compromised integrations).

### 2) Identity and device/session posture

- Track device/session history and allow revocation.
- Add step-up auth triggers for sensitive actions (see below).

### 3) Step-up auth triggers (finance + high-risk)

At minimum require step-up verification for:

- Changing payout destination
- Initiating payout
- High-value checkout
- Sudden changes in behavior (new device + payout attempt)

MVP-friendly step-up mechanisms:

- Re-auth via magic link confirmation
- Email OTP confirmation for a specific action

### 4) Risk holds and velocity limits

Policy-driven (configurable) holds:

- Hold seller funds until:
  - shipment label purchased within X hours
  - shipment delivered OR delivery + N days
  - or a risk score is below threshold

Velocity limits:

- Cap payout amount per day/week for new sellers
- Cap number/value of high-risk transactions per time window

### 5) Negative balance policy

System must support:

- Preventing payouts when balance < 0
- Recovering negative balances from future sales
- Freezing accounts/orgs with repeated disputes

### 6) Marketplace integrity controls

- Enforce bid/list rules:
  - minimum tick size
  - max update frequency
  - anti-spam constraints
- Detect and flag patterns:
  - self-dealing (same org buying from itself)
  - repeated bid cancellation patterns

### 7) Fulfillment SLAs and enforcement

- Require shipment label purchase within X hours/days.
- Penalize or restrict sellers for repeated late shipments.
- Require signature confirmation above a value threshold (policy-driven).

---

## Operational requirements (admin/support)

### Risk dashboard (minimum viable)

- Accounts/orgs flagged with reasons
- Payout holds with reason codes
- Dispute/chargeback counts by seller
- Recent high-risk events timeline

### Actions

- Freeze/unfreeze org
- Cancel bids/listings (with audit)
- Force hold funds
- Require step-up auth next action

---

## Required events (conceptual)

- `RiskRuleConfigured` (admin config changes)
- `RiskFlagRaised` / `RiskFlagCleared`
- `PayoutHeld` / `PayoutReleased`
- `OrgFrozen` / `OrgUnfrozen`
- `StepUpAuthRequired` / `StepUpAuthSatisfied`

---

## Open questions

## MVP defaults (proposed)

1. **Default hold policy for new sellers**

- For a seller’s first **10** orders (or first **30** days, whichever is longer):
  - funds are not withdrawable until **delivered + 3 days** (configurable)
- After the new-seller window:
  - funds become withdrawable at **delivered + 1 day** (configurable)

2. **Signature confirmation threshold**

- Require signature confirmation for shipments with item value >= **$500** (configurable).

3. **Payout methods at launch**

- MVP: **standard ACH only** (no instant payouts) to reduce fraud surface.

4. **Bid/listing spam controls (starting point)**

- Cap bid update attempts to **10/minute per account per SKU** (configurable).
- Escalate: repeated violations => temporary bidding cooldown and/or step-up requirement.

5. **Buyer reputation/limits**

- MVP: basic limits for new accounts (velocity limits, high-value checkout step-up, and payment failure-based cool-downs).
