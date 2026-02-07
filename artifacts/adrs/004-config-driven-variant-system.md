# ADR 004: Config-Driven Variant System

## Status

Accepted

## Context

Chase Sets needs a variant system that can represent complex conditional selection flows (e.g., raw vs graded vs sealed; grader-specific grade scales) across multiple product types. We want:

- No hardcoded per-category assumptions
- A seller/buyer UI that is driven entirely by configuration
- A stable SKU model for listings/bids/orders
- Flattened facets for search and analytics

## Options considered

1. Flat attributes per category (hardcoded)
2. Enumerated SKU list only (pre-generated SKUs)
3. **Config-driven variant graph** (dimensions/options + rules) with resolved VariantPath

## Decision

Adopt a config-driven **Variant Graph** model:

- CatalogItem references a VariantModel
- Users select a VariantPath via a guided UI (variant selector)
- `SKU = CatalogItem + VariantPath`
- Each SKU has its own order book
- VariantPath flattens into facets for search

## Tradeoffs

- Pros:
  - Supports conditional hierarchies and category evolution
  - One system for TCG, sealed, graded, apparel, etc.
  - Search/faceting is clean via flattened facets
- Cons:
  - Requires robust authoring/validation tools
  - Versioning and backward compatibility are non-trivial
- Risks:
  - Too-granular variants can fragment liquidity
  - Mistakes in config can block listing flows without good tooling

## Consequences / follow-ups

- VariantModel changes are captured as events; read models/projections may be JSON documents, relational tables, caches, and search facets depending on use case.
- Define versioning strategy:
  - VariantModel versions must be immutable once referenced by an Order.
  - Support supersede/merge mappings for catalog corrections.
- Define SKU ID strategy:
  - store full `variantPath` and a derived stable key/hash.
- Implement validation:
  - required dimensions resolved
  - path exists
  - no conflicting selections
  - detect unreachable dimensions and conflicting overrides
