# Domains (Module-Level Documentation)

[← Back to repository index](../README.md)

This folder contains **domain/module-level** documentation.

Rule of thumb:

- `artifacts/` = cross-cutting product + platform context (vision, principles, architecture overview, NFRs, operability, privacy, go-live readiness)
- `domains/*/docs/` = module scope/details (fulfillment, payments, search, catalog, risk, identity)

Each domain should maintain a small `README.md` index.

Each domain also maintains a drill-down checklist at `domains/<domain>/docs/00-todo.md`.

## Required: Terminology & Definitions

Each domain must maintain a **Terminology & Definitions** doc at:

- `domains/<domain>/docs/terminology-and-definitions.md`

This doc defines the domain’s **ubiquitous language** and should be treated as an input to modeling:

- Entity names (aggregates/entities/value objects)
- Command and event names
- API resource names (when a domain is exposed)
- Projections/read model names

If a term is shared across multiple domains, it should also appear (or be reconciled) in the cross-cutting glossary: `artifacts/02-domain-model-and-glossary.md`.

## Domain index

- [domains/catalog/README.md](catalog/README.md)
- [domains/marketplace/README.md](marketplace/README.md)
- [domains/orders/README.md](orders/README.md)
- [domains/payments/README.md](payments/README.md)
- [domains/fulfillment/README.md](fulfillment/README.md)
- [domains/search/README.md](search/README.md)
- [domains/identity/README.md](identity/README.md)
- [domains/risk/README.md](risk/README.md)
- [domains/trust-safety/README.md](trust-safety/README.md)

Suggested drill-down order (MVP): Marketplace → Orders → Payments → Fulfillment → Catalog/Search → Identity/Risk/Trust & Safety.
