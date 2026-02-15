# Contributing

## Purpose
Define how contributors update this pre-code documentation repository.

## Audience
- Engineers and product contributors.
- AI agents preparing implementation-ready changes.

## Scope
This guide applies to documentation updates in this repository.

## Workflow
1. Start from `.ai/CONTEXT_INDEX.md`.
2. Identify the canonical target file under `docs/`.
3. Update canonical docs before local summaries.
4. If architecture changes, update `.ai/DECISIONS.md` and add/update an ADR in `docs/adrs/`.
5. Validate links and terminology consistency.

## Documentation Rules
- Contributors must use canonical terms from `docs/domain/glossary.md`.
- Contributors should prefer short, procedural sections and avoid duplicated narrative.
- Contributors must keep links relative.
- Contributors must keep requirements explicit with `must`, `should`, or `may` where applicable.

## Pull Request Expectations
- Clear problem statement and intended outcome.
- Updated canonical docs and references.
- Explicit risks and rollout notes when contracts change.

## Non-goals
- Adding runtime implementation code.
- Storing secrets or production credentials.