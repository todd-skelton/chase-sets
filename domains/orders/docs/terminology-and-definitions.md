# Orders Terminology and Definitions

## Purpose
Define order-specific terms not already canonicalized in `../../../docs/domain/glossary.md`.

## Audience
- Engineers implementing checkout and order orchestration.
- AI agents documenting order contracts.

## Scope
Orders covers checkout submission and seller-scoped order lifecycle.

## Domain Terms
- **Order Split**: deterministic partition of checkout outcomes into seller-scoped orders.
- **Order Line Snapshot**: immutable purchase detail captured at order creation.
- **Checkout State**: lifecycle state of buyer checkout flow.
- **Order State**: lifecycle state of seller-scoped order commitment.

## Boundaries
Orders owns checkout/order transitions and orchestration contracts. Orders does not own payment processor internals or carrier execution internals.

## References
- `../../../docs/domain/glossary.md`
- `01-orders-scope-and-lifecycle.md`