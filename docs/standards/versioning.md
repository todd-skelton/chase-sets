# Versioning Standard

## Purpose
Define versioning rules for APIs, events, and schema contracts.

## Scope
Applies to HTTP API paths, event envelopes/payloads, and schema compatibility.

## Rules
- APIs must use URL major versioning (example: `/v1/...`).
- Events must keep stable `event_type` names.
- Event schema evolution must use `event_version`.
- Additive changes may stay within the same major version.
- Breaking changes must use a new API major version or new `event_version`.

## References
- `../api/SKILL.md`
- `../events/SKILL.md`
- `../data/SCHEMA_ROLLOUT.md`