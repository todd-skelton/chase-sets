# Chase Sets — Documentation Index

This repository is currently **documentation-first** (no production code yet).

## Start here

- Cross-cutting product/platform docs: [artifacts/README.md](artifacts/README.md)
- Domain/module docs (Catalog, Marketplace, Orders, Payments, Fulfillment, Search, Identity, Risk, Trust & Safety): [domains/README.md](domains/README.md)
- ADRs (system-wide decisions): [artifacts/adrs/README.md](artifacts/adrs/README.md)
- Progress tracker / backlog notes: [plan.md](plan.md)

## Quick links (core)

- Product vision: [artifacts/01-product-vision.md](artifacts/01-product-vision.md)
- Domain model & glossary: [artifacts/02-domain-model-and-glossary.md](artifacts/02-domain-model-and-glossary.md)
- MVP scope & non-goals: [artifacts/03-mvp-scope-and-non-goals.md](artifacts/03-mvp-scope-and-non-goals.md)
- Domain map & integration architecture: [artifacts/15-domain-map-and-integration-architecture.md](artifacts/15-domain-map-and-integration-architecture.md)
- Channels & integrations architecture: [artifacts/17-channels-and-integrations-architecture.md](artifacts/17-channels-and-integrations-architecture.md)
- MVP workflows & event flows: [artifacts/18-mvp-workflows-and-event-flows.md](artifacts/18-mvp-workflows-and-event-flows.md)
- MVP decisions to lock (cross-cutting): [artifacts/19-mvp-decisions-to-lock.md](artifacts/19-mvp-decisions-to-lock.md)
- MVP problem statements & user stories: [artifacts/20-mvp-problem-statements-and-user-stories.md](artifacts/20-mvp-problem-statements-and-user-stories.md)
- MVP initiatives, epics, stories & tasks: [artifacts/21-initiatives-epics-stories-and-tasks.md](artifacts/21-initiatives-epics-stories-and-tasks.md)
- Slice 1 spec (Catalog discovery): [artifacts/22-slice-1-catalog-discovery.md](artifacts/22-slice-1-catalog-discovery.md)
- Architecture overview: [artifacts/04-system-architecture-overview.md](artifacts/04-system-architecture-overview.md)
- Data & event model (event sourcing): [artifacts/09-data-and-event-model.md](artifacts/09-data-and-event-model.md)

## Navigation notes

- `artifacts/` is intentionally **cross-cutting**.
- Domain-specific detail lives under `domains/*/docs/`.
- Links should point directly to the canonical domain docs under `domains/*/docs/` (we do not keep redirect stubs).
- Every domain must maintain a **Terminology & Definitions** doc (`domains/<domain>/docs/terminology-and-definitions.md`) and use that ubiquitous language to model and name entities, commands, events, and APIs.
