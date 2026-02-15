# Integrations Service Guide

## Purpose
Define external adapter and provider boundary behavior.

## Audience
- Engineers implementing integrations capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: provider adapters, inbound webhook normalization, and outbound integration dispatch.
- Does not own: core business invariants owned by domain contexts.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service guide contract: `../SERVICE_GUIDE_CONTRACT.md`

## Invariants
- Provider payload mapping must be explicit and version-aware.
- External side effects must be idempotent and retry-safe.

## References
- `../../services/README.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`
- `../../docs/api/WEBHOOKS.md`
