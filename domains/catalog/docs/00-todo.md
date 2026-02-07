# Catalog Domain — TODOs (Build Checklist)

This checklist is the drill-down work plan for Catalog (curation, versions, corrections).

## Inputs / dependencies

- Version system: `domains/catalog/docs/15-version-system.md`
- Catalog governance: `domains/catalog/docs/24-catalog-governance-and-corrections.md`
- Glossary/SKU identity: `artifacts/02-domain-model-and-glossary.md`

## Version model

- [ ] Confirm canonical version schema (option sets, constraints, derived facets)
- [ ] Confirm MVP version modeling conventions + canonical examples: [02-mvp-version-keys-and-facets.md](02-mvp-version-keys-and-facets.md), [03-version-model-examples.md](03-version-model-examples.md)
- [ ] Define validation rules (invalid combos, required fields)
- [ ] Define normalization rules for VersionPath (stable ordering, casing)
- [ ] Define deterministic `skuId` derivation and error codes: [01-sku-identity-and-resolution.md](01-sku-identity-and-resolution.md)

## Catalog item lifecycle

- [ ] Define curation workflow (create/update/deprecate/merge/split)
- [ ] Define audit requirements (who changed what and why)
- [ ] Define how aliases/nicknames are stored for search

## Projection outputs

- [ ] Define the “public Item view” projection
- [ ] Define SKU facet materialization rules for search filtering (feeds Search filter config)

## Tests (when code starts)

- [ ] Validation tests for version rules
- [ ] Migration tests for merge/split correctness
