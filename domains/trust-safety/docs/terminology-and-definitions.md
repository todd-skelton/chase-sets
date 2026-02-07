# Trust & Safety Terminology & Definitions

This document defines the ubiquitous language for the **Trust & Safety domain**.

Trust & Safety owns policy, enforcement, and integrity outcomes (counterfeit handling, user/seller enforcement actions, reporting, and appeals).

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Policy

A **Policy** is a rule describing acceptable behavior/content/items.

### Report

A **Report** is a user/system-submitted allegation or signal requiring review.

### Case

A **Case** is the internal investigation unit that groups evidence and decisions.

### Enforcement Action

An **Enforcement Action** is a consequence applied to an account/org/listing (warning, delist, suspend, ban).

### Appeal

An **Appeal** is a request to review an enforcement action.

---

## Boundaries

Trust & Safety references:

- Identity (who is affected)
- Marketplace/Orders (what is being enforced)

Trust & Safety does not own:

- Risk scoring algorithms (Risk)
