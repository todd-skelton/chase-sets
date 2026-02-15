# Domains (Module-Level Documentation)

[Back to repository index](../README.md)

This folder contains domain-level documentation.

## Guidance

- `docs/` holds cross-cutting canonical platform context.
- `domains/*/docs/` holds domain-specific scope, requirements, and terminology.
- Each domain should keep a small `README.md` and a drill-down checklist at `domains/<domain>/docs/00-todo.md`.

## Required: Terminology and Definitions

Each domain should maintain:

- `domains/<domain>/docs/terminology-and-definitions.md`

If a term is shared across multiple domains, reconcile it in:

- `docs/domain/glossary.md`

## Domain Index

- [domains/catalog/README.md](catalog/README.md)
- [domains/marketplace/README.md](marketplace/README.md)
- [domains/orders/README.md](orders/README.md)
- [domains/payments/README.md](payments/README.md)
- [domains/fulfillment/README.md](fulfillment/README.md)
- [domains/search/README.md](search/README.md)
- [domains/identity/README.md](identity/README.md)
- [domains/reputation/README.md](reputation/README.md)

Planned capabilities (not yet standalone domain doc roots): Risk, Trust & Safety.
