# Accounts Service Guide

## Purpose
Define identity-account boundary and authorization policy ownership.

## Audience
- Engineers implementing accounts capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: account lifecycle, organization membership, and role assignments.
- Does not own: catalog metadata, marketplace matching, payment orchestration, or shipment execution.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service guide contract: `../SERVICE_GUIDE_CONTRACT.md`

## Invariants
- Membership grants must be explicit and scoped to organization context.
- Privileged actions must be authorized in application logic.

## References
- `../../services/README.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`
- `../../domains/identity/README.md`
