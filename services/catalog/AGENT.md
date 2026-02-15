# Catalog Service Agent Guide

## Purpose
- Define ownership and rules for collectible metadata, set hierarchy, and canonical card data.

## Scope
- Owns:
  - Product taxonomy, set metadata, card attributes, print variants, canonical identifiers.
  - Normalization and validation rules for catalog quality.
- Does not own:
  - Listing lifecycle, pricing, checkout, shipping execution, account identity.

## Rules
- Public interfaces:
  - OpenAPI: `services/catalog/openapi/openapi.yaml`
  - Events emitted: `services/catalog/events/emitted/`
  - Events consumed: `services/catalog/events/consumed/`
- Data ownership:
  - Schema prefix: `catalog_*`
  - Migrations: `services/catalog/infra/db/migrations/`
- Invariants:
  - Canonical card identity remains stable once published.
  - Set and card references must resolve to existing catalog records.
  - TODO: define duplicate merge policy and correction audit workflow.

## Checklist
- Local commands:
  - `pnpm -C services/catalog test`
  - `pnpm -C services/catalog lint`
  - `pnpm -C services/catalog typecheck`
- Testing expectations:
  - Unit tests for normalization and invariant logic.
  - Integration tests for repository queries and migration compatibility.
  - Contract tests for emitted catalog events and public read endpoints.

## Links
- `AGENT.md`
- `docs/domain/SKILL.md`
- `docs/events/SKILL.md`
