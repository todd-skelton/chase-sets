# ADR 0001: Initial Architecture

## Purpose
- Capture the baseline architecture for Chase Sets Marketplace.

## Context
- The product starts as a multi-tenant trading-card marketplace and must scale into broader collectibles.
- Teams need clear context ownership, stable contracts, and low-friction delivery.
- Early architecture should favor reliability, auditability, and incremental evolution.

## Decision
- Use a TypeScript Node.js monorepo organized by bounded contexts under `services/`.
- Start with a modular monolith posture and explicit seams for later extraction.
- Use Postgres as primary data store and outbox transport for initial event publishing.
- Use REST APIs with OpenAPI-first contracts.
- Enforce domain, application, and infrastructure layering with inward dependencies.
- Treat events and API schemas as versioned public contracts.

## Alternatives Considered
- Distributed microservices with a broker from day one.
  - Rejected due to operational overhead and premature complexity.
- GraphQL-first API surface.
  - Rejected for initial phase to simplify contract governance and external integration.
- Shared database schema across contexts.
  - Rejected because it breaks context autonomy and evolution safety.

## Consequences
- Positive:
  - Faster iteration with consistent patterns and stronger ownership boundaries.
  - Better auditability through explicit contracts and outbox-based event trails.
- Tradeoffs:
  - Additional discipline required for contract/version governance.
  - Eventual migration to broker/stream platform may require infrastructure transition work.

## Follow-ups
- TODO: choose initial auth provider and token format standards.
- TODO: define SLO/SLA baselines for API latency and event delivery lag.
- TODO: document tenancy isolation model for analytics and search indexes.
- TODO: decide timeline for outbox-to-broker evolution criteria.
