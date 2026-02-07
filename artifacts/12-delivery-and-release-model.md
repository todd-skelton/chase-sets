# 5.2 Delivery & Release Model

## Environments

- Local: Docker Compose running API + projectors + backing services.
- Dev: Container deployment with a shared dev event store and projection stores; static web deployed to a dev bucket + CDN.
- Staging: Production-like deployment; used for load tests and release verification.
- Prod: Containers for all services; static web assets served via CDN.

## Monorepo note

- This starts as a single monorepo.
- Release cadence can be unified initially, but module boundaries should allow independent evolution later.
- Documentation and ADRs should live close to the modules they affect (see `artifacts/16-repo-structure-and-artifact-placement.md`).

## Deployment cadence

- MVP target: weekly (adjust as we learn).

## Feature flags

- Optional for MVP; add if we need gradual rollout for matching/payments changes.

## Rollback expectations

- Web: rollback by repointing CDN to prior static asset version.
- API/projectors: rollback by deploying prior container images; projections are rebuildable from events.

---

## Questions to answer

## Open questions

1. Kubernetes starter config will use Kustomize. Do you want a first-class local Kubernetes option (kind/k3d) in addition to Docker Compose?
2. Do you want preview environments per PR?
3. Is no-downtime deploy required for MVP?
4. Who can deploy to prod?
