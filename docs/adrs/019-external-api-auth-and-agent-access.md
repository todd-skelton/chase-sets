# ADR 019: External API Authentication and Agent Access

## Status
Proposed

## Context
External clients and AI assistants need controlled access to platform APIs with strong scoping, auditing, and abuse protections.

## MVP Direction
- Scope is read-only discovery APIs.
- Access is allowlisted and key-scoped.
- Delegated write access is out of scope for baseline.

## Goals
- Scoped and revocable credentials.
- Strong attribution for client and actor identity.
- Guardrails through quotas, pagination limits, and monitoring.

## Options Considered
1. Session-only access.
2. API key/PAT access.
3. OAuth delegated access.
4. Hybrid model.

## Decision
For baseline, use allowlisted integration keys for read-only discovery surfaces and enforce strict operational guardrails.

## Consequences
- Credential lifecycle tooling is required.
- Access logs must capture client identity and request context.
- Future delegated write access requires additional authorization design.

## References
- `../api/WEBHOOKS.md`
- `../standards/versioning.md`
- `../engineering/SECURITY.md`