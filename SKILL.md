# Chase Sets Marketplace Skill Index

## Purpose
- Provide short, repeatable playbooks for agents working in this repo.
- Minimize context by pointing to canonical docs instead of duplicating detail.

## Scope
- Applies repo-wide.
- Service-specific constraints live in `services/*/AGENT.md`.

## Links
- `docs/domain/SKILL.md`
- `docs/api/SKILL.md`
- `docs/events/SKILL.md`
- `infra/SKILL.md`
- `docs/standards/testing.md`
- `docs/standards/versioning.md`
- `docs/standards/errors.md`

## Checklist
### Add a new domain capability
1. Confirm owning bounded context in `services/<context>/AGENT.md`.
2. Define or refine terms in `docs/domain/glossary.md`.
3. Model aggregate boundaries and invariants in domain layer first.
4. Add application use case(s) and authorization checks.
5. Add infra adapters only after domain and app contracts are stable.
6. Define emitted/consumed events and version implications.
7. Add tests by layer: domain unit, app integration, adapter integration.
8. Add observability fields (`correlationId`, `tenantId`, key metrics).
9. Update runbook if operations or failure modes change.

### Add an API endpoint
1. Update OpenAPI first at `services/<context>/openapi/openapi.yaml`.
2. Confirm request and response validation rules.
3. Apply authn/authz at application boundary, not controllers only.
4. Use standard error shape from `docs/standards/errors.md`.
5. Add pagination/filtering conventions if list endpoint.
6. Add contract tests plus integration tests.
7. Add metrics, structured logs, and trace spans.
8. Document breaking change and version bump if required.

### Design a domain event
1. Use naming: `event_type = <context>.<aggregate>.<past_tense_verb>`.
2. Define schema and semantics before publisher implementation.
3. Include required envelope fields and idempotency key.
4. Record event in outbox in same transaction as state change.
5. Make consumer logic idempotent and replay-safe.
6. Apply additive changes in-version; bump `event_version` for breaking changes.
7. Add publisher and consumer contract tests.
8. Document event in `docs/events/SKILL.md` references.

### Add a DB change
1. Prefer expand/contract migration strategy.
2. Write forward-only migration with rollback plan notes.
3. Avoid long table locks and risky default backfills in one step.
4. Add index changes safely (concurrent where supported).
5. Keep old and new schema paths compatible during transition.
6. Add migration verification checks and data consistency tests.
7. Update runbook with deployment ordering notes.

### Add a new architectural pattern
1. Verify existing pattern cannot solve the problem.
2. Draft ADR with context, options, decision, consequences.
3. Link impacted contexts, contracts, and operational concerns.
4. Get review before implementation starts.
5. Update root `AGENT.md` and relevant local `AGENT.md` files.
6. Add guardrail tests or lint rules if pattern is safety-critical.

### Context minimization rules
1. Prefer pointer docs over long repeated prose.
2. Update canonical source once; link from other docs.
3. Keep checklists short and executable.
4. Avoid restating standards already in `docs/standards/*`.
5. Use TODO markers for unknowns instead of speculative detail.

### Testing pyramid summary
1. Unit tests for domain invariants and pure logic.
2. Integration tests for application workflows and DB boundaries.
3. Contract tests for API schemas and event payloads.
4. Targeted e2e tests for critical user journeys only.
5. Keep flaky test budget at zero; quarantine and fix immediately.

### Observability requirements
1. Include `correlationId` end-to-end across HTTP, events, and jobs.
2. Emit structured logs with service, context, tenant, and outcome fields.
3. Add traces for critical paths and external calls.
4. Publish business and technical metrics with clear names.
5. Define alerts and runbook links for new critical paths.
