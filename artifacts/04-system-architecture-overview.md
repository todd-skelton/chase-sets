# 4.1 System Architecture Overview

## Summary

Web-first, API-first marketplace platform for Pokémon TCG collectibles, built to support multiple channels over time.

API-first posture (locked): the marketplace web client uses the same platform APIs available to external clients (including AI assistant/agent clients), with guardrails (rate limits/quotas, pagination, async bulk workflows) to prevent overload.

The system serves a curated catalog and enables buyers/sellers to transact via immediate buy/sell or offers/listings (internally: bids/listings). MVP intentionally avoids third-party channel adapters/integrations.

## Components (initial)

- **Web app (static)**: built static assets served from an object store + CDN.
- **CDN**: caches and serves static assets globally; also suitable for public images.
- **Channel adapters**: integration surfaces for sales channels (MVP: Chase Sets web marketplace; future: in-store/POS and third-party platforms).
- **API (core)**: catalog read APIs, marketplace APIs (offers/listings/matching), checkout/order APIs, payment APIs.
- **Container runtime/orchestrator**: runs API + background processors as containers (local compose; prod Kubernetes).
- **Edge/Ingress**: routes to API containers; terminates TLS (NGINX Ingress).
- **Variant system**: configuration-driven Variant Models and validation powering the variant selector UI.
- **Search/index**: OpenSearch indexing CatalogItems plus SKU facets derived from VariantPath (hybrid lexical + vector; see ADR 012).
- **Event Store (system of record)**: append-only event streams; if it wasn’t an event, it never happened.
- **Projections / Read models**: materialized views derived from events (JSON documents, relational tables, caches) depending on use case.
- **Projectors**: background processors that consume events and maintain projections.
- **Auth**: user identity + sessions.
- **Orders/Checkout**: checkout + order lifecycle state machine and orchestration between Marketplace, Payments, and Fulfillment.
- **Payments (Stripe)**: card + ACH rails; keep PCI scope minimal.
- **Wallet/Ledger**: on-platform balance used for purchases (free) and withdrawals.
- **Payouts**: user-triggered payouts on demand (as supported by Stripe).
- **Shipping integration (EasyPost)**: label purchase + tracking updates.
- **Observability**: logs, metrics, traces; security monitoring for PII.

## Domain boundaries (context map)

High-level domain responsibilities and integration contracts are captured in:

- [15-domain-map-and-integration-architecture.md](15-domain-map-and-integration-architecture.md)
- [17-channels-and-integrations-architecture.md](17-channels-and-integrations-architecture.md)

## Data flows (narrative)

1. User loads the web app via CDN → static assets served.
2. User searches catalog → API serves results from projections/read models.
3. User selects a catalog item → variant selector UI resolves a VariantPath (SKU).
4. User creates listing (sell) or offer (buy) OR adds to cart (cart items are `SKU + quantity`, not a specific listing).
5. For offers/listings: API validates and appends domain events to the Event Store.
6. Projectors consume events → update projections (market views / order books, user portfolios, search facets, etc.).
7. When a match occurs (immediate buy/sell or later match) → Marketplace appends execution events → Orders creates checkout/orders.
8. At checkout submission, Orders may select listings to fulfill cart items (optimizer) and then requests payment.
9. Buyer pays via balance (free) or external payment rails (ACH/card with processing fees) → payment events recorded; Stripe IDs stored.
10. Seller proceeds accrue to seller balance (via ledger projection); seller can withdraw via on-demand payout.
11. Shipping/fulfillment updates append events; projectors update order status views.

## Trust boundaries / security zones

- Public client ↔ API
- API ↔ Event Store
- API ↔ Projection stores
- API ↔ payments provider

## Diagram (placeholder)

```text
[Browser] -> [CDN] -> [Static Web Assets]
    |            |
    |            +-> [API Edge/Ingress] -> [API Containers] -> [Event Store]
    |                                 -> [Projection Stores]
    |                                 -> [Payments]
    |                                 -> [Shipping]
    +-> (API calls)

[Projectors] <- [Event Store] -> [Projection Stores]
```

---

## Questions to answer

## Open questions

Locked MVP answers (captured elsewhere):

1. Stripe posture (ADR 013): Connect Express, platform merchant-of-record, separate charges/transfers, delayed seller withdrawability until delivery confirmation; platform initially liable for chargebacks.
2. Matching model: partial fills allowed; crossing auto-matches; execution price is the resting order price; self-trade prevention required.
3. Launch constraints: US-only + USD.
4. Embeddings: semantic/vector search is in MVP; hosted embedding API posture in ADR 016.

Still open:

1. Expected scale in first 90 days (active users, listings, QPS) to size search and DB.
2. Semantic search specifics: day-1 facets and top queries (canonical list lives in the Search requirements doc).
3. Locations/inventory: pickup/kiosk/in-store scope and any constraints that affect fulfillment.
4. Company accounts: do we require step-up auth for finance actions in MVP?
