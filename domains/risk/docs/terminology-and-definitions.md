# Risk Terminology & Definitions

This document defines the ubiquitous language for the **Risk domain**.

Risk owns fraud/abuse detection, gating, and risk controls that influence actions across Marketplace, Orders, and Payments.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Risk Signal

A **Risk Signal** is an input used to assess risk (device, account history, velocity, prior disputes, etc.).

### Risk Decision

A **Risk Decision** is the result of evaluation (allow, review, block) for a requested action.

### Gating

**Gating** is the act of preventing or delaying an action based on risk decisions.

---

## Boundaries

Risk references:

- Identity (who is acting)
- Marketplace/Orders/Payments (what action is being requested)

Risk does not own:

- Enforcement policy outcomes (Trust & Safety)
