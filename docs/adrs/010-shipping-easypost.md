# ADR 010: Shipping Integration Provider (EasyPost)

## Status

Accepted

## Context

Shipping is desired for MVP. We want an integration that can support:

- Address validation
- Label purchase
- Tracking updates
- Multiple carriers

## Options considered

1. EasyPost
2. Shippo
3. Defer shipping (manual tracking only)

## Decision

Use **EasyPost** for the initial shipping integration.

## Tradeoffs

- Pros:
  - Team familiarity
  - Supports label buying + tracking across carriers
- Cons:
  - Adds operational and support surface area to MVP (failed label purchases, address issues)

## Consequences / follow-ups

- Define the MVP fulfillment flow (when labels are purchased, who pays label cost, refunds).
- Define which carriers to support first (USPS/UPS/FedEx) and service levels.
- Model shipping events in the event stream (label purchased, tracking updated, delivered).
