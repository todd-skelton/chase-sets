# 6. Living Artifacts

## Roadmap (living)

### Now

- Confirm Stripe approach (Connect type, merchant-of-record posture, holds/disputes) and capture as an ADR.
- Define semantic/vector search details (top queries, day-1 facets, embedding strategy) and capture as an ADR.
- Confirm whether we need step-up auth for finance actions in MVP.

### Next

- Define Postgres event schema + projector checkpoint schema.
- Sketch the first projections (catalog search, SKU order books, wallet/balance).
- Define EasyPost MVP shipping flow and events.
- Define shipping credit details (cap overage handling; multi-item orders; credit allocation).
- Define locations/inventory constraints (multi-shipment UX; shipment-splitting rules; consolidation enhancement scope).

Non-blocking UX details (later):

- Exact checkout UI for per-shipment shipping line items
- Cart consolidation optimization heuristics

### Later

- Add message broker (NATS/Kafka) if projector load warrants it.
- Add advanced search/relevance tuning and/or migrate search engine.
- Expand auth options (password, OAuth) and step-up auth.

## What must stay current

- Glossary
- Architecture overview
- ADRs
- Metrics dashboard links

---

## Questions to answer

1. What are the top 5 roadmap bets?
2. What are “kill criteria” (signals we should stop/pivot)?
3. What is the desired pricing/monetization (if any)?
4. What partnerships/integrations are strategic?
5. What do you want automated vs manual operations?
