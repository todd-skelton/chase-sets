# Decisions

Related: `docs/adrs/0001-initial-architecture.md`, `docs/architecture/QUALITY_ATTRIBUTES.md`

## Initial Defaults (Accepted)

- Runtime and language: TypeScript on Node.js
- UI technology: React (not implemented here)
- Primary storage: Postgres
- Architecture: modular monolith with explicit bounded contexts
- Event model: event sourcing from day one
- Search posture: OpenSearch for hybrid lexical + semantic retrieval (ADR 012)
- Payment processor: Stripe
- Auth posture: email/password, social/SSO, MFA, and passkey support
- Deployment posture: open-source container based, cloud-agnostic
- Observability: logs, metrics, traces via OpenTelemetry-compatible approach
- Security posture: baseline marketplace security; no explicit compliance regime committed

## Open Decisions

- TODO(QUESTION): Webhook scope for v1 (outbound only, inbound only, or both)
- TODO(QUESTION): Define numeric SLO targets by surface area

## ADR Link

- `docs/adrs/0001-initial-architecture.md`
