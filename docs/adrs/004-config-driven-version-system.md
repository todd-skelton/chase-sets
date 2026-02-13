# ADR 004: Config-Driven Version System

## Status

Accepted

## Context

Chase Sets needs a version system that can represent complex conditional selection flows (e.g., raw vs graded vs sealed; grader-specific grade scales) across multiple product types. We want:

- No hardcoded per-category assumptions
- A seller/buyer UI that is driven entirely by configuration
- A stable SKU model for listings/bids/orders
- Flattened facets for search and analytics

## Options considered

1. Flat attributes per category (hardcoded)
2. Enumerated SKU list only (pre-generated SKUs)
3. **Config-driven version graph** (options/option values + rules) with resolved VersionPath

## Decision

Adopt a config-driven **Version Graph** model:

- Item references a VersionModel
- Users select a VersionPath via a guided UI (version selector)
- `SKU = Item + VersionPath`
- Each SKU has its own order book
- VersionPath flattens into facets for search

## Tradeoffs

- Pros:
  - Supports conditional hierarchies and category evolution
  - One system for TCG, sealed, graded, apparel, etc.
  - Search/faceting is clean via flattened facets
- Cons:
  - Requires robust authoring/validation tools
  - Versioning and backward compatibility are non-trivial
- Risks:
  - Too-granular versions can fragment liquidity
  - Mistakes in config can block listing flows without good tooling

## Consequences / follow-ups

- VersionModel changes are captured as events; read models/projections may be JSON documents, relational tables, caches, and search facets depending on use case.
- Define versioning strategy:
  - VersionModel versions must be immutable once referenced by an Order.
  - Support supersede/merge mappings for catalog corrections.
- Define SKU ID strategy:
  - store full `versionPath` and a derived stable key/hash.
- Implement validation:
  - required options resolved
  - path exists
  - no conflicting selections
  - detect unreachable options and conflicting overrides
