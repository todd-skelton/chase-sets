# Releases

## Purpose
Define release preparation, rollout, and rollback requirements.

## Audience
- Engineers responsible for deployment readiness.
- AI agents drafting release checklists and runbook updates.

## Scope
Applies to all staging and production releases.

## Versioning
- Public API contracts must follow semantic versioning.
- Internal modules may use independent version cadence when contracts remain stable.

## Rollout Procedure
1. Merge approved changes to main.
2. Build immutable artifacts.
3. Deploy to staging.
4. Run smoke and integration checks.
5. Promote to production using controlled rollout.

## Rollback Procedure
1. Prefer feature-flag rollback first.
2. If artifact rollback is required, confirm compatibility with current data shape.
3. Use compensating data operations when post-deploy data correction is needed.

## Release Checklist
1. Schema rollout plan reviewed and validated in staging.
2. API and event contract updates documented.
3. Observability dashboards and alerts verified.
4. Rollback path validated and owner assigned.

## References
- [Deployment Topology](../architecture/DEPLOYMENT_TOPOLOGY.md)
- [Schema Rollout](../data/SCHEMA_ROLLOUT.md)
- [Runbooks](../runbooks/README.md)
