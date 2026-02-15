# 3.x Search Relevance Evaluation and Golden Query Set (Requirements)

## Purpose

Define a cross-cutting evaluation approach for search relevance so we can make the semantic/vector decision measurable.

This complements:

- Search requirements
- OpenSearch decision
- Embedding strategy ADR
- Scale/cost guardrails

This is requirements-only (no implementation).

---

## Goals

- Provide a repeatable way to evaluate relevance changes over time.
- Protect exact-match expectations (set + card number) while adding semantic search.
- Enable quick iteration without guessing.

## Non-goals

- Building a full experimentation platform.
- Large-scale labeling program.

---

## Golden query set

### What it is

A small curated set of representative queries with expected results.

### Query categories (minimum)

- Exact identifier queries:
  - set + card number
  - exact card name
- Common nicknames/aliases:
  - “shiny charizard”, “alt art”, “promo pikachu”
- Attribute-driven queries:
  - “PSA 10”, “Japanese”, “first edition”
- Misspellings/typos

### For each query, capture

- Query text
- Expected top results (Items)
- “Must-not” results (common confusions)
- Notes (why it matters)

### Initial golden query set (v0)

This is a starter set to unblock evaluation. Replace/expand with your most common real queries once you have logs.

The canonical “top queries we must nail” list lives in `domains/search/docs/19-search-and-filtering-requirements.md`.

|   # | Query                               | Expected top results                        | Must-not confusions           | Notes                   |
| --: | ----------------------------------- | ------------------------------------------- | ----------------------------- | ----------------------- |
|   1 | `Base Set Charizard 4/102`          | Base Set, Charizard, #4/102                 | Any other Charizard printing  | Exact identifier style  |
|   2 | `Charizard 4/102`                   | Base Set Charizard #4/102                   | Charizard promos / other sets | Missing set name        |
|   3 | `151 Charizard`                     | SV 151 Charizard entries                    | Base Set Charizard            | Modern set shorthand    |
|   4 | `Moonbreon`                         | Umbreon VMAX alt art (Evolving Skies)       | Umbreon non-alt-art           | Nickname/alias          |
|   5 | `shiny charizard`                   | Shiny Charizard versions (multiple sets)    | Non-shiny Charizard           | Semantic intent         |
|   6 | `alt art gengar`                    | Gengar alt-art entries (if cataloged)       | Regular Gengar cards          | Informal term           |
|   7 | `Pikachu promo`                     | Promo Pikachu items                         | Base set Pikachu              | Promo vs set cards      |
|   8 | `1st edition machamp`               | 1st Edition Machamp                         | Unlimited Machamp             | Common attribute + name |
|   9 | `PSA 10 Charizard`                  | Charizard + grading PSA 10                  | PSA 9, BGS 10                 | Facet-driven            |
|  10 | `BGS 9.5`                           | Graded items with BGS 9.5                   | PSA grades                    | Grading company + grade |
|  11 | `Japanese pikachu`                  | Japanese language Pikachu                   | English Pikachu               | Language facet          |
|  12 | `sealed evolving skies booster box` | Sealed booster box for Evolving Skies       | Singles                       | Product type intent     |
|  13 | `evolving skies bb`                 | Evolving Skies booster box                  | Booster bundle / ETB          | Abbreviation            |
|  14 | `ETB 151`                           | SV 151 Elite Trainer Box                    | Booster box                   | Shorthand               |
|  15 | `charzard`                          | Charizard                                   | “Charizard ex” only           | Misspelling             |
|  16 | `Pikchu`                            | Pikachu                                     | Pichu                         | Misspelling/confusion   |
|  17 | `Base set 2 blastoise`              | Base Set 2 Blastoise                        | Base set Blastoise            | Similar set names       |
|  18 | `shadowless charizard`              | Shadowless Base Set Charizard               | Unlimited                     | Special printing        |
|  19 | `team rocket dark charizard`        | Dark Charizard (Team Rocket)                | Base set Charizard            | Prefix semantics        |
|  20 | `chase card`                        | High-interest “chase” items (policy-driven) | Random low-value commons      | Explicit semantic query |

---

## Offline relevance evaluation

### Human judgment

For each query, rate candidate results:

- Relevant
- Somewhat relevant
- Not relevant

### Metrics (guidance)

Track at least:

- Top-k precision (k=5,10)
- Recall@k
- MRR (mean reciprocal rank)

---

## Guardrails

- Exact matches must win when present (set+number or exact name).
- Semantic ranking must not bury exact identifiers.
- Changes must be evaluated against the golden set before rollout.

---

## Online evaluation (later, optional)

When possible, add simple online signals:

- Search → click-through rate
- Search → add-to-cart rate
- Query refinements rate

---

## Operational requirements

- The golden query set must be versioned.
- Changes to analyzers/embeddings/ranking must reference an evaluation run.

---


## Implementation Checklist
- Relevance evaluation must maintain a curated golden query set with expected outcomes.
- Evaluation runs should record metric snapshots for change comparison.
- Ranking or analyzer changes should require evaluation evidence before rollout.
- Operational runbook should define how to execute and review relevance evaluations.
