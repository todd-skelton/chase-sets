# Search Terminology & Definitions

This document defines the ubiquitous language for the **Search domain**.

Search owns query, indexing, ranking, and filtering semantics for discovery. It does not own Catalog truth; it indexes it.

---

## Required usage

- Use these terms to model and name entities, commands, events, APIs, and projections in this domain.
- Reconcile shared terms in [artifacts/02-domain-model-and-glossary.md](../../../artifacts/02-domain-model-and-glossary.md).

---

## Core concepts (MVP)

### Query

A **Query** is the user’s search input and associated constraints.

### Index

An **Index** is a materialized structure used to retrieve and rank results.

### Document

A **Document** is an indexable representation of an item (Catalog-derived) with fields for search and filtering.

### Facet / Filter

A **Facet** is a field that can be used to filter or aggregate results; a **Filter** is a selected facet constraint.

### Ranking / Relevance

**Ranking** orders results; **Relevance** is how well results match the query and intent.

---

## Boundaries

Search references:

- Catalog (source of truth for items and attributes)

Search does not own:

- Inventory availability
- Pricing/market data
