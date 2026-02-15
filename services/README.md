# Services Documentation

## Purpose
Provide the canonical entry point for service ownership guides.

## Audience
- Engineers defining service boundaries and contracts.
- AI agents applying service-local constraints.

## Scope
Each service guide defines ownership, interfaces, invariants, and cross-context references.

## Service Guide Contract
All service guides must follow [Service Guide Contract](SERVICE_GUIDE_CONTRACT.md).

## Service Guides
- [Accounts](accounts/AGENT.md)
- [Catalog](catalog/AGENT.md)
- [Integrations](integrations/AGENT.md)
- [Listings](listings/AGENT.md)
- [Orders](orders/AGENT.md)
- [Search](search/AGENT.md)
- [Shipping](shipping/AGENT.md)
- [Trust-Safety](trust-safety/AGENT.md)

## Interface Status
Service-local OpenAPI and event directories are not present in this pre-code repository.
The canonical API contract is `../docs/api/openapi.yaml`.

## References
- [Agent Guide](../AGENT.md)
- [API Playbook](../docs/api/SKILL.md)
- [Domain Playbook](../docs/domain/SKILL.md)
