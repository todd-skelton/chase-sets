---
owner: docs
status: active
audience: all
last_reviewed: 2026-02-16
---

# Architecture Decision Records

## Purpose
- Capture cross-cutting architecture commitments.
- Preserve context and tradeoffs behind major choices.
- Point engineers and agents to accepted decisions.

## Scope / Non-scope
- In scope: architecture-level decisions and constraints.
- Non-scope: implementation task tracking.

## How to Use ADRs
- Create one ADR per significant architecture decision.
- Keep context, options, and consequences explicit.
- Link affected canonical docs.

## Index
- [0001 Initial Architecture](0001-initial-architecture.md)
- [000 Template](000-template.md)
- [001 Payments and Payouts](001-payments-and-payouts.md)
- [002 Auth and Account Recovery](002-auth-and-account-recovery.md)
- [003 Offers, Listings, and Matching](003-offers-listings-and-matching.md)
- [004 Config-Driven Version System](004-config-driven-version-system.md)
- [005 Event Sourcing and Projections](005-event-sourcing-and-projections.md)
- [006 Containers, CDN, and OSS Baseline](006-containers-cdn-and-oss-baseline.md)
- [007 Postgres Event Store](007-postgres-event-store.md)
- [008 Projector Consumption Without Broker](008-projector-consumption-no-broker.md)
- [009 Ingress NGINX](009-ingress-nginx.md)
- [010 Shipping EasyPost](010-shipping-easypost.md)
- [011 TypeScript End-to-End Stack](011-typescript-e2e-stack.md)
- [012 Search Engine MVP](012-search-engine-mvp.md)
- [013 Stripe Marketplace Model](013-stripe-marketplace-model.md)
- [014 Shipping Rebate Cap](014-shipping-rebate-cap.md)
- [015 Location-Scoped Inventory](015-locations-and-inventory-scope.md)
- [016 Embedding Strategy](016-embedding-strategy.md)
- [017 Single Charge Multi-Seller Split](017-single-charge-multi-seller-split.md)
- [018 Event Store Operability and Retention](018-event-store-operability-and-retention.md)
- [019 External API Auth and Agent Access](019-external-api-auth-and-agent-access.md)

## Related docs
- `../README.md`
- `../architecture/README.md`

## Next steps
- Continue adding ADRs for new cross-cutting choices during implementation.
