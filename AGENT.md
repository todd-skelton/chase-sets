# AGENT.md - Chase Sets

## Purpose
- Provide durable implementation guardrails for this repository.
- Keep behavior aligned with accepted ADRs and locked MVP decisions.

## Current State
- Repository is documentation-first; code is being introduced incrementally.
- Prefer thin vertical slices over deep subsystem build-out.

## Canonical Source Order
1. Locked MVP decisions: `artifacts/19-mvp-decisions-to-lock.md`
2. Accepted ADRs: `artifacts/adrs/*.md`
3. Cross-cutting architecture/standards: `artifacts/11-development-standards.md`, `artifacts/15-domain-map-and-integration-architecture.md`, `artifacts/23-domain-boundary-ownership-clarifications.md`
4. Domain docs: `domains/<domain>/docs/*`
5. Slice and backlog docs: `artifacts/22-slice-1-catalog-discovery.md`, `artifacts/21-initiatives-epics-stories-and-tasks.md`

## Decision Status Rule
- Treat only `Accepted` ADRs and explicitly locked MVP decisions as hard constraints.
- Treat `Proposed` ADRs and open questions as non-binding; do not implement them as final policy without confirmation.

## Architecture Invariants
- Event sourcing is the system of record.
- Event store is append-only Postgres streams with optimistic concurrency.
- Projectors run with at-least-once semantics and must be idempotent.
- Projectors checkpoint by global position.
- Side effects must be replay-safe via outbox/intent-event pattern.
- Avoid raw PII in event payloads; prefer IDs and references.
- Event store retention is indefinite for MVP; redaction/deletion happens in projections or side stores.

## Event Envelope Contract (MVP)
- Required event fields:
  - `eventId` (ULID)
  - `streamId`
  - `streamPosition`
  - `position` (global ordering cursor)
  - `occurredAt`
  - `schemaVersion`
  - `correlationId`
  - `causationId`

## Repository Boundaries
- `domains/*` own business invariants and domain meaning.
- `packages/*` are supporting primitives and config; no domain policy ownership.
- `apps/*` wire domains and expose IO surfaces (HTTP, workers, UI).
- `domains/*` must not depend on infrastructure SDKs or provider clients directly.

## Naming and Ubiquitous Language
- Use domain terminology docs as naming authority: `domains/<domain>/docs/terminology-and-definitions.md`.
- Reconcile shared terms in `artifacts/02-domain-model-and-glossary.md`.
- Type names and events use PascalCase; payload fields and public JSON keys use camelCase.
- Keep SQL naming differences internal; do not leak snake_case into public contracts.

## API Guardrails
- Single platform API posture: web client and external clients use the same API contracts.
- All write endpoints require idempotency keys (`clientRequestId`).
- Enforce pagination, max page sizes, rate limits, and quotas.
- MVP external agent posture is read-only discovery behind allowlisted integration keys and strict guardrails.

## Security, Privacy, and Audit
- Finance/security-sensitive actions require step-up auth.
- Never log secrets.
- Keep PII access role-gated and auditable.
- Admin actions must be reason-coded and auditable with actor and target references.

## Cross-Domain SoR Rules
- Commands flow to the owning system of record (SoR); events flow out.
- Projections are read-only and never become SoR.
- Cross-domain state changes require explicit contracts and idempotency rules.

## Build and Validation Expectations
- Add deterministic tests for domain rules.
- Add replay/idempotency tests for projectors.
- Add contract tests for cross-domain event payloads.
- Keep observability hooks in place for critical flows (correlation IDs, projector lag, dependency failures).

## Default Slice Execution Order
1. Catalog version identity and facet contracts
2. Search indexing and query behavior
3. API contracts for slice endpoints
4. Web flow integration
5. Worker/projector replay-safety checks

## Implementation Checklist (Per Change)
1. Confirm owning domain and SoR.
2. Confirm accepted ADR or locked decision supports the change.
3. Define command/event contract and idempotency key.
4. Verify event payload avoids raw PII.
5. Verify replay behavior and side-effect safety.
6. Update the owning domain docs and ADR/task artifacts when behavior changes.
