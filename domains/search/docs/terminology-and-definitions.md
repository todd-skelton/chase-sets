# Search Terminology and Definitions

## Purpose
Define search-specific terms not already canonicalized in `../../../docs/domain/glossary.md`.

## Audience
- Engineers implementing search indexing and ranking.
- AI agents documenting search contracts.

## Scope
Search covers query parsing, ranking, and filtered retrieval.

## Domain Terms
- **Search Document**: indexable projection record derived from source contexts.
- **Analyzer**: text processing strategy used during indexing/querying.
- **Facet Filter**: structured filter constraint applied to search results.
- **Relevance Evaluation Set**: curated query set used to measure ranking behavior.

## Boundaries
Search owns index behavior and retrieval quality. Search does not own source-of-truth catalog or transactional order state.

## References
- `../../../docs/domain/glossary.md`
- `19-search-and-filtering-requirements.md`
- `34-search-relevance-evaluation-and-golden-queries.md`