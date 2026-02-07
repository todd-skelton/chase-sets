# 1.1 Product Vision & Narrative (PR/FAQ style)

## One-liner

Chase Sets is a fair marketplace for buying and selling Pokémon TCG collectibles, backed by a curated catalog.

## Problem

Collectors and TCG players want to buy/sell quickly with confidence, but existing solutions can be unfair (fees/price gaps), error-prone (messy catalog/variants), or high-friction (hard to find the exact condition/grade).

For MVP, “fair” means providing a transparent and equitable marketplace where buyers and sellers can transact with confidence, supported by clear policies, competitive fees, and protections against fraud and non-fulfillment. Operational costs are shared equitably and shaped by behavior where users can reduce cost (e.g., larger orders to reduce shipping cost per item).

## Who it’s for

Primary: collectors and Pokémon TCG players.

## Why now

The Pokémon TCG market is active and variant-heavy (singles, sealed, graded). A curated catalog + fair marketplace mechanics is a wedge to earn trust and liquidity.

## The product (future state)

Chase Sets provides:

- A curated Pokémon TCG catalog (singles, sealed product, graded items) with canonical naming.
- A marketplace workflow where users can search for an item, pick the form they want (e.g., raw vs graded, grade, sealed), then either:
  - buy/sell immediately, or
  - buy/sell via offers and listings.
- A channel-ready, API-first platform so integrations are possible later, even if MVP is web-first.
  - Marketplace (Chase Sets) is the first channel.
  - In-store and third-party channels are future adapters over the same platform.
  - AI assistant/agent clients (e.g., ChatGPT, Gemini, etc.) can help users search, compare, and transact via the same platform APIs (with consent + guardrails).

## What success looks like (1–3 years)

- Strong, repeat liquidity: collectors reliably buy/sell weekly.
- Catalog trust: low mismatch rates, clear variants, and consistent item definitions.
- Expandable platform: additional channels and integrations can be layered on without redesign.

## Explicit non-goals / out of scope

- Direct integration with other marketplaces/platforms (MVP non-goal; architecture is designed to add channels later).
- Image scanning / card identification (MVP non-goal).
- Collection tracking as a primary product surface (MVP non-goal).

## FAQ

### Q: Why can’t users do X?

A: MVP focuses on a single-channel marketplace experience (web + native platform mechanics). Integrations and automation come later.

### Q: What does “Chase Sets” mean?

A: It’s the platform name. Initially the product focus is the Pokémon TCG marketplace with a curated catalog; “chase” reflects the collectible culture of hunting specific cards/items.

### Q: What categories are supported?

A: Pokémon TCG singles, sealed product, and graded items.

### Q: Can I use it on mobile?

A: Web-first for MVP.

---

## Questions to answer

## Open questions

Locked MVP answers:

1. Launch constraints: **US-only + USD**.
2. 3-year “we won” headline:

- In 3 years, Chase Sets is the leading online marketplace for Pokémon TCG items, with over 1 million active users, facilitating $100 million in annual transaction volume, and maintaining a 95% customer satisfaction rate.

Still open:

1. Confirm how shipping is presented in MVP UX (EasyPost labels; buyer vs seller label payment).
