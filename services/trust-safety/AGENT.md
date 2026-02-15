# Trust-Safety Service Guide

## Purpose
Define policy enforcement and risk signal ownership.

## Audience
- Engineers implementing trust-safety capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: moderation policy decisions, enforcement outcomes, and audit records.
- Does not own: identity credential storage or order source-of-truth lifecycle state.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service guide contract: `../SERVICE_GUIDE_CONTRACT.md`

## Invariants
- Enforcement actions must capture actor, reason, and policy context.
- Equivalent policy inputs should produce deterministic enforcement outcomes.

## References
- `../../services/README.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`
- `../../docs/architecture/THREAT_MODEL.md`
