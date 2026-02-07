# Catalog — VariantModel Examples (Canonical, Doc-Only)

## Purpose

Provide concrete, canonical VariantModel examples that demonstrate:

- staged (multi-step) selection paths
- multi-dimension (matrix) selection (e.g., Size × Color)
- how keys/labels/facets relate to SKU identity

Important: the dimension/option keys shown here are **examples**. In the product, keys and labels are authored in the variant-system admin UI as data.

See also:

- SKU identity + normalization contract: [01-sku-identity-and-resolution.md](01-sku-identity-and-resolution.md)
- MVP conventions: [02-mvp-variant-keys-and-facets.md](02-mvp-variant-keys-and-facets.md)

---

## Example A — Trading card staged model (Type → …)

### Intent

A staged selector where the first choice (“Type”) determines what dimensions exist next.

User-visible labels might be:

- Type: Conditioned / Sealed / Graded
- Company: PSA / BGS / CGC
- Grade: 10 GEM MT / 9 / 9.5 / …

Sorting note:

- The UI must not rely on lexical sorting for grade-like values.
- Options can carry `sortOrder` (presentation-only) so values display in a human order (e.g., "Pristine 10" before "Gem Mint 10" before "9.5" before "9").
- If a grade scale differs by company, model that by attaching a company-specific grade dimension under each company option (conditional child dimensions), rather than sharing one global `grade` dimension.

### Example VariantModel (JSON-ish)

```json
{
  "variantModelKey": "tcg_card_default",
  "version": 1,
  "rootDimensions": ["type"],
  "dimensions": {
    "type": {
      "dimensionKey": "type",
      "label": "Type",
      "required": true,
      "selection": "single",
      "options": [
        {
          "optionKey": "conditioned",
          "label": "Conditioned",
          "childDimensions": ["condition"]
        },
        { "optionKey": "sealed", "label": "Sealed" },
        {
          "optionKey": "graded",
          "label": "Graded",
          "childDimensions": ["company", "grade"]
        }
      ]
    },
    "condition": {
      "dimensionKey": "condition",
      "label": "Condition",
      "required": true,
      "selection": "single",
      "options": [
        { "optionKey": "nm", "label": "Near Mint" },
        { "optionKey": "lp", "label": "Lightly Played" },
        { "optionKey": "mp", "label": "Moderately Played" },
        { "optionKey": "hp", "label": "Heavily Played" },
        { "optionKey": "dmg", "label": "Damaged" }
      ]
    },
    "company": {
      "dimensionKey": "company",
      "label": "Company",
      "required": true,
      "selection": "single",
      "options": [
        { "optionKey": "psa", "label": "PSA" },
        { "optionKey": "bgs", "label": "BGS" },
        { "optionKey": "cgc", "label": "CGC" }
      ]
    },
    "grade": {
      "dimensionKey": "grade",
      "label": "Grade",
      "required": true,
      "selection": "single",
      "options": [
        { "optionKey": "pristine10", "label": "Pristine 10", "sortOrder": 10 },
        { "optionKey": "gemMint10", "label": "Gem Mint 10", "sortOrder": 20 },
        { "optionKey": "9.5", "label": "9.5", "sortOrder": 30 },
        { "optionKey": "9", "label": "9", "sortOrder": 40 }
      ]
    }
  },
  "constraints": [],
  "facetRules": [
    { "from": "type", "toFacetKey": "type", "value": "optionKey" },
    { "from": "condition", "toFacetKey": "condition", "value": "optionKey" },
    { "from": "company", "toFacetKey": "company", "value": "optionKey" },
    { "from": "grade", "toFacetKey": "gradeLabel", "value": "optionKey" }
  ]
}
```

### Example VariantPaths

Conditioned (raw) path:

- proposed: `[{type=conditioned}, {condition=nm}]`
- normalized: `type=conditioned;condition=nm`
- flattened facets example:
  - `type=conditioned`
  - `condition=nm`

Graded path:

- proposed: `[{company=psa}, {grade=gemMint10}, {type=graded}]` (out of order)
- normalized: `type=graded;company=psa;grade=gemMint10`
- flattened facets example:
  - `type=graded`
  - `company=psa`
  - `gradeLabel=gemMint10`

Sealed path:

- proposed: `[{type=sealed}]`
- normalized: `type=sealed`
- flattened facets example:
  - `type=sealed`

---

## Example B — Apparel matrix model (Size × Color)

### Intent

Multiple required dimensions that are independent (not staged), with a canonical ordering defined by `rootDimensions`.

### Example VariantModel (JSON-ish)

```json
{
  "variantModelKey": "apparel_basic",
  "version": 1,
  "rootDimensions": ["size", "color"],
  "dimensions": {
    "size": {
      "dimensionKey": "size",
      "label": "Size",
      "required": true,
      "selection": "single",
      "options": [
        { "optionKey": "s", "label": "S" },
        { "optionKey": "m", "label": "M" },
        { "optionKey": "l", "label": "L" },
        { "optionKey": "xl", "label": "XL" }
      ]
    },
    "color": {
      "dimensionKey": "color",
      "label": "Color",
      "required": true,
      "selection": "single",
      "options": [
        { "optionKey": "red", "label": "Red" },
        { "optionKey": "blue", "label": "Blue" },
        { "optionKey": "black", "label": "Black" }
      ]
    }
  },
  "constraints": [],
  "facetRules": [
    { "from": "size", "toFacetKey": "size", "value": "optionKey" },
    { "from": "color", "toFacetKey": "color", "value": "optionKey" }
  ]
}
```

### Example VariantPaths

- proposed: `[{color=red}, {size=m}]`
- normalized: `size=m;color=red`
- flattened facets example:
  - `size=m`
  - `color=red`
