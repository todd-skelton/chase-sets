# Domain Docs

## Purpose
Provide canonical domain modeling documentation and ownership boundaries.

## Audience
- Engineers defining domain behavior and boundaries.
- AI agents writing domain-consistent requirements and contracts.

## Scope
Covers glossary terms, bounded contexts, aggregates, events, and lifecycle indexes.

## Start Here
1. [Glossary](glossary.md)
2. [Bounded Contexts](BOUNDED_CONTEXTS.md)
3. [Domain Model](DOMAIN_MODEL.md)
4. [Event Taxonomy](EVENT_TAXONOMY.md)
5. [State Machines](STATE_MACHINES.md)

## Rules
- New business terms must be added to the glossary.
- Cross-context handoffs must be modeled as explicit events.
- Aggregate invariants must be explicit and testable.

## References
- [Architecture Docs](../architecture/README.md)
- [Services Documentation](../../services/README.md)
- [Domains Index](../../domains/README.md)
