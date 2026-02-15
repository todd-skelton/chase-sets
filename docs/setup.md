# Setup

## Purpose
Define the executable onboarding flow for this documentation-first repository.

## Audience
- Engineers onboarding to repository standards and structure.
- AI agents validating environment assumptions before making changes.

## Scope
This guide covers prerequisites, repository bootstrap, and validation commands.

## Prerequisites
- Git
- Node.js 20+
- pnpm 9+
- ripgrep (`rg`) for fast repository search

## Procedure
1. Clone the repository.
2. Read [Documentation Index](README.md) and [Contributing](../CONTRIBUTING.md).
3. Review environment configuration in [Environment Variables](environment-variables.md).
4. If tooling requires env values, create a local environment file from `../.env.example`.

## Expected Outcome
- You can navigate canonical docs quickly.
- You can run baseline validation commands.
- You understand where to place documentation updates.

## Validation Commands
```powershell
rg --files -uu -g "*.md"
rg -n "Idempotency-Key" -g "*.md" -uu
```

## References
- [Environment Variables](environment-variables.md)
- [Documentation Index](README.md)
