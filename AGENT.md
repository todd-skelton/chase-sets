# Chase Sets Marketplace — Agent Operating Guide (AGENT.md)

## North Star

Build a multi-tenant collectibles marketplace (Chase Sets Marketplace) that is:

- Scalable (domain + infra boundaries hold under growth)
- Maintainable (clear ownership, predictable patterns)
- Testable (fast unit tests, reliable integration tests)
- AI-leveragable (small, authoritative context; self-describing repo)

## Repo Map (authoritative entry points)

- `docs/architecture/README.md` — high-level system architecture
- `docs/domain/README.md` — domain glossary + bounded contexts
- `docs/adr/` — architecture decision records (ADRs)
- `docs/runbooks/` — operational runbooks
- `services/` — deployable services (each with local AGENT.md)
- `packages/` — shared libraries (types, UI, SDKs)
- `infrastructure/` — IaC, deployments, environments
- `scripts/` — repo automation

## Non-Negotiables (quality bars)

- Every change includes tests appropriate to its layer.
- Public APIs and domain events are versioned.
- No cross-domain data coupling without an explicit ADR.
- No “magic” conventions: all conventions are documented in `docs/`.

## Default Architecture

- Modular monolith acceptable initially ONLY if it preserves bounded contexts and can split cleanly.
- Prefer: “packages (shared) + services (deployable)” with explicit APIs.
- Domain boundaries first; persistence is an implementation detail.

## Bounded Contexts

- Identity
- Catalog
- Marketplace
- Search
- Orders
- Payments
- Fulfillment
- Reputation
  Each context owns its data and emits events.

## Tech Stack (initial assumptions)

- Language: TypeScript
- DB: Postgres
- API: REST (OpenAPI); Server-sent events for async updates; GraphQL considered for future read APIs.
- Observability: structured logs + tracing + metrics

## Naming & Layout Rules

- Domain code: `services/<context>/src/domain/*`
- Application layer: `services/<context>/src/app/*`
- Infrastructure adapters: `services/<context>/src/infra/*`
- No importing `infra` from `domain`.
- Shared types: `packages/types/*` (versioned)

## Commands (must be kept current)

- Install: `pnpm i`
- Lint: `pnpm lint`
- Unit tests: `pnpm test`
- Integration tests: `pnpm test:integration`
- Local dev: `pnpm dev`
- Migrations: `pnpm db:migrate`
- Seed: `pnpm db:seed`

## “Definition of Done”

- Tests added/updated
- OpenAPI/schema updated (if API change)
- ADR added (if architectural decision)
- Docs updated (if changes affect usage or conventions)
- Observability hooks added (if new workflow)

## How Agents Should Work Here

1. Read `AGENT.md`, then the local `services/<x>/AGENT.md` for scope.
2. Prefer modifying existing patterns over inventing new ones.
3. If a new pattern is required, write an ADR first.
4. Keep changes small and composable; avoid refactors + features in one PR.

## Where To Put New Knowledge

- Domain terms → `docs/domain/glossary.md`
- Decisions → `docs/adr/XXXX-title.md`
- “How to do X” → relevant `SKILL.md` or `docs/playbooks/`
- Operational procedures → `docs/runbooks/`

## Safety / Secrets

- Never commit secrets.
- Use `.env.example` and secret manager references.
- Redact sensitive data from logs; follow `docs/security/logging.md`.
