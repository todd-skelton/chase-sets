# Chase Sets Marketplace Skill Index

## Purpose
Define shared agent playbooks without duplicating canonical standards.

## Scope
This index is repository-wide. Service-level constraints live in `services/*/AGENT.md`.

## Playbooks
- Domain modeling: `docs/domain/SKILL.md`
- API contracts: `docs/api/SKILL.md`
- Event design: `docs/events/SKILL.md`
- Infrastructure: `infra/SKILL.md`

## Required Standards
- Error contract: `docs/standards/errors.md`
- Versioning: `docs/standards/versioning.md`
- Testing: `docs/standards/testing.md`

## Workflow
1. Identify canonical owner doc.
2. Update contracts first.
3. Update standards references only when policy changes.
4. Keep local docs pointer-based.

## References
- `AGENT.md`
- `docs/README.md`