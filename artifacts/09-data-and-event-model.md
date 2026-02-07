# 4.3 Data & Event Model

## Core entities

- **User**
- **Organization**
- **Channel** (a sales surface; first-party marketplace in MVP, others later)
- **ChannelConnection** (an org’s connection to a channel; credentials are referenced, not stored in events)
- **ExternalIdMapping** (maps external IDs to internal IDs per channel/org)
- **Location**
- **CatalogSet** (Pokémon expansion)
- **Item** (single card / sealed product)
- **CatalogAlias** (synonyms/alternate spellings; search + redirects)
- **CatalogChangeRequest** (proposed correction with review + publish)
- **Version** (edition/language/foil; grader+grade for graded)
- **VersionModel** (configuration template)
- **Option**
- **OptionValue**
- **VersionPath** (resolved selection)
- **SKU** (sellable unit; `Item + VersionPath`)
- **Listing** (sell)
- **Bid** (buy)
- **Checkout** (a buyer purchase intent that may span multiple sellers)
- **Order**
- **Payment** (processor references)
- **Wallet** (balance ledger)
- **BalanceTransaction** (credits/debits to a wallet)
- **Payout** (user-triggered withdrawal)
- **SupportCase** (internal support workflow; links to user/org/order/shipment)
- **Fulfillment** (shipment/tracking/status; EasyPost)
- **Shipment** (one or more packages for an order)
- **Package** (dimensions + weight + carrier/service; label purchase)
- **Fee** (marketplace fees)
- **ShippingCredit** (5% credit applied to shipping costs)
- **InventoryBalance** (SKU quantity per Location)
- **InventoryReservation** (temporary hold on InventoryBalance)

## Event sourcing

Tenant: the system is event sourced.

- Source of truth is the append-only event streams; projections/read models are derived.
- Projections can be JSON documents, relational tables, caches, and search indexes depending on use case.

## Naming & schema conventions

This system is TypeScript-first:

- **Event names** are `PascalCase` (e.g., `SkuResolved`, `TradeExecuted`).
- **Payload field names** are `camelCase` (e.g., `itemId`, `skuId`, `versionPath`, `flattenedFacets`).
- **Type/interface names** are `PascalCase` (e.g., `VersionModel`, `VersionPath`).

If a physical storage layer uses a different convention (e.g., SQL), it must be mapped at the boundary and must not leak into public contracts.

## Key events

- `UserRegistered`
- `ChannelConnected` / `ChannelDisconnected`
- `ExternalIdMapped` (e.g., external order/listing id ↔ internal id)
- `ItemCreated` / `ItemUpdated`
- `CatalogAliasAdded` / `CatalogAliasRemoved`
- `CatalogChangeRequested` / `CatalogChangeReviewed` / `CatalogChangePublished` / `CatalogChangeRejected`
- `ItemSuperseded`
- `ItemsMerged` / `ItemSplit`
- `ItemDeprecated` / `ItemReactivated`
- `VersionModelVersionPublished`
- `SkuResolved` (VersionPath resolved for an Item)
- `ListingCreated` / `ListingUpdated` / `ListingCancelled`
- `BidPlaced` / `BidUpdated` / `BidCancelled`
- `MatchCreated` (offer/listing execution; internal terms may still use bid/listing)
- `TradeExecuted` (Marketplace → Orders handoff; creates checkout/orders)
- `CheckoutCreated` / `CheckoutAbandoned`
- `OrderCreated`
- `PaymentAuthorized` / `PaymentCaptured` / `PaymentFailed`
- `PaymentAllocated` (allocate captured funds to seller/order ledgers)
- `TransferInitiated` / `TransferPaid` / `TransferFailed` (Stripe Connect transfer lifecycle)
- `RefundRequested` / `RefundIssued` / `RefundFailed`
- `DisputeOpened` / `DisputeUpdated` / `DisputeWon` / `DisputeLost`
- `ClaimOpened` / `ClaimResolved`
- `AllocationAdjusted` (unwind or re-allocate funds after refunds/disputes)
- `RiskFlagRaised` / `RiskFlagCleared`
- `PayoutHeld` / `PayoutReleased`
- `OrgFrozen` / `OrgUnfrozen`
- `TrustReportSubmitted`
- `TrustCaseOpened` / `TrustCaseUpdated` / `TrustCaseClosed`
- `TrustEvidenceSubmitted`
- `ListingTakedownRequested` / `ListingTakedownApplied` / `ListingReinstated`
- `SellerStrikeApplied` / `SellerStrikeRemoved`
- `OrgSuspended` / `OrgReinstated`
- `StepUpAuthRequired` / `StepUpAuthSatisfied`
- `StepUpAuthFailed` / `StepUpAuthExpired`
- `StepUpAuthBypassed` (admin-only; reason-coded)
- `SupportCaseOpened` / `SupportCaseUpdated` / `SupportCaseClosed`
- `SupportNoteAdded`
- `AdminActionRecorded`
- `DataExportRequested` / `DataExportPrepared` / `DataExportDelivered` / `DataExportFailed`
- `DataDeletionRequested` / `DataDeletionApproved` / `DataDeletionCompleted` / `DataDeletionRejected`
- `PiiRedacted`
- `SensitiveDataAccessed`
- `SellerOnboardingStarted` / `SellerOnboardingUpdated`
- `SellerVerificationRequired` / `SellerVerificationSubmitted` / `SellerVerificationPassed` / `SellerVerificationFailed`
- `TaxInfoRequired` / `TaxInfoSubmitted` / `TaxInfoVerified`
- `PayoutDestinationAdded` / `PayoutDestinationUpdated` / `PayoutDestinationRemoved`
- `PayoutEligibilityChanged`
- `PolicyPublished` / `PolicyDeprecated`
- `PolicyAccepted` / `OrgPolicyAccepted`
- `DisclosureAcknowledged`
- `ShippingCreditCalculated` (credit cap computed for an order)
- `ShippingQuoteEstimated` (for UX/authorization sizing)
- `BalanceCredited` / `BalanceDebited`
- `PayoutRequested` / `PayoutPaid` / `PayoutFailed`
- `FulfillmentUpdated`
- `ShipmentCreated` / `ShipmentLabelPurchased` / `ShipmentDelivered`
- `PickupSelected` / `PickupReady` / `PickupCompleted` / `PickupExpired` (if pickup enabled)
- `InventoryAdjusted` (stock in/out)
- `InventoryReserved` / `InventoryReservationReleased` / `InventoryCommitted`

## State transitions

- Listing: Draft → Active → Matched (sold / offer accepted) → Fulfilled | Cancelled | Expired
- Bid: Draft → Active → Matched (offer accepted) → Cancelled | Expired
- Order: Created → Paid → InFulfillment → Completed | Cancelled | Refunded
- Payout: Requested → Paid | Failed | Cancelled

## Ownership boundaries

- Catalog ownership: system-managed curated catalog (admin/editor workflows; audit required).
- Org-owned data: bids, listings, orders, inventory, locations.
- Account-owned data: user profile and auth/session state; accounts act on behalf of orgs.

---

## Questions to answer

## Open questions

1. Postgres event store details (ADR 007/008): stream keys (by SKU? by Order?), idempotency strategy, checkpointing, and retention.
2. How do we handle catalog corrections (rename/merge/split) while preserving historical listings/orders?
3. When do we credit seller balance (on payment capture vs on delivery/acceptance) and what holds/escrow rules apply?
4. How do we version VersionModels/VersionPaths so older orders remain referentially correct?
5. Export formats (CSV/JSON) and which entities must be portable.
6. Money math invariants: rounding rules and allocation determinism for multi-seller + split shipments.
