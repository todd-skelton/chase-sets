# ADR 002: Authentication and Account Recovery

## Status

Accepted (MVP)

## Context

We need web-first authentication that is secure, easy for collectors/TCG players, and supports account recovery. Security is a primary requirement.

## Options considered

1. Email + password + MFA (optional/required later)
2. Passwordless magic link
3. OAuth-only (Google/Apple)
4. Hybrid (magic link + optional password)

## Decision

Use **passwordless email magic links** for MVP.

Design constraints (future-friendly):

- Model **Identity** and **Account** separately so we can support multiple auth methods (magic link, password, OAuth) later.
- Plan for **Organizations** (companies) with **Memberships** and **RBAC** (roles/permissions) so a single identity can access multiple accounts.
- Keep session management compatible with server-side enforcement (revocation, device/session lists) and eventual step-up auth.

## Tradeoffs

- Pros:
- Cons:
- Risks:

## Consequences / follow-ups

- Decide MFA requirements and rollout.
- Decide bot protection and rate limiting.
- Define session model (JWT vs server sessions) and device management.
- Define the MVP RBAC surface area (roles needed for marketplace ops vs company/team workflows).
