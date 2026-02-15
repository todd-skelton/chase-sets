# Reputation Terminology and Definitions

## Purpose
Define reputation-specific terms not already canonicalized in `../../../docs/domain/glossary.md`.

## Audience
- Engineers implementing rating and review flows.
- AI agents documenting trust-signal contracts.

## Scope
Reputation covers post-transaction feedback and aggregated trust signals.

## Domain Terms
- **Feedback Eligibility**: rule set deciding who can submit feedback and when.
- **Feedback Visibility**: published/hidden state for moderation control.
- **Reputation Signal**: derived metric used for rank or trust display.

## Boundaries
Reputation owns feedback lifecycle and trust projections. Reputation does not own payment disputes, shipment execution, or listing matching logic.

## References
- `../../../docs/domain/glossary.md`
- `01-reputation-scope-and-model.md`