# Domain Docs

## Purpose
- Provide canonical domain model and bounded context references.

## Scope
- Glossary, context boundaries, event taxonomy, and state machines.

## Links
- `docs/domain/glossary.md`
- `docs/domain/BOUNDED_CONTEXTS.md`
- `docs/domain/DOMAIN_MODEL.md`
- `docs/domain/EVENT_TAXONOMY.md`
- `docs/domain/STATE_MACHINES.md`

## Checklist
- [ ] Update glossary when new business language is introduced.
- [ ] Keep bounded context ownership aligned with `services/*/AGENT.md`.
- [ ] Treat `Offer` as the canonical buyer-side term in prose; legacy ADR/backlog references to `Bid` are historical.
