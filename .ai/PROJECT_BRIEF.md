# Project Brief

Related: `.ai/CONTEXT_INDEX.md`, `docs/product/PRD.md`, `docs/architecture/SYSTEM_OVERVIEW.md`

## Problem

Collectors and sellers need a trusted, transparent marketplace for trading cards and collectibles with clear condition language, fair matching, and reliable order-to-payout operations.

## Audience

- Buyers: collectors and investors
- Sellers: individual and business merchants
- Operators: support, trust and safety, finance, and platform engineering

## Non-goals (Initial)

- Physical grading services operated by Chase Sets
- Proprietary shipping carrier infrastructure
- On-chain settlement or crypto-native payments

## Core Flows

1. Identity and account setup (including passkeys)
2. Listing and discovery
3. Offer and matching
4. Checkout and payment capture
5. Fulfillment, delivery, and confirmation
6. Payout and dispute handling

## Constraints

- Event sourcing is a first-class architectural commitment
- Stripe is the initial payment processor
- Open-source container deployment posture, cloud-agnostic
- Keep docs compact, canonical, and strongly cross-linked

## Success Metrics (Initial)

- Listing-to-sale conversion rate
- Time from payment capture to payout eligibility
- Dispute rate and fraud loss rate
- Search success rate and zero-result rate
- TODO(QUESTION): target metric values and SLO thresholds
