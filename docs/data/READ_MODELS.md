# Read Models

Related: `docs/data/EVENT_STORE.md`, `docs/architecture/QUALITY_ATTRIBUTES.md`

## Purpose

Read models provide query-optimized views for user journeys that should not reconstruct aggregate state on every request.

## Candidate Read Models

- `listing_search_view`
- `buyer_order_history_view`
- `seller_order_queue_view`
- `payout_status_view`
- `dispute_dashboard_view`

## Design Guidelines

- Denormalize only what is needed for latency and filtering.
- Include projection lag indicators for operational visibility.
- Keep projection ownership within the producing bounded context.

## Pagination and Search

- Use cursor pagination for large collections.
- Keep sort keys stable and indexed.
- TODO(QUESTION): finalize search index provider and sync strategy
