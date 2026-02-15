# Chase Sets Marketplace Agent Guide

## Purpose
Provide the minimum source-of-truth map and execution constraints for agents working in this repository.

## Audience
- AI agents performing documentation or architecture tasks.
- Engineers reviewing agent-generated updates.

## Scope
This guide applies to repository-wide documentation work.

## Start Sequence
1. Read `.ai/PROJECT_BRIEF.md`.
2. Read `.ai/CONTEXT_INDEX.md`.
3. Read `docs/README.md`.
4. Read the target local guide (`services/<service>/AGENT.md` or `domains/<domain>/README.md`).

## Non-negotiables
- Agents must update canonical docs before summaries.
- Agents must keep bounded-context ownership explicit.
- Agents must keep API and event contracts versioned.
- Agents must avoid speculative claims about runtime behavior not present in the repo.

## Repository Map
- Architecture: `docs/architecture/README.md`
- Domain: `docs/domain/README.md`
- Standards: `docs/standards/versioning.md`, `docs/standards/errors.md`, `docs/standards/testing.md`
- ADRs: `docs/adrs/README.md`
- Runbooks: `docs/runbooks/README.md`
- Skills: `SKILL.md`, `docs/api/SKILL.md`, `docs/domain/SKILL.md`, `docs/events/SKILL.md`, `infra/SKILL.md`

## References
- `README.md`
- `CONTRIBUTING.md`
- `services/README.md`