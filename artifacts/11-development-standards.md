# 5.1 Development Principles & Standards

## Principles

- **Containers by default**: every service runs in an OCI container.
- **OSS-first**: prefer best-in-class open-source infrastructure components.
- **Event-first**: write domain events as the source of truth; projections are derived.
- **API-first**: the web app is the first API consumer, using the same platform APIs available to external clients.
- **Ubiquitous language first**: model terms should match the words people use in conversations, UI, and documentation; avoid internal-only jargon or abbreviations.

## Coding standards

- Language(s): TypeScript (end-to-end)
- Frontend: React Router 7 (fullstack)
- Style tooling: ESLint + Prettier (auto-format on save; CI enforces).
- Container standard: each service has a `Dockerfile`; local dev uses Compose.

## Naming conventions (TypeScript-first)

We standardize identifiers to reduce friction across API ↔ events ↔ projections ↔ UI.

- **Public fields/columns/JSON keys:** `camelCase` (examples: `itemId`, `versionId`, `versionPath`, `flattenedFacets`).
- **Types/classes/interfaces/enums:** `PascalCase` (examples: `Item`, `VersionModel`, `VersionPath`).
- **Constants:** `SCREAMING_SNAKE_CASE` where appropriate.
- **Version-system stable keys:** prefer `lowerCamelCase` strings without underscores (these are authored in admin and become part of long-lived identity).

Important clarification:

- `VersionPath` is a **type name** (PascalCase).
- `versionPath` is a **field/property name** (camelCase) in API/event payloads.

Postgres implementation details may remain `snake_case` internally, but they must be mapped at the boundary and must not leak into public contracts.

## Testing philosophy

- Unit: Vitest (fast local feedback) for domain logic and pure utilities.
- Integration: container-backed tests for Postgres/OpenSearch + core flows (projectors, checkout/payment state transitions).
- E2E: Playwright for critical user journeys (search → item → checkout; seller listing; admin refund).
- Event/projection tests: validate projectors are idempotent and replay-safe.

## API rules

- **Single platform API:** the marketplace web client uses the same HTTP APIs that external clients can use.
  - No “hidden” product capabilities: if the web app can do it, it must be possible via the API.
  - External access can be allowlisted/beta in MVP, but the contract should be treated as real and durable.
- **Guardrails (required):** enforce pagination, rate limits, and quotas to prevent overload.
  - Rate limits should be scoped by IP, account, org, and auth method (session vs API key), and be configurable.
  - List endpoints must be paginated; the server enforces maximum page sizes.
  - Prefer async/batch workflows for heavy operations (exports, bulk listing import) to avoid synchronous overload.
  - See `artifacts/30-scale-targets-and-capacity-planning.md` and `domains/risk/docs/22-fraud-abuse-and-risk-controls.md`.
- **AI agent/assistant clients:** treat LLM/agent integrations as first-class external API clients.
  - **MVP posture:** allowlisted, read-only access to catalog/search endpoints via integration API keys with strict guardrails.
  - If/when an external client needs user/org-specific data or write access, access must be explicit and revocable (user/org consent) and scoped (least privilege).
  - Sensitive actions initiated via an API client (especially an agent) require step-up auth and strong audit trails.
  - All write endpoints must support idempotency keys; high-impact flows should support a “preview/quote” step before commit.
  - Log enough to audit actions without logging raw secrets or unnecessary user data.
- Versioning (MVP): avoid breaking changes; prefer additive evolution. If/when we need explicit API versioning strategy, capture it as an ADR before external GA.
- Backward compatibility: prefer additive changes; for breaking changes, coordinate a single deploy window (no long-lived multi-version support in MVP).
- Event schema compatibility: events are versioned; breaking changes require explicit migration/replay plan.

## Documentation expectations

- ADR required for major infra/architecture decisions (event store, stream transport, search engine, ingress).

---

## Questions to answer

## Open questions

1. Package manager and tooling preferences (npm/pnpm/yarn; lint/format).
2. How much automated testing is “enough” for MVP?
3. Will there be multiple contributors immediately?
4. Any existing standards you want to follow?
