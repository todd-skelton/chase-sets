# Domain Modeling Playbook

## Purpose
- Keep domain logic cohesive, explicit, and independent from infrastructure concerns.

## Scope
- Applies to domain and application modeling across all bounded contexts.

## Rules
- Bounded context rules:
  - Model business concepts inside one owning context.
  - Cross-context communication happens via APIs/events, never shared tables.
- Aggregate and invariant guidance:
  - One transaction boundary per aggregate.
  - Enforce invariants inside aggregate methods, not controllers.
- Policy/services vs entities/value objects:
  - Entities hold identity and lifecycle.
  - Value objects are immutable and behavior-rich.
  - Domain services host cross-entity rules that do not fit one aggregate.
- No infra in domain:
  - No ORM decorators, HTTP clients, SQL, or provider SDK code in domain layer.
- Glossary update rule:
  - Add/modify business terms in `docs/domain/glossary.md` with each new concept.

## Checklist
1. Confirm term definitions in glossary.
2. Identify aggregate boundary and invariants.
3. Model domain entities/value objects/services.
4. Add application orchestration around domain operations.
5. Add ports/interfaces before adapters.
6. Add tests for invariants and policy rules.
7. Publish events for cross-context facts.

## Links
- `docs/domain/README.md`
- `docs/domain/glossary.md`
- `SKILL.md`
