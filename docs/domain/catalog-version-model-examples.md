# Catalog â€” VersionModel Examples (Canonical, Doc-Only)

## Purpose

Provide concrete, canonical VersionModel examples that demonstrate:

- staged (multi-step) selection paths
- multi-option (matrix) selection (e.g., Size Ã— Color)
- how keys/labels/facets relate to Version identity

Important: the option/option value keys shown here are **examples**. In the product, keys and labels are authored in the version-system admin UI as data.

See also:

- Version identity + normalization contract: [catalog-version-identity-and-resolution.md](catalog-version-identity-and-resolution.md)
- MVP conventions: [catalog-mvp-version-keys-and-facets.md](catalog-mvp-version-keys-and-facets.md)

---

## Example A â€” Trading card staged model (Type â†’ â€¦)

### Intent

A staged selector where the first choice (â€œTypeâ€) determines what options exist next.

User-visible labels might be:

- Type: Conditioned / Sealed / Graded
- Company: PSA / BGS / CGC
- Grade: 10 GEM MT / 9 / 9.5 / â€¦

Sorting note:

- The UI must not rely on lexical sorting for grade-like values.
- Options can carry `sortOrder` (presentation-only) so values display in a human order (e.g., "Pristine 10" before "Gem Mint 10" before "9.5" before "9").
- If a grade scale differs by company, model that by attaching a company-specific grade option under each company option value (conditional child options), rather than sharing one global `grade` option.

### Example VersionModel (JSON-ish)

```json
{
  "versionModelKey": "tcg_card_default",
  "version": 1,
  "rootOptions": ["type"],
  "options": {
    "type": {
      "optionKey": "type",
      "label": "Type",
      "required": true,
      "selection": "single",
      "values": [
        {
          "optionValueKey": "conditioned",
          "label": "Conditioned",
          "childOptions": ["condition"]
        },
        { "optionValueKey": "sealed", "label": "Sealed" },
        {
          "optionValueKey": "graded",
          "label": "Graded",
          "childOptions": ["company", "grade"]
        }
      ]
    },
    "condition": {
      "optionKey": "condition",
      "label": "Condition",
      "required": true,
      "selection": "single",
      "values": [
        { "optionValueKey": "nm", "label": "Near Mint" },
        { "optionValueKey": "lp", "label": "Lightly Played" },
        { "optionValueKey": "mp", "label": "Moderately Played" },
        { "optionValueKey": "hp", "label": "Heavily Played" },
        { "optionValueKey": "dmg", "label": "Damaged" }
      ]
    },
    "company": {
      "optionKey": "company",
      "label": "Company",
      "required": true,
      "selection": "single",
      "values": [
        { "optionValueKey": "psa", "label": "PSA" },
        { "optionValueKey": "bgs", "label": "BGS" },
        { "optionValueKey": "cgc", "label": "CGC" }
      ]
    },
    "grade": {
      "optionKey": "grade",
      "label": "Grade",
      "required": true,
      "selection": "single",
      "values": [
        { "optionValueKey": "pristine10", "label": "Pristine 10", "sortOrder": 10 },
        { "optionValueKey": "gemMint10", "label": "Gem Mint 10", "sortOrder": 20 },
        { "optionValueKey": "9.5", "label": "9.5", "sortOrder": 30 },
        { "optionValueKey": "9", "label": "9", "sortOrder": 40 }
      ]
    }
  },
  "constraints": [],
  "facetRules": [
    { "from": "type", "toFacetKey": "type", "value": "optionValueKey" },
    { "from": "condition", "toFacetKey": "condition", "value": "optionValueKey" },
    { "from": "company", "toFacetKey": "company", "value": "optionValueKey" },
    { "from": "grade", "toFacetKey": "gradeLabel", "value": "optionValueKey" }
  ]
}
```

### Example VersionPaths

Conditioned (raw) path:

- proposed: `[{optionKey=type, optionValueKey=conditioned}, {optionKey=condition, optionValueKey=nm}]`
- normalized: `type=conditioned;condition=nm`
- flattened facets example:
  - `type=conditioned`
  - `condition=nm`

Graded path:

- proposed: `[{optionKey=company, optionValueKey=psa}, {optionKey=grade, optionValueKey=gemMint10}, {optionKey=type, optionValueKey=graded}]` (out of order)
- normalized: `type=graded;company=psa;grade=gemMint10`
- flattened facets example:
  - `type=graded`
  - `company=psa`
  - `gradeLabel=gemMint10`

Sealed path:

- proposed: `[{optionKey=type, optionValueKey=sealed}]`
- normalized: `type=sealed`
- flattened facets example:
  - `type=sealed`

---

## Example B â€” Apparel matrix model (Size Ã— Color)

### Intent

Multiple required options that are independent (not staged), with a canonical ordering defined by `rootOptions`.

### Example VersionModel (JSON-ish)

```json
{
  "versionModelKey": "apparel_basic",
  "version": 1,
  "rootOptions": ["size", "color"],
  "options": {
    "size": {
      "optionKey": "size",
      "label": "Size",
      "required": true,
      "selection": "single",
      "values": [
        { "optionValueKey": "s", "label": "S" },
        { "optionValueKey": "m", "label": "M" },
        { "optionValueKey": "l", "label": "L" },
        { "optionValueKey": "xl", "label": "XL" }
      ]
    },
    "color": {
      "optionKey": "color",
      "label": "Color",
      "required": true,
      "selection": "single",
      "values": [
        { "optionValueKey": "red", "label": "Red" },
        { "optionValueKey": "blue", "label": "Blue" },
        { "optionValueKey": "black", "label": "Black" }
      ]
    }
  },
  "constraints": [],
  "facetRules": [
    { "from": "size", "toFacetKey": "size", "value": "optionValueKey" },
    { "from": "color", "toFacetKey": "color", "value": "optionValueKey" }
  ]
}
```

### Example VersionPaths

- proposed: `[{optionKey=color, optionValueKey=red}, {optionKey=size, optionValueKey=m}]`
- normalized: `size=m;color=red`
- flattened facets example:
  - `size=m`
  - `color=red`

