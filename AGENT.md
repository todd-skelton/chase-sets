---
owner: docs
status: active
audience: agents
last_reviewed: 2026-02-16
---

# Chase Sets Marketplace Agent Guide

## Purpose
- Define the default workflow for AI agents editing this repo.
- Keep edits aligned with canonical documentation hierarchy.
- Prevent duplicate or conflicting source-of-truth updates.

## Scope / Non-scope
- In scope: repository-wide documentation edits.
- Non-scope: runtime behavior claims not represented in repository docs.

## Start Sequence
1. Read `docs/README.md`.
2. Read `docs/AGENT_GUIDE.md`.
3. Read the target topic index (`docs/domain/README.md`, `docs/architecture/README.md`, etc.).
4. Read service-local guidance only when required: `services/<service>/AGENT.md`.

## Non-negotiables
- Update canonical docs before summaries.
- Keep bounded-context ownership explicit.
- Keep API and event contracts versioned.
- Avoid speculative claims about runtime behavior.

## Related docs
- [Agent Workflow Guide](docs/AGENT_GUIDE.md)
- [Contributing](CONTRIBUTING.md)
- [Services Documentation](services/README.md)

## Next steps
- Keep service guides synchronized with canonical domain docs when boundaries change.
