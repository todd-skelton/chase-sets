# Context Index

Start here, then branch by task.

## Fast Path

1. `.ai/PROJECT_BRIEF.md`
2. `.ai/GLOSSARY.md`
3. `.ai/DECISIONS.md`
4. `.ai/CONVENTIONS.md`

## If You Are Working On X, Read Y

| Working on | Read first | Then read |
| --- | --- | --- |
| Product scope | `docs/product/PRD.md` | `docs/product/REQUIREMENTS.md` |
| User journey changes | `docs/product/USER_FLOWS.md` | `docs/product/ACCEPTANCE_CRITERIA.md` |
| Domain rules | `docs/domain/DOMAIN_MODEL.md` | `docs/domain/STATE_MACHINES.md` |
| Integration boundaries | `docs/domain/BOUNDED_CONTEXTS.md` | `docs/architecture/SYSTEM_OVERVIEW.md` |
| Event design | `docs/domain/EVENT_TAXONOMY.md` | `docs/data/EVENT_STORE.md` |
| API contract | `docs/api/openapi.yaml` | `docs/api/ERRORS.md` |
| Webhook behavior | `docs/api/WEBHOOKS.md` | `docs/architecture/THREAT_MODEL.md` |
| Persistence and migrations | `docs/data/SCHEMA_CONVENTIONS.md` | `docs/data/MIGRATIONS.md` |
| Reliability and SLOs | `docs/architecture/QUALITY_ATTRIBUTES.md` | `docs/engineering/OBSERVABILITY.md` |
| Delivery process | `docs/engineering/RELEASES.md` | `docs/planning/DEFINITION_OF_DONE.md` |

## Decision Log

- Initial architecture ADR: `docs/adrs/0001-initial-architecture.md`
