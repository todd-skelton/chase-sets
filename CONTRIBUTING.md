---
owner: docs
status: active
audience: all
last_reviewed: 2026-02-16
---

# Contributing

## Purpose
- Define how contributors update this pre-code documentation repository.
- Keep documentation changes traceable, scoped, and link-consistent.

## Audience
- Engineers and product contributors.
- AI agents preparing implementation-ready changes.

## Scope / Non-scope
- In scope: documentation updates, link maintenance, and source-of-truth alignment.
- Non-scope: adding runtime implementation code.

## Workflow
1. Start from `docs/README.md`.
2. Identify the canonical target file under `docs/`.
3. Update canonical docs before local summaries.
4. If architecture changes, add or update an ADR in `docs/adrs/`.
5. Validate links and terminology consistency.

## Documentation Rules
- Use canonical terms from `docs/domain/glossary.md`.
- Prefer concise, procedural sections over duplicated narrative.
- Keep links relative and valid.
- Keep requirements explicit with `must`, `should`, or `may` where applicable.

## Related docs
- [Documentation Index](docs/README.md)
- [Agent Guide](AGENT.md)
- [ADR Index](docs/adrs/README.md)

## Next steps
- Add verification checks for link integrity in CI once code scaffolding exists.
