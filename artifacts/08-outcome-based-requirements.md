# 3.3 Outcome-Based Requirements

## Capability statements (MVP)

- **C1:** Users can search and browse a curated Pokémon TCG catalog and select a specific sellable SKU via a guided variant selector UI.
- **C2:** Users can create and manage sell-side listings for a specific SKU with price.
- **C3:** Users can create and manage buy-side offers for a specific SKU with price.
- **C4:** Users can execute an immediate buy/sell or match offers/listings to create an order.
- **C5:** Users can complete checkout and see order state through fulfillment.
- **C6:** Platform protects payment and customer information from leakage.
- **C7:** External clients (including AI assistants/agents) can safely perform **read-only product discovery** (catalog + search) via allowlisted integration API keys with guardrails and audit attribution.

## System-level acceptance criteria

- Search results return the correct catalog items for common queries (name + set + number).
- A user can complete: search → select item → select variant (SKU) → buy now OR make an offer.
- A user can complete: search → select item → select variant (SKU) → create listing.
- Orders have a clear lifecycle and can’t end up in ambiguous “stuck” states.
- Customer/payment data is never exposed to other users; access is least-privilege.
- The platform APIs used by the web app are durable platform contracts (no special-case “internal-only” endpoints).
- MVP external/agent clients are limited to allowlisted read-only endpoints; delegated user/org access and write actions are Phase 1+ (ADR 019).

## Non-goals (requirements explicitly not needed)

- Direct integrations with other sales channels/platforms (not in MVP).
- Image scanning / computer vision identification.
- Collection tracking product surfaces.

---

## Questions to answer

## Open questions

1. What data must be exportable (orders, listings, bids, catalog?); format (CSV/JSON)?
2. What are the “must never happen” outcomes beyond PII leakage (double charge, wrong payout, sold item still listed)?
3. What admin/operator tooling is needed for MVP (catalog edits, user support, moderation, disputes)?
