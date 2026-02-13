---
name: search-relevance-eval
description: Evaluate and tune Chase Sets search relevance using golden queries and lexical versus hybrid ranking comparisons. Use when changing analyzers, ranking logic, embeddings, query parsing, or search guardrails.
---

# Search Relevance Eval

## Read First
- `AGENT.md`
- `domains/search/docs/19-search-and-filtering-requirements.md`
- `domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md`
- `artifacts/adrs/012-search-engine-mvp.md`
- `artifacts/adrs/016-embedding-strategy.md`
- `artifacts/10-non-functional-requirements.md`

## Workflow
1. Update or confirm the golden query set before ranking changes.
2. Run baseline comparisons:
   - lexical-only
   - hybrid lexical + vector
   - semantic-heavy variant if applicable
3. Score relevance with consistent judgment labels and top-k metrics.
4. Verify exact identifier guardrails (set + number, exact names).
5. Validate latency and cost impact against target budgets.
6. Document results and any fallback posture.

## Hard Rules
- Exact identifier queries must not regress.
- Filter behavior remains config-driven and stable.
- Embedding usage must avoid intentional PII submission.
- Hybrid fallback to lexical-only must remain operable.

## Deliverables
- Versioned golden query set updates.
- Evaluation report for ranking variants.
- Documented accept/reject decision for ranking change.
- Guardrail checks for exact match, latency, and cost.

## Quick Review Checklist
- Query set includes identifier, alias, typo, and attribute-driven cases.
- Top-k precision/recall metrics captured for each variant.
- Exact-match failures are called out explicitly.
- P95 latency is checked for impacted endpoints.
- Fallback behavior is tested.
