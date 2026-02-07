# ADR 019: External API Authentication & Delegated Access (incl. AI assistants)

## Status

Proposed

## MVP direction (locked)

For MVP, the primary external/agent use case is **read-only product discovery**:

- allowlisted, integration-scoped API keys
- read-only scopes only (catalog + search)
- no delegated user access and no transactional writes in MVP
- strict guardrails (pagination limits, quotas, safe degradation)

## Context

Chase Sets is **API-first**: the marketplace web client uses the same platform APIs available to external clients.

A key external-client use case is **AI assistants/agents** (e.g., ChatGPT, Gemini, etc.) acting on behalf of consumers to:

- search and compare catalog items
- watch prices / monitor listings & offers

Later phases may include:

- user-delegated access (consent) to user/org-specific data
- draft actions and/or transactional writes (high-risk)

This requires an auth model that supports **delegated access** while preventing overload and reducing fraud/ATO risk.

## Goals

- External clients (including AI agents) can act on behalf of a user/org with **explicit consent**.
- Access is **scoped** (least privilege), **revocable**, and **auditable**.
- The system remains safe under automation (rate limits/quotas, pagination, backpressure, kill switches).
- High-risk actions (money/security) require **step-up auth** and clear user intent.

## Non-goals (MVP)

- Full partner marketplace/channel adapters (inventory sync to other platforms).
- Unlimited/uncapped API access.
- Delegated user/org access (OAuth/PAT flows) and any high-risk transactional writes.

## Options considered (auth mechanisms)

1. **User sessions only** (web-only cookies)
   - Simple, but does not enable third-party/agent clients.

2. **Personal access tokens (PATs) / API keys** (user-scoped)
   - Fast path for early integrations, but requires strong UX for creation/revocation + careful scope design.

3. **OAuth 2.1 / OIDC delegated access** (authorization code + PKCE)
   - Best fit for “act on behalf of user” and third-party clients; more upfront work.

4. **Hybrid**
   - OAuth for user-delegated integrations; API keys for org-level server-to-server automation.

## Decision (minimum contract we must enforce)

Regardless of protocol choice, the platform must support:

- **Delegated/scoped credentials** for external clients (including agentic clients)
- **Revocation** (immediate) and rotation
- **Attribution** in audit logs: user/org + client/integration identity
- **Guardrails**: rate limits/quotas per client/org/user; pagination with max page sizes; safe degradation
- **High-risk action posture**: step-up auth and/or explicit confirmation for actions that move money or create irreversible commitments
- **Idempotency** on write endpoints

## Consequences / follow-ups

- Define the MVP external-client surface area (read-only vs write actions).
- Define scopes and a minimal consent model (what users can grant).
- Decide the initial mechanism (PAT vs OAuth) and document the exact flows.
- Add operational tooling: revoke tokens, inspect client traffic, adjust quotas.

## Open questions

1. For MVP read-only search, should we require an **integration API key** for all external traffic (recommended), or allow unauthenticated search with IP-only limits?
2. For MVP read-only scope, do we include public market data beyond catalog search (e.g., public listings/offers), or keep the surface strictly catalog + search?
3. What default quotas/rate limits should apply to integration API keys (and how do we tier/raise limits)?
4. In Phase 1+, do we want to start with **OAuth** (preferred long-term) or a scoped **PAT** that is designed to migrate to OAuth?
