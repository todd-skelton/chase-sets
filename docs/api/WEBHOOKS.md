# Webhooks

## Purpose
Define baseline webhook policy for the repository.

## Audience
- Engineers integrating provider callbacks.
- AI agents documenting integration flows.

## Scope
Baseline scope is inbound provider webhooks only.

## In-Scope Providers
- Stripe payment webhooks.
- Shipping provider webhooks (for example EasyPost tracking updates).

## Security
- Receivers must verify signatures.
- Receivers must enforce timestamp tolerance.
- Receivers must reject replayed delivery identifiers.

## Delivery Semantics
- Provider delivery is treated as at-least-once.
- Consumers must be idempotent by provider delivery identifier.
- Processing should be asynchronous when downstream writes are expensive.

## Payload Contract
Inbound payload handling must map provider events into internal events with:
- `event_id`
- `event_type`
- `occurred_at`
- `correlation_id`
- `schema_version`

## References
- `ERRORS.md`
- `../architecture/THREAT_MODEL.md`
- `../standards/errors.md`