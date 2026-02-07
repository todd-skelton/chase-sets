# ADR 009: Kubernetes Ingress Controller (NGINX Ingress)

## Status

Accepted

## Context

Production targets Kubernetes (ADR 006). We need a standard ingress controller for HTTP routing and TLS termination.

## Options considered

1. NGINX Ingress
2. Traefik

## Decision

Use **NGINX Ingress** as the initial Kubernetes ingress controller.

## Tradeoffs

- Pros:
  - Very common, well understood, widely documented
  - Easy to find examples and operational guidance
- Cons:
  - Not the lightest option; configuration can get complex at scale

## Consequences / follow-ups

- Decide TLS strategy (cert-manager vs external termination).
- Update the Kustomize base ingress resources with annotations as needed once NGINX is installed.
