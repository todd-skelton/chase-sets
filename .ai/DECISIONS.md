# Decisions

## Purpose
Provide a compact list of currently accepted defaults.

## Accepted Defaults
- Runtime target: TypeScript on Node.js.
- Architecture: modular monolith with bounded contexts.
- Data model: event sourcing with Postgres-backed event store.
- Search: OpenSearch for MVP.
- Payments: Stripe.
- Observability: structured logs, metrics, and traces.

## Source of Truth
Architecture decisions must be recorded in ADRs.

## References
- `docs/adrs/README.md`
- `docs/adrs/0001-initial-architecture.md`