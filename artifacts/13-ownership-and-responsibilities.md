# 5.3 Ownership & Responsibility Model

## Ownership

- Product: Product Owner (Founder until delegated)
- Engineering: Engineering Owner (Founder until delegated)
- Design: Design Owner (Founder or contractor)
- Ops/on-call: Engineering Owner (Founder) initially

## Decision authorities

- Architecture decisions: Engineering Owner (record via ADR when non-trivial)
- Product scope decisions: Product Owner (record scope changes in artifacts)

## On-call expectations

- MVP posture: best-effort support during business hours.
- Escalation: Sev0/Sev1 issues handled ASAP; keep a lightweight incident log and post-incident notes.

---

## MVP defaults

1. Team size: assume solo/founder-led until stated otherwise.
2. Catalog quality owner: Product Owner, with support from trusted operators.
3. Breaking changes approval: Engineering Owner; record via ADR if it affects external behavior.
4. Support channel: start with email + internal admin tooling; add community channels later.

---

## Questions to answer

1. Is this a solo project or a team?
2. Who owns the catalog quality (if any)?
3. Do we need on-call for MVP, or best-effort support?
4. Who can approve breaking changes?
5. What is the expected support channel (email/Discord/etc)?
