# Webhooks (Optional)

Related: `docs/api/ERRORS.md`, `docs/architecture/THREAT_MODEL.md`

## Scope

TODO(QUESTION): decide initial webhook direction:
- outbound events from Chase Sets to third parties
- inbound events to Chase Sets (for example Stripe)
- both

## Security

- Sign every webhook payload.
- Validate signature and timestamp on receipt.
- Reject payloads outside replay tolerance window.

## Delivery Semantics

- At-least-once delivery
- Consumer must be idempotent by event delivery ID
- No strict global ordering guarantee across event types

## Retries

- Exponential backoff with max delivery attempts
- Dead-letter or manual replay path for persistent failures

## Payload Contract

- Include `event_id`, `event_type`, `occurred_at`, `correlation_id`.
- Include `schema_version` and additive evolution policy.
