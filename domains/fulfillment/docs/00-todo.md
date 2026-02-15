# Fulfillment Domain â€” TODOs (Build Checklist)

This checklist is the drill-down work plan for Fulfillment (shipping, shipments, tracking).

## Inputs / dependencies

- Shipping provider baseline: `docs/adrs/010-shipping-easypost.md`
- Shipping credit model: `docs/adrs/014-shipping-rebate-cap.md`
- Locations/inventory scope (ADR): `docs/adrs/015-locations-and-inventory-scope.md`
- Fulfillment modes scope: `domains/fulfillment/docs/33-fulfillment-modes-and-pickup-scope.md`
- Locations/inventory posture: `domains/fulfillment/docs/20-locations-inventory-and-fulfillment-modes.md`
- Privacy posture (PII): `docs/engineering/SECURITY.md`

## Inventory model (doc-first)

- [ ] Define InventoryBalance + reservation model (location-scoped; global inventory as projection)
- [ ] Define reservation/commit/release event flow for:
  - [ ] Listing creation (reserve against a location)
  - [ ] Checkout/order creation (commit or release reservation)
  - [ ] Cancellation / expiration paths
- [ ] Define oversell prevention strategy (what must be strongly consistent)

## Shipment model (doc-first)

- [ ] Define Shipment aggregate vs Order shipping view (per-seller split shipments)
- [ ] Define address handling boundary (store references; minimize PII in events)
- [ ] Define packaging defaults and required data (weight/dimensions) for label purchase

## Label purchase & tracking

- [ ] Define label purchase flow events (LabelPurchaseRequested/Completed/Failed)
- [ ] Define tracking update ingestion and mapping to shipment status events
- [ ] Define delivery exception handling (lost/damaged/return-to-sender)

## Shipping credit settlement

- [ ] Define how shipping credit is represented as ledger events and reconciled to actual label cost
- [ ] Define edge cases (multiple labels, re-label, void label)

## API surface (first implementation)

- [ ] Document API contracts for:
  - [ ] Provide/confirm shipping address at checkout
  - [ ] Inventory adjustments (stock in/out) and inventory views per location
  - [ ] Inventory reservation/commit/release endpoints (used by Marketplace/Orders)
  - [ ] Seller shipping workflow (mark shipped, label purchase)
  - [ ] Buyer shipment tracking view

## Tests (when code starts)

- [ ] Replay tests for shipment status projections
- [ ] Provider webhook fixture tests (tracking)

