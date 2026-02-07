# ADR 003: Bids, Listings, and Matching Model

## Status

Accepted

## Context

MVP requires:

- “Buy/sell immediately”
- “Buy/sell with bids and listings”

We need to define the matching/execution rules so the marketplace is predictable and “fair”.

## Options considered

1. Order book per Item+attributes (best bid/best ask; price-time priority)
2. Fixed-price listings + offers (bids) with seller acceptance; no automatic matching
3. Hybrid: fixed price + optional automatic match when crossing

## Decision

Use an order book per sellable SKU, where `SKU = Item + VersionPath`. "Buy now" and "Sell now" execute at the best available price in the relevant SKU order book. Matching follows price-time priority.

Execution price rule (MVP):

- Trades execute at the **resting (book) order price**.
  - New listing crosses existing offer → trade price is the offer price.
  - New offer crosses existing listing → trade price is the listing price.

Additional MVP policies:

- Partial fills are allowed.
- Self-trade prevention is enforced.

## Tradeoffs

- Pros:
- Clear, predictable price discovery and best-price execution.
- Scales to high-volume items while keeping markets distinct.
- Cons:
- More complexity around the Version system and preventing fragmented liquidity.
- Risks:
- If Versions are too granular, liquidity will fragment and time-to-fill will suffer.

## Consequences / follow-ups

- Version model and SKU mapping are defined in ADR 004 (config-driven version system).
- Define the version selector UI requirements (how users reliably choose the correct SKU).
- Define minimum tick sizes (price increments).
- Define cancellation rules and any fees/penalties.
- Define visibility (public order book vs partial depth).
