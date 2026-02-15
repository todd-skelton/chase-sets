# Listings Service Guide

## Purpose
Define listing and offer lifecycle ownership within marketplace behavior.

## Audience
- Engineers implementing listings capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: listing lifecycle, offer lifecycle, and visibility state constraints.
- Does not own: catalog canonical identity ownership or payment provider orchestration.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service guide contract: `../SERVICE_GUIDE_CONTRACT.md`

## Invariants
- Each listing and offer must reference one sellable version identity.
- Terminal listing and offer states must block further execution attempts.

## References
- `../../services/README.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`
- `../../domains/marketplace/README.md`
