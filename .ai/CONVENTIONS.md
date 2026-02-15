# Conventions

## Purpose
Summarize cross-repository conventions used by canonical docs.

## Naming
- Database identifiers should use `snake_case`.
- File names should use `kebab-case` where practical.
- Type names should use `PascalCase`.
- Variables and fields should use `camelCase`.

## Contracts
- Events must follow `<context>.<aggregate>.<past_tense_verb>`.
- API errors must follow `docs/standards/errors.md`.
- Mutating API operations must require `Idempotency-Key`.

## Repository Layout
- Canonical docs: `docs/`
- Domain detail: `domains/`
- Service ownership: `services/`
- Agent summaries: `.ai/`

## References
- `docs/standards/versioning.md`
- `docs/standards/errors.md`
- `docs/standards/testing.md`
- `docs/domain/glossary.md`