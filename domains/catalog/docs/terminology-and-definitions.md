# Catalog Terminology and Definitions

## Purpose
Define catalog-specific terms not already canonicalized in `../../../docs/domain/glossary.md`.

## Audience
- Engineers implementing catalog identity and resolution logic.
- AI agents documenting catalog contracts.

## Scope
Catalog defines what can be sold and how sellable versions are identified.

## Domain Terms
- **Category**: top-level grouping of items sharing vocabulary.
- **Catalog Item**: canonical sellable concept.
- **Version Model**: rule set defining valid version paths for an item.
- **Version Path**: ordered option selections that identify a sellable version.
- **Option**: decision point in a version model.
- **Option Value**: selectable value under an option.
- **Facet Mapping**: mapping from catalog attributes to search/filter fields.

## Boundaries
Catalog owns item identity and metadata quality. Catalog does not own listing state, order state, payout state, or shipment execution.

## References
- `../../../docs/domain/glossary.md`
- `01-version-identity-and-resolution.md`
- `15-version-system.md`