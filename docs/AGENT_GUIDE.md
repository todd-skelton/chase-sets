---
owner: docs
status: active
audience: agents
last_reviewed: 2026-02-16
---

# Agent Workflow Guide

## Purpose
- Define where agents should add new documentation.
- Define canonical-location and precedence rules.
- Keep link and ownership conventions consistent.

## Scope / Non-scope
- In scope: docs placement, linking rules, and conflict resolution.
- Non-scope: service-specific logic and runtime implementation details.

## Where To Add New Docs
- Cross-cutting product/platform docs: `docs/` and appropriate existing subdirectory.
- Domain requirement docs: `docs/domain/` using `<domain>-<topic>.md` naming.
- Service-local constraints: `services/<service>/AGENT.md`.
- Architecture decisions: `docs/adrs/`.

## Canonical Location Rules
- Prefer existing canonical section docs before creating another topic file.
- If a topic spans multiple docs, keep one canonical owner doc and link from supporting docs.
- Do not create parallel indexes outside `docs/README.md`.

## Linking Rules
- Use relative links.
- Link to canonical docs, not summaries.
- Remove stale links as part of every move/rename.

## Precedence Rules
1. `README.md`
2. `docs/README.md`
3. `docs/adrs/*.md`
4. Canonical docs under `docs/`
5. Supporting guides (`services/*/AGENT.md`, playbooks, templates)

## Related docs
- [Agent Guide](../AGENT.md)
- [Docs Index](README.md)
- [Domain Docs](domain/README.md)

## Next steps
- Add automated link checking once CI scaffolding exists.
