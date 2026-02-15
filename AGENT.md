# Chase Sets Marketplace Agent Guide

## Purpose
- Align every change to a multi-tenant collectibles marketplace with strong boundaries and fast iteration.
- Keep agent context minimal by using pointer docs and local service guides.
- Favor contract-first APIs and events so teams can evolve independently.

## North Star
- Protect domain boundaries so scale does not increase coupling.
- Ship safely with versioned contracts, tests, and observability by default.
- Keep docs concise, current, and pointer-based to reduce prompt load.
- Design for marketplace trust, auditability, and tenant isolation.

## Repo Map
- `docs/architecture/README.md`
- `docs/domain/README.md`
- `docs/domain/glossary.md`
- `docs/adrs/README.md`
- `docs/adrs/0001-initial-architecture.md`
- `docs/standards/versioning.md`
- `docs/standards/errors.md`
- `docs/standards/testing.md`
- `docs/runbooks/README.md`
- `docs/api/SKILL.md`
- `docs/events/SKILL.md`
- `docs/domain/SKILL.md`
- `infra/SKILL.md`
- `services/*/AGENT.md`

## Non-Negotiables
- No production code change without tests at the right layer.
- API and event contracts are explicit, versioned, and backward-compatible by policy.
- Bounded context data is private unless shared through contracts.
- New architectural patterns require an ADR before adoption.
- No secrets in repo, logs, tests, fixtures, or examples.

## Architecture Boundaries
- Layering rules:
  - `domain`: business rules, entities, value objects, domain services, invariants.
  - `application`: use cases, orchestration, transaction boundaries, authorization checks.
  - `infrastructure`: DB, HTTP, messaging, external providers, persistence mappings.
- Dependency direction:
  - `domain` depends on nothing external.
  - `application` may depend on `domain` only.
  - `infrastructure` depends on `application` and `domain`, never the reverse.
- Contract-first rules:
  - Define or update OpenAPI before endpoint implementation.
  - Define or update event schema before publisher/consumer changes.

## Initial Bounded Contexts
- `identity`
- `catalog`
- `marketplace`
- `orders`
- `fulfillment`
- `payments`
- `search`
- `reputation`
- Ownership rule: each bounded context owns its data and publishes facts through versioned contracts.

## Service to Domain Mapping
- `accounts` -> `Identity`
- `catalog` -> `Catalog`
- `listings` -> `Marketplace`
- `orders` -> `Orders`
- `shipping` -> `Fulfillment`
- `search` -> `Search`
- `integrations` -> cross-cutting adapters
- `trust-safety` -> planned capability

## Commands
- Install deps: `pnpm install`
- Run all tests: `pnpm test`
- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Build: `pnpm build`
- Service-local pattern: `pnpm -C services/<context> <script>`
- TODO: confirm exact workspace scripts once `package.json` commands are finalized.

## Definition of Done
- [ ] Scope aligns with owning bounded context.
- [ ] Contracts updated first (OpenAPI and/or event schema).
- [ ] Backward-compatibility impact reviewed and versioning applied.
- [ ] Tests added or updated (unit, integration, contract, e2e as applicable).
- [ ] Metrics, logs, traces, and correlation IDs included.
- [ ] Docs updated (local `AGENT.md`, standards, runbooks, glossary) when behavior changes.
- [ ] ADR added for new architectural pattern or boundary change.
- [ ] Security checks passed (no secrets, least privilege, authz coverage).

## How Agents Should Work Here
1. Read this file first.
2. Read the local file for target scope (`services/<context>/AGENT.md`).
3. Follow playbooks in root `SKILL.md` plus `docs/*/SKILL.md` and `infra/SKILL.md`.
4. Reuse existing patterns before introducing new ones.
5. If a new pattern is needed, write/update ADR first.
6. Keep PR scope narrow: one capability, one context, one contract surface when possible.

## Security, Secrets, and Logging
- Never commit secrets. Use `.env.example` for keys only, real values in secret manager.
- Treat tenant and PII data as sensitive; redact in logs and test fixtures.
- Log structured JSON with `correlationId` and `tenantId` when available.
- Avoid logging access tokens, payment details, personal addresses, or raw webhook payloads.
- TODO: define compliance scope and retention policy in a dedicated runbook.

## Links
- `SKILL.md`
- `docs/architecture/README.md`
- `docs/domain/README.md`
- `docs/runbooks/README.md`
