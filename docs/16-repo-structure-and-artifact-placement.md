# Monorepo Structure & Artifact Placement (Accepted)

## Status

Accepted

## Goal

Start as a **single monorepo** for the entire Chase Sets marketplace while keeping modules **well isolated** and keeping documentation/decisions **close to the code they govern**.

This document defines:

- A proposed repo layout
- Module boundaries and dependency rules
- Where artifacts and ADRs should live

No implementation is implied by this doc.

---

## Guiding principles

1. **Modules own their docs**: documentation and ADRs live in (or near) the module they affect.
2. **Stable domain core**: the domain model (events, commands, invariants) should not depend on infrastructure or UI.
3. **Replaceable infrastructure**: event store, search, and third-party integrations are behind ports/adapters.
4. **Product-level docs stay product-level**: cross-cutting vision/metrics/principles live in one place.

---

## Proposed repository layout

Recommendation: keep the top level minimal and semantics-driven:

- `artifacts/` = cross-cutting product + platform documentation (doc-first)
- `apps/` = deployable entrypoints (“services”)
- `domains/` = domain modules (bounded contexts)
- `packages/` = shared libraries and integrations (non-domain)
- `infra/` = infra/runbooks/ops docs (implementation later)

---

## Critical review (risks & tradeoffs)

This layout is workable, but it has real failure modes.

### Risk 1: Top-level sprawl and “false clarity”

Splitting `domains/` and `packages/` can _look_ clean while still allowing messy boundaries.

- Symptom: domain logic leaks into `packages/` (or vice versa) because “shared” is convenient.
- Outcome: the folder names stop enforcing anything; you get coupling anyway.

Mitigation:

- Treat `packages/` as **supporting** only: no business rules, no domain event ownership.
- Require domain ownership: any file encoding business invariants must live under `domains/`.

### Risk 2: Tooling friction (workspaces + build graph)

Many monorepo tools assume a single “packages root”, but modern tooling can handle multiple roots.

- Symptom: extra configuration for workspaces/build tooling.
- Outcome: small papercuts early.

Mitigation:

- Adopt a “workspace packages are everything under `apps/`, `domains/`, `packages/`” convention.
- Keep cross-import rules explicit in docs (and later enforce with linting).

### Risk 3: Over-isolation slows iteration

If MVP needs fast iteration, strict boundaries can create ceremony.

- Symptom: boilerplate adapters everywhere.
- Outcome: slow learning loop.

Mitigation:

- Start with “clean boundaries by default”, but allow pragmatic exceptions with ADRs.
- Prefer small seams (ports) only at the true integration points (Stripe/EasyPost/search/storage).

### Risk 4: Documentation fragmentation

“Docs close to modules” can turn into “docs scattered everywhere”.

- Symptom: no single place to understand the product end-to-end.
- Outcome: new contributors get lost.

Mitigation:

- Keep cross-cutting narrative docs centralized (product-level), and only push module docs down when they become detailed and stable.
- Use lightweight indexes (README) at the product and module level.

---

## Alternatives (valid options)

### Alternative A: Only `apps/` + `packages/` (domains live in packages)

- Structure: `packages/domain-*` for bounded contexts; `packages/shared-*` for libraries.
- Pros: simplest tooling; one conceptual bucket.
- Cons: domains lose first-class visibility; easier for domain and shared code to blur.

### Alternative B: `modules/` (domain) + `apps/` (deployables)

- Same intent as `domains/`, just different naming.
- Pros: less “DDD-coded” language if you want a broader audience.
- Cons: “module” can be too generic; can become a dumping ground.

### Alternative C: Microservices-first (`services/` as primary)

- Pros: clear deployable boundaries.
- Cons: usually too early; pushes coupling into duplicated code and repeated schemas.

---

## Recommendation (to finalize)

For Chase Sets’ goals (event-sourced, domain correctness, configurable versions/filters), this is the strongest default:

- Keep `apps/` for deployables.
- Keep `domains/` for bounded contexts and business invariants.
- Keep `packages/` for shared primitives, config schemas, and integration adapters.

Decision rule:

- If a change affects business meaning (events, invariants, matching/fees), it belongs in `domains/`.
- If it’s reusable plumbing (schema validation, IDs, config parsing), it belongs in `packages/`.
- If it wires components together or exposes IO (HTTP, jobs, web UI), it belongs in `apps/`.

### Product-level documentation

- `artifacts/`
  - Vision, principles, roadmap, success metrics, cross-cutting architecture summary
  - System-wide ADRs under `artifacts/adrs/` (e.g., event sourcing tenet)

### Applications

- `apps/web/`
  - Web UI and fullstack route handlers (React Router 7)
  - `apps/web/docs/` (UI architecture, UX flows, accessibility, performance budgets)
  - `apps/web/adrs/` (UI-specific decisions)

- `apps/api/`
  - HTTP API surface (routing, auth middleware, request validation)
  - `apps/api/docs/`, `apps/api/adrs/`

### Domain modules (bounded contexts)

Best practice in a monorepo is: **domain modules live in `domains/`**, and deployable services compose them in `apps/`.

Example domain packages:

- `domains/catalog/`
- `domains/marketplace/`
- `domains/payments/`
- `domains/fulfillment/`
- `domains/identity/`

Each domain package contains:

- `README.md` (scope + public API)
- `docs/` (module-specific documentation)
- `adrs/` (module-specific decisions)
- `src/` (implementation, later)

### Shared packages

- `packages/shared/`
  - Shared primitives used across domains and apps (ids, event envelope, validation utilities)

- `packages/config/`
  - Config schemas + validation for admin-defined configuration (versions, filters, etc.)

- `packages/ui/`
  - Shared UI components

### Infrastructure (doc-first)

- `infra/`
  - `infra/docs/` (environments, deployment model, runbooks)
  - `infra/adrs/` (infra-specific decisions)

---

## Dependency rules (isolation)

- `domains/*` must not depend on infrastructure libraries (DB clients, HTTP, Stripe, EasyPost, search SDKs).
- `domains/*` may depend on `packages/shared` and `packages/config`.
- Integrations (Stripe/EasyPost/Search) live behind adapter boundaries (ports in domains; adapters in apps/infra or packages/integrations).
- `apps/*` wire domains together.

---

## Artifact placement rules

### What stays in product-level docs

- Product vision, principles, MVP scope, success metrics, roadmap
- One-page architecture overview
- Tenant-level ADRs (event sourcing, “containers + CDN + OSS-first”, etc.)

### What moves/gets created at module level (later)

- Marketplace matching details: `domains/marketplace/adrs/`
- Catalog/version model details: `domains/catalog/docs/` and `domains/catalog/adrs/`
- Auth and org/RBAC details: `domains/identity/docs/` and `domains/identity/adrs/`
- Shipping flow details: `domains/fulfillment/docs/` and `domains/fulfillment/adrs/`

---

## Migration plan from current state

Current state keeps cross-cutting artifacts under `artifacts/` and module-specific docs under `domains/*/docs/`.

When we begin implementation, we can continue incrementally:

1. For each new module created, start its `docs/` + `adrs/` folder immediately.
2. Move module-specific artifacts out of `artifacts/` into `domains/*/docs/` as they stabilize.
3. Keep `artifacts/` for cross-cutting platform concerns and system-wide ADRs.

---

## Open questions

1. Do you want `apps/api` and `apps/web` split, or a single fullstack app package to start?
2. Do we expect marketplace “seller org accounts” to own listings from day 1 (vs only user-owned)?
