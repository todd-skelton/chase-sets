# Chase Sets Marketplace

Chase Sets is a marketplace for trading cards and collectibles.

This repository is currently a pre-code scaffold focused on product, domain, architecture, API, data, and engineering documentation.

## Current Status

- Product code: not implemented yet
- Architecture posture: modular monolith with strict bounded contexts
- Event model: event sourcing from day one
- Data store: Postgres (event store + read models)
- Payments: Stripe
- Deployment posture: open-source container based, cloud-agnostic

## Repository Structure (Canonical)

- `docs/`: canonical product, domain, architecture, API, data, engineering, planning, and ADR docs.
- `.ai/`: compact AI-first canonical summaries and conventions.
- `domains/`: domain-level requirement and terminology artifacts.
- `services/`: service-facing agent guides and future implementation surfaces.
- `infra/`: deployment and infrastructure playbooks.

## Artifact Placement Rules (Canonical)

- Keep cross-cutting product/platform documentation in `docs/`.
- Keep architecture decisions in `docs/adrs/` unless a decision is strictly module-local.
- Keep module-specific artifacts close to the owning module once implementation surfaces exist.
- Do not reintroduce top-level numbered docs under `docs/`; merge into canonical section docs.

## Dependency Boundary Rules

- Business invariants belong to bounded contexts and should not live in generic shared layers.
- Cross-context integration should happen through contracts/events, not direct ownership leaks.
- Infrastructure concerns should remain behind clear adapter boundaries.

## Quick Start For Contributors

1. Read `.ai/PROJECT_BRIEF.md`
2. Read `.ai/CONTEXT_INDEX.md`
3. Follow `CONTRIBUTING.md`
4. Use `docs/planning/STORIES_TEMPLATE.md` for new work items

## Documentation Map

- AI context: `.ai/CONTEXT_INDEX.md`
- Product: `docs/product/PRD.md`
- Domain: `docs/domain/DOMAIN_MODEL.md`
- Architecture: `docs/architecture/SYSTEM_OVERVIEW.md`
- API: `docs/api/openapi.yaml`
- Data: `docs/data/EVENT_STORE.md`
- Engineering: `docs/engineering/CODING_STANDARDS.md`
- Planning: `docs/planning/ROADMAP.md`

## License

Private repository. See `LICENSE`.
