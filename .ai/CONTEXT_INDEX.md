# Context Index

## Purpose
Provide the fastest navigation path to canonical docs.

## Audience
- AI agents selecting source-of-truth files.
- Engineers onboarding to the repo structure.

## Fast Path
1. `.ai/PROJECT_BRIEF.md`
2. `.ai/GLOSSARY.md`
3. `.ai/DECISIONS.md`
4. `.ai/CONVENTIONS.md`

## Task Routing
| Task | Read first | Then read |
| --- | --- | --- |
| Product scope | `docs/product/PRD.md` | `docs/product/REQUIREMENTS.md` |
| User flows | `docs/product/USER_FLOWS.md` | `docs/product/ACCEPTANCE_CRITERIA.md` |
| Domain rules | `docs/domain/DOMAIN_MODEL.md` | `docs/domain/STATE_MACHINES.md` |
| Architecture boundaries | `docs/architecture/SYSTEM_OVERVIEW.md` | `docs/domain/BOUNDED_CONTEXTS.md` |
| API contracts | `docs/api/openapi.yaml` | `docs/api/ERRORS.md` |
| Events | `docs/domain/EVENT_TAXONOMY.md` | `docs/data/EVENT_STORE.md` |
| Data rollout | `docs/data/SCHEMA_CONVENTIONS.md` | `docs/data/SCHEMA_ROLLOUT.md` |
| Operations | `docs/runbooks/README.md` | `docs/engineering/OBSERVABILITY.md` |

## References
- `docs/adrs/README.md`