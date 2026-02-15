# State Machines

Related: `docs/domain/DOMAIN_MODEL.md`, `docs/product/USER_FLOWS.md`

## Source of Truth

Lifecycle definitions are authoritative in domain-level docs under `domains/*/docs/`.

## Authoritative Domain Lifecycle Docs

- Orders lifecycle: `domains/orders/docs/01-orders-scope-and-lifecycle.md`
- Fulfillment lifecycle: `domains/fulfillment/docs/18-shipping-and-fulfillment-mvp.md`
- Payments and payout/dispute lifecycle: `domains/payments/docs/21-disputes-refunds-chargebacks-and-ledger-unwind.md`
- Identity step-up lifecycle/policy: `domains/identity/docs/32-step-up-auth-and-sensitive-actions-policy.md`

## Modeling Rule

- Keep this file as an index/summary only.
- Do not add canonical transition tables here; update the owning domain doc instead.
