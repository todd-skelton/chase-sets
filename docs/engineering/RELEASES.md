# Releases

Related: `docs/architecture/DEPLOYMENT_TOPOLOGY.md`, `docs/data/SCHEMA_ROLLOUT.md`

## Versioning

- Use semantic versioning for public API contracts.
- Internal module versions may use independent cadence.

## Rollout Strategy

- Progressive rollout using feature flags.
- Canary where infrastructure supports traffic splitting.
- Monitor key health and business metrics during rollout.

## Rollback Strategy

- Prefer flag rollback first.
- If artifact rollback is needed, ensure schema compatibility.
- Use roll-forward migrations for data fixes.

## Release Checklist

1. Migrations reviewed and tested
2. API and event contract changes documented
3. Observability dashboards updated
4. Rollback path validated
