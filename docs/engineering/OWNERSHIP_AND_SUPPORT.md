# Ownership and Support

Related: `docs/planning/DEFINITION_OF_DONE.md`, `docs/runbooks/README.md`

## Ownership Defaults (MVP)

- Product owner: founder until delegated.
- Engineering owner: founder until delegated.
- Design owner: founder or contractor.
- Operations/on-call owner: engineering owner initially.
- Catalog quality owner: product owner with trusted operator support.

## Decision Authority

- Architecture decisions: engineering owner, captured in ADRs.
- Product scope decisions: product owner, captured in product/planning docs.
- Breaking external contract changes: engineering owner with explicit versioning/migration notes.

## Support Posture (MVP)

- Best-effort support during business hours.
- Sev0/Sev1 issues handled as soon as possible.
- Keep a lightweight incident log and post-incident notes.
- Start with email plus internal admin tooling; expand channels later as needed.

## MVP Operating Defaults

- Assume founder-led operation until role ownership is explicitly delegated.
- Breaking behavior changes should include explicit approval and documented rollout/rollback notes.
- On-call remains lightweight until traffic and team size justify formal rotation.

## Next Decisions

- TODO(QUESTION): define long-term on-call rotation and severity model.
- TODO(QUESTION): confirm dedicated catalog quality ownership model at team scale.
- TODO(QUESTION): finalize external support channel strategy beyond MVP.
