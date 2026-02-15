# Observability

## Purpose
Define minimum logging, tracing, and metrics standards.

## Scope
Applies to API handling, event processing, and integration flows.

## Logging
Structured logs should include:
- `timestamp`
- `level`
- `service`
- `environment`
- `request_id`
- `correlation_id`

## Tracing
- Services should instrument HTTP, DB, and async processing paths.
- Systems should propagate trace context across boundaries.

## Metrics
- Throughput and latency per endpoint.
- Error rates by code class.
- Projection lag.
- Event append conflicts.

## References
- `../architecture/QUALITY_ATTRIBUTES.md`
- `../runbooks/README.md`