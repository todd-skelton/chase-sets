# Deployment Topology

## Purpose
Describe baseline deployment topology and release flow.

## Audience
- Engineers planning runtime and release operations.
- AI agents producing operational docs.

## Scope
Applies to local, staging, and production environments.

## Environments
- `local`: developer environment.
- `staging`: production-like validation environment.
- `production`: customer-facing runtime.

## Topology
- Services should run as containers.
- Postgres should host event store and read models.
- Edge traffic should terminate TLS at ingress.

## Release Flow
1. Merge to main.
2. Build immutable artifacts.
3. Deploy to staging.
4. Run smoke and integration checks.
5. Promote to production with controlled rollout.

## Schema Rollout
Schema updates must follow `../data/SCHEMA_ROLLOUT.md`.

## References
- `README.md`
- `../engineering/RELEASES.md`
- `../data/SCHEMA_ROLLOUT.md`