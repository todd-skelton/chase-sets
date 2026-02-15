# Deployment Topology

Related: `docs/engineering/RELEASES.md`, `docs/data/MIGRATIONS.md`

## Environments

- `local`: developer containers and seeded data
- `staging`: production-like integration environment
- `production`: customer-facing environment

## Topology

- Containerized services using open-source container runtime/orchestrator.
- Vendor-neutral infrastructure abstractions.
- Managed or self-managed Postgres depending on host choice.

## Release Flow

1. Merge to main
2. Build immutable container artifact
3. Deploy to staging
4. Run smoke and integration checks
5. Promote to production with controlled rollout

## Feature Flags

- Use runtime flags for risky or incremental launches.
- Document flag owner, expiry, and rollback plan.

## Migration Strategy

- Forward-only migrations
- Backward-compatible reads during rollout windows
- Blue/green or canary rollout where available
