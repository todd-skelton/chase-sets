# Reputation Domain — Scope & Model (Requirements)

## Purpose

Define the module-level scope and core model for the reputation bounded context:

- Buyer and seller ratings
- Written reviews and feedback
- Aggregated reputation signals displayed across the marketplace

This is requirements-only (no implementation).

---

## Canonical references

- Ubiquitous language: `docs/domain/glossary.md`
- Orders lifecycle: `domains/orders/docs/01-orders-scope-and-lifecycle.md`
- Trust & Safety enforcement: `domains/trust-safety/docs/23-trust-safety-counterfeit-and-enforcement.md`

---

## Responsibilities

The Reputation domain owns:

- Rating and review lifecycle (submission, publication, edits, removals)
- Eligibility and timing rules for leaving feedback
- Aggregation and presentation of reputation scores
- Visibility rules (public, private, suppressed)

The Reputation domain does NOT own:

- Enforcement actions, bans, or policy decisions (Trust & Safety domain)
- Order creation, payment state, or fulfillment tracking (Orders/Payments/Fulfillment domains)
- Identity verification or account authentication (Identity domain)

---

## Core entities (conceptual)

- **Rating**: a structured score (e.g., 1–5) left by a buyer or seller.
- **Review**: the written narrative and tags attached to a rating.
- **Feedback Window**: the time period after a completed order in which feedback can be submitted.
- **Reputation Profile**: an aggregated view of ratings/reviews for an organization or account.
- **Reputation Signal**: derived metrics (average rating, response rate, recent score) used in UI.

---

## Invariants (MVP)

- A rating/review must be associated with a completed order.
- Only participants in the order can leave feedback for each other.
- Each order produces at most one rating/review per participant.
- Moderation actions do not delete source events; they change visibility state.

---

## Key events (conceptual)

- `FeedbackEligibilityOpened`
- `RatingSubmitted` / `RatingUpdated`
- `ReviewSubmitted` / `ReviewEdited`
- `FeedbackHidden` / `FeedbackRestored`
- `ReputationRecalculated`

---

## Read models / projections (MVP)

- Organization reputation summary (average rating, total reviews, recent trend)
- Review list (filterable by rating, date, buyer/seller role)
- Order history feedback status (eligible, pending, submitted)

---


## Implementation Checklist
- Reputation policy must define feedback eligibility and submission windows.
- Moderation controls should define visibility states and escalation triggers.
- Reputation projections should include profile signals and feedback status.
- Domain events should include actor and decision context for moderation actions.
