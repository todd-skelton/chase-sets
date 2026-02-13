# 3.1 Product Principles

These principles are decision filters. If a proposal violates a principle, it needs an explicit exception.

## Principles (draft)

1. **Fair by default**
   - Transparent fees and execution rules.
   - No dark patterns (no hidden costs, no deceptive ranking).
   - Fees are aligned to incentives:
     - Seller fee: 5% applied per item, rounded up to the nearest cent.
     - Buyer pays payment processing fees and can reduce them by choosing lower-cost rails.

2. **Catalog truth over convenience**
   - Prefer correct canonical items/versions even if it slows feature delivery.
   - Catalog changes are auditable.

3. **Fast to value**
   - A new user can search → act (buy/sell/offer/list) in under 2 minutes.

4. **API-first platform**
   - The web app is the first API consumer.
   - The marketplace client uses the same platform APIs available to external clients (no hidden endpoints).
   - Deep integrations are supported behind guardrails (rate limits, quotas, pagination, async bulk workflows).
   - AI assistant/agent clients can act on behalf of users (with explicit consent, scoped access, step-up for sensitive actions, and full auditability).

5. **Secure by design**
   - Payment and customer information must never be leaked.
   - Minimize stored sensitive data.

6. **OSS-first, container-first delivery**
   - Backend services run as OCI containers.
   - The web app ships as static assets served via CDN.
   - Prefer best-in-class open-source components for core infrastructure (eventing, storage, observability).
