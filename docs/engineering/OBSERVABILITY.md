# Observability

Related: `docs/architecture/QUALITY_ATTRIBUTES.md`, `docs/engineering/RELEASES.md`

## Logging

Use structured logs with at least:

- `timestamp`
- `level`
- `service`
- `environment`
- `request_id`
- `correlation_id`
- `causation_id`
- `actor_id` (when available)
- `event_type` (for domain operations)

## Tracing

- Instrument HTTP, DB, and async projector pipelines.
- Propagate W3C trace context across boundaries.
- Link webhook and Stripe callbacks to originating correlation ID where possible.

## Metrics

- Request throughput and latency by endpoint
- Error rate by code family
- Projection lag
- Event append conflicts
- Payment and payout outcome rates

## SLOs

- TODO(QUESTION): define numeric SLOs and alert thresholds
