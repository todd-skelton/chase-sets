# ADR 016: Embedding Strategy (Semantic Search)

## Status

Accepted (MVP)

## Context

We require vector + semantic search in MVP (see ADR 012).

To support this we need a consistent approach for:

- Generating embeddings for Items (and potentially SKUs)
- Generating embeddings for user queries
- Cost/latency control
- Operational posture (hosted vs self-hosted)

## Options considered

1. Hosted embedding API (fastest path)
2. Self-hosted open-source embedding model
3. Hybrid (hosted for queries, offline/self-hosted for catalog; or staged migration)

## Decision

Accepted (MVP):

- Start with a **hosted embedding API** for both catalog and query embeddings.
- Ship **hybrid retrieval/ranking** (lexical + vector) so exact identifiers remain strong.
- Treat model choice as configuration; we will evolve models over time via versioning and re-embedding.

## Decision drivers

- Latency budget for search queries (P95)
- Cost per query and cost per indexed item
- Operational simplicity vs control
- Data handling constraints (PII concerns are low for catalog text, but queries may contain user intent)

## Evaluation (required)

We must still run an explicit evaluation pass to validate relevance and cost/latency:

- Golden query set + offline relevance metrics: `domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md`

## Decision details (MVP)

- Use a **hosted embedding API** for both catalog and query embeddings.
- Embed only non-PII catalog text (title, set, number, normalized aliases, short description).
- Apply best-effort query redaction for obvious PII patterns before embedding.
- Version all embeddings (model id + embedding version) so re-embedding is safe and measurable.

Follow-ups (required before go-live):

- Write the initial golden query set.
- Run a baseline lexical vs hybrid vs semantic evaluation.
- Validate cost/latency against scale targets.

## MVP operational posture

- **Catalog embeddings**: generated offline (batch) and refreshed on catalog changes.
- **Query embeddings**: generated online (per request) with caching where feasible.
- **Versioning**: persist embedding model identifier + embedding version so we can re-embed safely.
- **Fallback**: if embeddings fail or cost guardrails trip, search must degrade to lexical-only ranking.

## Cost/latency guardrails

- Enforce hard limits on embedding calls per search session (rate limiting).
- Apply caching for repeat queries.
- Measure P95 query latency impact and include it in SLOs.

## Data handling requirements

- Do not intentionally send user PII to the embedding provider.
- Apply basic query sanitization/redaction for obvious PII patterns (email/phone/address-like strings) before embedding.
- Treat query text as potentially sensitive in logs.

## Consequences / follow-ups

- Define what text we embed (title + set + number + normalized aliases + description).
- Define how embeddings are refreshed when catalog changes.
- Decide where embeddings are stored (OpenSearch vector fields) and how versioning works.
- Define evaluation approach (golden query set + offline relevance testing).

## Validation worksheet (required evidence)

Record a concrete evaluation run and the supporting evidence.

- Date:
- Owner:
- Embedding provider/model id:
- Embedding dimension:
- Index fields embedded:
- Dataset/query set version: `domains/search/docs/34-search-relevance-evaluation-and-golden-queries.md`

Acceptance criteria:

- Run offline evaluation against the golden query set comparing:
  - lexical-only baseline
  - hybrid lexical + vector
  - semantic/vector-heavy (if applicable)
- Demonstrate we do not regress “exact identifier” queries (set + card number, exact name) in top-k behavior.
- Demonstrate end-to-end search latency still meets the current target (**Search P95 <= 500ms**) defined in `docs/architecture/QUALITY_ATTRIBUTES.md` and `docs/engineering/OBSERVABILITY.md`.
- Establish cost guardrails (rate limits + caching strategy + re-embed policy) and confirm projected cost is acceptable at the scale assumptions.

If any acceptance criterion fails:

- Document the failing case(s) and adopt a fallback posture (lexical-only with vectors disabled, or hybrid-only with tighter gating).

