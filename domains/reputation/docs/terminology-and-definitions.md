# Reputation Terminology & Definitions

This document defines the ubiquitous language for the **Reputation domain**.

The Reputation domain owns buyer/seller feedback, ratings, reviews, and aggregated reputation signals derived from completed marketplace orders.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Feedback

**Feedback** is the combined act of leaving a rating and/or review for a completed order participant.

### Rating

A **Rating** is a structured numeric score that represents satisfaction (example: 1–5).

### Review

A **Review** is written commentary attached to a rating, optionally including structured tags.

### Feedback Window

A **Feedback Window** is the eligibility period after an order is completed in which feedback can be submitted.

### Feedback Eligibility

**Feedback Eligibility** is the rule set that determines when a participant can leave feedback (order completion, time window, role).

### Reputation Profile

A **Reputation Profile** is the aggregated public view of ratings and reviews for an organization or account.

### Reputation Signal

A **Reputation Signal** is a derived metric (average rating, review count, recent trend) used in ranking and UI badges.

### Feedback Visibility

**Feedback Visibility** is the presentation state of feedback (published, hidden, or removed from public view).

---

## Boundaries

Reputation references:

- Orders completion status to open feedback windows.
- Trust & Safety actions that may hide or restore feedback.

Reputation does not own:

- Enforcement decisions or account bans.
- Order creation, payment state, or fulfillment tracking.
