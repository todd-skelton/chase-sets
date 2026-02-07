# Catalog Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Catalog (curation, variants, corrections).

## Inputs / dependencies

- Variant system: `domains/catalog/docs/15-variant-system.md`
- Catalog governance: `domains/catalog/docs/24-catalog-governance-and-corrections.md`
- Glossary/SKU identity: `artifacts/02-domain-model-and-glossary.md`

## Variant model

- [ ] Confirm canonical variant schema (option sets, constraints, derived facets)
- [ ] Confirm MVP variant modeling conventions + canonical examples: [02-mvp-variant-keys-and-facets.md](02-mvp-variant-keys-and-facets.md), [03-variant-model-examples.md](03-variant-model-examples.md)
- [ ] Define validation rules (invalid combos, required fields)
- [ ] Define normalization rules for VariantPath (stable ordering, casing)
- [ ] Define deterministic `skuId` derivation and error codes: [01-sku-identity-and-resolution.md](01-sku-identity-and-resolution.md)

## Catalog item lifecycle

- [ ] Define curation workflow (create/update/deprecate/merge/split)
- [ ] Define audit requirements (who changed what and why)
- [ ] Define how aliases/nicknames are stored for search

## Projection outputs

- [ ] Define the “public catalog item view” projection
- [ ] Define SKU facet materialization rules for search filtering (feeds Search filter config)

## Tests (when code starts)

- [ ] Validation tests for variant rules
- [ ] Migration tests for merge/split correctness
