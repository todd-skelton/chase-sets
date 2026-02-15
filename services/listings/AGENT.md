# Listings Service Guide

## Purpose
Define offer/listing lifecycle ownership inside marketplace behavior.

## Audience
- Engineers implementing listings capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: listing lifecycle, visibility state, and seller-side listing constraints.
- Does not own: catalog canonical identity ownership and payment provider orchestration.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service-local OpenAPI/event directories are not present yet in this pre-code repository.

## Invariants
- Each listing must reference one sellable version identity.
- Listing terminal states must block further purchase attempts.

## References
- `../../services/README.md`
- `../../AGENT.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`