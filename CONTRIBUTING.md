# Contributing

## Scope

This repository is in pre-code mode. Prioritize documentation, decision records, and architectural clarity over implementation.

## Workflow

1. Start from `.ai/CONTEXT_INDEX.md`.
2. If a change affects behavior or architecture, update `.ai/DECISIONS.md` and `docs/adrs/0001-initial-architecture.md` (or add a new ADR).
3. Keep docs short and link to canonical docs instead of duplicating content.
4. Use `docs/planning/STORIES_TEMPLATE.md` for execution-ready stories.
5. Treat `docs/*` and `.ai/*` as canonical source documents.

## Artifact Placement Rules

- Cross-cutting docs belong in `docs/` section files (product/domain/architecture/api/data/engineering/planning).
- System-wide architecture decisions belong in `docs/adrs/`.
- Domain/module-specific details should live near owning modules once those modules exist.
- Avoid duplicate narrative copies across files; update canonical targets instead.
- Do not add top-level numbered docs under `docs/`.

## Boundary and Ownership Rules

- Keep business invariants within owning bounded contexts.
- Integrate across contexts through contracts/events, not direct data ownership coupling.
- Keep infrastructure choices and adapters explicit and documented.

## Pull Request Expectations

- Clear summary of problem and change
- Linked docs updated
- Acceptance criteria referenced
- Risks and rollback notes included

## Writing Style

- Use precise terms from `.ai/GLOSSARY.md`
- Prefer checklists and explicit invariants
- Mark unknowns as `TODO(QUESTION): ...`

## Non-goals

- Do not add feature code unless explicitly requested
- Do not make vendor/compliance claims not captured in ADRs
