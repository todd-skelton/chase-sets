# Product Requirements Document (PRD)

Related: `.ai/PROJECT_BRIEF.md`, `docs/product/REQUIREMENTS.md`, `docs/product/ACCEPTANCE_CRITERIA.md`

## Vision

Build a trusted marketplace for trading cards and collectibles where buyers and sellers can transact with clear condition standards, fair rules, and reliable outcomes.

In one line: Chase Sets is a fair marketplace for buying and selling collectibles backed by a curated catalog.

## Target Users

- Casual collectors
- Professional sellers and shops
- Marketplace operations staff

## Problem Statement

Current marketplaces often combine inconsistent condition language, fragmented catalog quality, and unclear post-purchase outcomes. Users may be able to transact quickly, but not always confidently. MVP should prioritize trust, correctness, and predictable outcomes over feature volume.

## Why Now

Collectibles markets are active and version-heavy. A curated catalog plus consistent marketplace mechanics is a practical wedge to build trust and repeat liquidity before expanding into deeper integrations.

## Product Goals

- Standardized listing and condition semantics
- Safe and predictable transaction lifecycle
- Strong trust and fraud controls
- Scalable architecture from MVP to V1

## Product Shape (Future State)

- Curated catalog support for singles, sealed product, graded items, and other collectible formats over time.
- Marketplace workflow where users search for an item, choose the form/version they want, and buy/sell immediately or via listings/offers.
- API-first platform where the web app is the first client and external clients can integrate through the same contracts under guardrails.
- Support for assistant and agent clients through explicit consent, scoped permissions, and auditable actions.

## Success Metrics (1-3 Years)

- Strong repeat liquidity: buyers and sellers reliably complete transactions week over week.
- Catalog trust: low mismatch rates and stable version semantics.
- Transaction reliability: high completion rate from checkout to delivered order.
- Expansion readiness: additional channels can be layered on without redesign of core contracts.

## Non-goals

- Operating a grading lab
- Owning a shipping carrier network
- Direct third-party marketplace integrations in MVP
- Image scanning/card identification in MVP
- Collection tracking as a primary product surface in MVP

## MVP Scope (High-level)

- Identity and account recovery with passkey support
- Listing, offer, and matching flow
- Checkout with Stripe
- Fulfillment tracking and seller payout lifecycle
- Disputes baseline workflow

## FAQ (Policy-Relevant)

### Why cannot users do every integration workflow in MVP?

MVP focuses on a single-channel marketplace experience first. The architecture keeps room for future channel adapters and external integrations.

### What categories are in scope?

MVP focuses on trading cards and adjacent collectibles; taxonomy can expand once catalog and transaction quality are stable.

### Can assistants/agents use the platform?

Yes, through the same platform APIs with explicit consent, scoped access, and strong audit controls.
