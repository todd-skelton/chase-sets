# ADR 003: Offers, Listings, and Matching Model

## Status
Accepted

## Context
MVP marketplace behavior requires predictable buy/sell execution and explicit price formation per sellable version.

## Options Considered
1. Order book per sellable version with price-time priority.
2. Manual acceptance-only marketplace without automatic crossing.
3. Hybrid model with both fixed-price and crossing semantics.

## Decision
- Use an order book per sellable version.
- Match logic follows price-time priority.
- Trades execute at the resting order price.
- Partial fills are allowed.
- Self-trade prevention is required.

## Tradeoffs
- Pros: predictable pricing and deterministic execution.
- Cons: more strict version identity requirements.
- Risks: liquidity fragmentation if version granularity is too high.

## Consequences
- Version identity and resolution are critical dependencies.
- Marketplace and orders contracts must define deterministic trade payloads.

## References
- `004-config-driven-version-system.md`
- `../domain/DOMAIN_MODEL.md`