# Security

Related: `docs/architecture/THREAT_MODEL.md`, `docs/domain/BOUNDED_CONTEXTS.md`

## Secrets Management

- Never store secrets in source control.
- Use environment-based secret injection per environment.
- Rotate credentials on schedule and incident triggers.

## Authentication and Authorization

- Support password, social/SSO, MFA, and passkeys.
- Enforce RBAC for organization and admin operations.
- Apply step-up authentication for sensitive actions.

## API Security

- Require TLS for all external traffic.
- Apply rate limiting and abuse controls.
- Use idempotency and request signing where applicable.

## Dependency and Supply Chain

- Automated dependency vulnerability scanning.
- Container image scanning before deployment.
- Pin critical dependencies and monitor advisories.

## PII Handling

- Collect minimal personal data required for operation.
- Classify and restrict access to sensitive fields.
- Define retention and deletion policies.
- TODO(QUESTION): finalize data retention durations and DSAR process expectations
