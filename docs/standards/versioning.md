# Versioning Standard

## Purpose
- Define consistent versioning rules for APIs, events, and schema changes.

## Scope
- Applies to REST endpoints, event schemas/envelopes, and migration compatibility.

## Rules
- APIs use URL major versioning (example: `/v1/listings`).
- Events keep stable `event_type` names (example: `marketplace.listing.created`).
- Events use `event_version` metadata in the envelope for schema evolution.
- Additive changes may remain in the same major version.
- Breaking changes require new major API route or new `event_version`.
- Deprecations require documented timeline and migration path.
- Prefer compatibility windows over immediate removals.

## Checklist
- [ ] Classify change as additive or breaking.
- [ ] Apply version bump where needed.
- [ ] Update contract tests.
- [ ] Document migration/deprecation notes.
