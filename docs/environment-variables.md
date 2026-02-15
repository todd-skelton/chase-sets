# Environment Variables

## Purpose
Define a single source of truth for variables listed in `.env.example`.

## Audience
- Engineers preparing local runtime configuration.
- AI agents documenting configuration contracts.

## Scope
This document describes current placeholders in `.env.example`.

## Variables
| Name | Required | Default | Example | Where used |
| --- | --- | --- | --- | --- |
| `NODE_ENV` | Optional | `development` | `development` | Application runtime mode |
| `APP_NAME` | Optional | `chase-sets` | `chase-sets` | Service metadata |
| `DATABASE_URL` | Required | None | `postgres://postgres:postgres@localhost:5432/chase_sets` | Postgres event store and read models |
| `STRIPE_SECRET_KEY` | Required when payments enabled | None | `sk_test_xxx` | Stripe API integration |
| `STRIPE_WEBHOOK_SIGNING_SECRET` | Required when webhook verification enabled | None | `whsec_xxx` | Inbound Stripe webhook signature validation |
| `AUTH_JWT_ISSUER` | Optional | `chase-sets` | `chase-sets` | JWT issuer claims |
| `AUTH_JWT_AUDIENCE` | Optional | `chase-sets-api` | `chase-sets-api` | JWT audience claims |
| `PASSKEY_RP_ID` | Optional | `localhost` | `localhost` | Passkey relying party ID |
| `PASSKEY_RP_NAME` | Optional | `Chase Sets` | `Chase Sets` | Passkey relying party display name |
| `OTEL_SERVICE_NAME` | Optional | `chase-sets-api` | `chase-sets-api` | OpenTelemetry service name |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | Optional | `http://localhost:4317` | `http://localhost:4317` | OpenTelemetry exporter endpoint |
| `FEATURE_FLAGS_SOURCE` | Optional | `file` | `file` | Feature flag source adapter |

## References
- `../.env.example`
- `setup.md`
- `engineering/OBSERVABILITY.md`