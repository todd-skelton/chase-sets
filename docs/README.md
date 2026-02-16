---
owner: docs
status: active
audience: all
last_reviewed: 2026-02-16
---

# Documentation Index

## Purpose
- Serve as the single discoverable documentation entry point.
- Route readers to canonical docs by topic.
- Define documentation precedence when conflicts exist.

## Audience
- AI agents selecting source-of-truth files.
- Engineers implementing product and platform behavior.

## Scope / Non-scope
- In scope: canonical navigation for repository docs and ownership boundaries.
- Non-scope: repeating full content from topic-specific docs.

## Start Here
1. [Repository README](../README.md)
2. [Agent Workflow Guide](AGENT_GUIDE.md)
3. [Setup](setup.md)
4. [Architecture Docs](architecture/README.md)
5. [Domain Docs](domain/README.md)

## Canonical Topics
- Product: [PRD](product/PRD.md), [Requirements](product/REQUIREMENTS.md), [User Flows](product/USER_FLOWS.md), [Acceptance Criteria](product/ACCEPTANCE_CRITERIA.md)
- Domain core: [Glossary](domain/glossary.md), [Bounded Contexts](domain/BOUNDED_CONTEXTS.md), [Domain Model](domain/DOMAIN_MODEL.md), [Event Taxonomy](domain/EVENT_TAXONOMY.md), [State Machines](domain/STATE_MACHINES.md)
- Domain requirements by context: [Domain Docs Index](domain/README.md)
- Architecture: [Architecture Index](architecture/README.md), [System Overview](architecture/SYSTEM_OVERVIEW.md), [Threat Model](architecture/THREAT_MODEL.md)
- API: [Error Usage](api/ERRORS.md), [Webhooks](api/WEBHOOKS.md), `api/openapi.yaml`
- Data: [Event Store](data/EVENT_STORE.md), [Read Models](data/READ_MODELS.md), [Schema Conventions](data/SCHEMA_CONVENTIONS.md), [Schema Rollout](data/SCHEMA_ROLLOUT.md)
- Engineering and standards: [Coding Standards](engineering/CODING_STANDARDS.md), [Security](engineering/SECURITY.md), [Observability](engineering/OBSERVABILITY.md), [Ownership and Support](engineering/OWNERSHIP_AND_SUPPORT.md), [Releases](engineering/RELEASES.md), [Testing Standard](standards/testing.md), [Error Standard](standards/errors.md), [Versioning Standard](standards/versioning.md)
- Planning: [Roadmap](planning/ROADMAP.md), [Epics](planning/EPICS.md), [Definition of Ready](planning/DEFINITION_OF_READY.md), [Definition of Done](planning/DEFINITION_OF_DONE.md), [Story Template](planning/STORIES_TEMPLATE.md)
- Operations: [Runbooks](runbooks/README.md)
- Decisions: [ADR Index](adrs/README.md)
- Agent playbooks: [Skill Index](../SKILL.md), [Events Playbook](events/SKILL.md), [Infrastructure Playbook](../infra/SKILL.md)

## Source-of-Truth Hierarchy
1. Root repository intent: `README.md`
2. Canonical docs map and navigation: `docs/README.md`
3. Decision records and architecture commitments: `docs/adrs/README.md` and `docs/adrs/*.md`
4. Domain/product/engineering canonical docs under `docs/`
5. Supporting guides and templates (`services/*/AGENT.md`, `SKILL.md`, templates in `docs/planning/`)

## Related docs
- [Reorganization Inventory](REORG_INVENTORY.md)
- [Agent Guide](../AGENT.md)
- [Contributing](../CONTRIBUTING.md)
- [Domain Docs](domain/README.md)

## Next steps
- Keep this index updated whenever canonical file locations or ownership rules change.
- Add missing operational runbooks as services become real.

