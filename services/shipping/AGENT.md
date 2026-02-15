# Shipping Service Guide

## Purpose
Define shipment planning and tracking behavior ownership.

## Audience
- Engineers implementing shipping capabilities.
- AI agents applying service-local constraints.

## Scope
- Owns: shipment planning, label orchestration, and tracking status updates.
- Does not own: checkout creation and payment authorization ownership.

## Interfaces
- Canonical API contract: `../../docs/api/openapi.yaml`
- Service-local OpenAPI/event directories are not present yet in this pre-code repository.

## Invariants
- Shipments must reference valid fulfillable order data.
- Tracking updates must be append-only facts with deterministic projection updates.

## References
- `../../services/README.md`
- `../../AGENT.md`
- `../../docs/domain/BOUNDED_CONTEXTS.md`