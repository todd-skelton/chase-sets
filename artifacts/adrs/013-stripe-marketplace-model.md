# ADR 013: Stripe Marketplace Model (Connect + Checkout/Capture)

## Status

Accepted (MVP)

## Context

Payments and payouts use Stripe (ADR 001). We need a concrete Stripe product configuration that supports:

- Buyer payments (card + ACH)
- Seller payouts (on-demand where supported)
- Marketplace fee model (seller fee; buyer processing fees)
- Risk controls (holds, KYC, dispute handling)
- Company/team accounts and RBAC (multiple operators per seller)

Additional constraints now captured elsewhere:

- Listings/offers are **org-owned**.
- A buyer checkout can include **multiple sellers** and create **multiple shipments**.
- Shipping uses a **5% shipping credit** settled against actual label cost (ADR 014).
- We maintain an internal wallet/ledger as a projection (ADR 001 / event sourcing tenant).

## Options considered

1. **Connect Express (recommended default)** with marketplace-style payments and platform-controlled payout availability
2. **Connect Standard** (more seller-managed, more friction, different support/UX tradeoffs)
3. **Single-merchant MVP** (platform collects and pays out later off-platform/within platform), migrate later

## Decision

Accepted (MVP):

- Use **Stripe Connect Express**.
- Use **separate charges and transfers** on the **platform account**.
- Treat the **platform as merchant of record for MVP** (supports a single buyer charge that can be split to multiple sellers).

Sub-decision (accepted):

- Use **one combined buyer payment per checkout** and split proceeds to sellers via allocation + Stripe Connect transfers (see ADR 017).

Policy posture (MVP):

- **Chargebacks/disputes**: platform is initially liable; handled case-by-case via reason-coded unwind events.
- **Negative balances**: allowed (seller balances may go negative to support unwind/refunds/disputes); withdrawability is frozen until repaid.
- **Payout availability**: default is **delayed until delivery confirmation** (can evolve later to risk-based holds).
- **Seller eligibility**: sellers must be **18+** and provide valid identity + tax information per onboarding requirements.

## Validation questions (evidence to record)

These do not change the chosen MVP posture, but we must record evidence and limits:

- Confirm the exact Stripe primitives and limits for **single buyer charge + multiple transfers** (count, timing, fees).
- Confirm dispute/chargeback liability posture and required evidence flow for the chosen charge type.
- Confirm refund representation (partial refunds, per-seller unwind) and mapping to allocation unwind events.
- Confirm seller onboarding requirements (KYC/KYB) and that **Express** meets MVP UX/support needs.
- Confirm launch payout methods (standard payouts vs instant) and how they map to Connect configuration.
- Confirm tax reporting posture required for launch.

## Implementation notes

- Buyer pays once (single checkout PaymentIntent/charge); we allocate internally and create transfers per seller.
- Fund availability is controlled via wallet/ledger gating (withdrawability after delivery confirmation for MVP).

## Consequences / follow-ups

- Update event model with Stripe lifecycle events and reconciliation strategy.
- Define the payout availability rules and velocity limits.
- Define the refund/chargeback model relative to wallet balances.
- Define how shipping credit is funded/settled (as part of buyer charge vs separate line item vs internal allocation).

## Validation worksheet (required evidence)

Record validation as evidence-backed answers.

- Date:
- Owner:
- Stripe docs/support references:
- Summary conclusion:

Acceptance criteria:

- Confirm the exact Stripe-supported primitives for **single buyer charge + multiple transfers** (and any limits: count, timing, fees).
- Confirm dispute/chargeback liability posture for the chosen charge type (platform vs connected account) and required evidence flow.
- Confirm refund representation (partial refunds, per-seller unwind) and mapping to allocation unwind events.
- Confirm seller onboarding requirements (KYC/KYB) and that **Express** meets MVP UX/support needs.
- Confirm launch payout methods and how they map to Connect configuration.

If any acceptance criterion fails:

- Document the constraint and choose a fallback (e.g., charge-per-seller checkout, or destination/direct charges if appropriate).

## Alignment notes

- Money math and rounding invariants: see `domains/payments/docs/31-money-math-fees-shipping-credit-and-ledger-invariants.md`.
- Dispute/unwind behavior: see `domains/payments/docs/21-disputes-refunds-chargebacks-and-ledger-unwind.md`.

## Research notes (to validate before final decision)

We need to validate the exact Stripe-supported pattern for:

- Single buyer charge on the platform account
- Allocation across multiple seller balances
- Multiple transfers (one per seller) from the platform to connected accounts

If Stripe’s constraints prevent this, we fall back to charging per seller.

Suggested Stripe docs to review:

- https://docs.stripe.com/connect/charges-transfers
- https://docs.stripe.com/connect/separate-charges-and-transfers
- https://docs.stripe.com/connect/destination-charges
- https://docs.stripe.com/connect/direct-charges
