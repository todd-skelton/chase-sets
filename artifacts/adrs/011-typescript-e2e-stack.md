# ADR 011: Application Stack (TypeScript End-to-End)

## Status

Accepted

## Context

We need a stack that is fast to iterate on, consistent across services/projectors, and friendly to an event-sourced architecture.

## Options considered

1. TypeScript end-to-end (frontend + backend + projectors)
2. Go backend + TS frontend
3. Python backend + TS frontend

## Decision

Use **TypeScript end-to-end** for MVP.

- Fullstack development starts with **React Router 7**.
- Backend services and projectors are implemented in TypeScript and run in containers.

## Tradeoffs

- Pros:
  - One language across the stack; faster iteration and less cognitive load
  - Great ecosystem for web UI and API development
- Cons:
  - Some workloads may require optimization later; performance tuning is possible but may push us to specialized services over time

## Consequences / follow-ups

- Choose the initial backend HTTP framework/runtime conventions (still flexible).
- Define TypeScript build tooling and container build pattern.
