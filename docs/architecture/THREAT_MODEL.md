# Threat Model

Related: `docs/engineering/SECURITY.md`, `docs/api/WEBHOOKS.md`

## Top Threats

- Account takeover (credential stuffing, session theft)
- Payment fraud and chargeback abuse
- Listing fraud (counterfeit or misrepresented condition)
- API abuse (bot traffic, scraping, denial attempts)
- Webhook spoofing or replay attacks
- Insider misuse of sensitive operations

## Mitigations

- MFA and passkey support with risk-based step-up auth
- RBAC and scoped privileged operations
- Idempotency keys and replay resistance for mutating calls
- Rate limits, IP/device heuristics, and anomaly detection
- Signed webhook verification and timestamp tolerance checks
- Structured audit logs for high-risk actions

## Abuse and Fraud Focus

- Monitor suspicious velocity on offers, purchases, and disputes.
- Add holds and manual review gates for high-risk payouts.
- Preserve immutable evidence in event streams.

## Security Controls

- Encrypt data in transit and at rest.
- Secrets managed outside source control.
- Dependency and image scanning in CI.
