# ADR 006: Containers, CDN, and OSS Baseline

## Status

Accepted (direction) / Accepted (starter config approach: Kustomize)

## Context

Chase Sets should be built on:

- **Containers** for services and background processors
- **Static assets + CDN** for the web app
- **Best-in-class open-source products** where feasible for core platform capabilities

We also have an event-sourcing tenet (ADR 005), which implies replayable projections and operational tooling for lag/drift.

## Options considered

1. Fully managed PaaS (least ops, less OSS control)
2. Mixed: managed CDN + container platform + OSS core services
3. Fully self-hosted OSS (max control, highest ops)

## Decision

Adopt a mixed approach:

- Web app ships as static assets served via a CDN.
- All backend services and projectors run as OCI containers.
- Prefer open-source components for core infrastructure and run them in containers where practical.

Orchestration target:

- **Production** targets Kubernetes.
- **Local development** starts with Docker Compose, with an optional single-command local Kubernetes (e.g., kind/k3d) once we have a minimal manifest set.

Kubernetes starter config requirement:

- Keep it simple: one namespace, a small set of Deployments/Services/Ingress, and a Kustomize overlay per environment.
- Use **Kustomize** for the initial manifest workflow (no Helm charts initially).

## Candidate OSS components (initial defaults)

- **Edge/Ingress**: NGINX Ingress (ADR 009)
- **Orchestration**: Kubernetes (prod target) + Docker Compose (local)
- **Event store**: Postgres event streams (ADR 007)
- **Stream transport**: none in MVP; projectors consume directly from Postgres (ADR 008)
- **Relational store (projections)**: Postgres
- **Cache**: Redis (optional; add only when proven necessary)
- **Search**: OpenSearch (ADR 012)
- **Object storage**: cloud object storage (as CDN origin); MinIO is an option for local/self-hosting later
- **Observability**: OpenTelemetry + Prometheus + Grafana (+ Loki/Tempo) as the default OSS stack
- **Secrets/IaC**: SOPS (age) for encrypted secrets + Kustomize overlays (no secrets in plaintext in git)

## Secrets & IaC posture (MVP default)

We want a small, portable setup that works before we commit to a specific cloud.

Proposed (MVP default):

- **Secrets in git**: allowed only if encrypted (SOPS + age).
- **Local dev (Compose)**: use uncommitted `.env` files; commit `.env.example` with placeholders only.
- **Kubernetes**: store encrypted `Secret` manifests in `infra/` (or similar) and decrypt at deploy time.
- **Cloud secret managers / External Secrets Operator**: optional later; introduce only when we standardize on a cloud platform and need rotation/centralized management.

## Tradeoffs

- Pros:
  - Portable across environments; consistent dev/prod model
  - Strong control over infra behavior via OSS
  - CDN delivers fast web performance and cheap bandwidth
- Cons:
  - Still requires operational investment (patching, backups, monitoring)
  - Some pieces (CDN) are typically not OSS and will be provider-backed

## Consequences / follow-ups

1. Define the initial Kubernetes starter config using Kustomize (base + overlays) once requirements are ready to begin implementation.
2. Choose event store + transport.
3. Choose search engine and projection store strategy.
4. Define container image build/publish and deployment workflow.

