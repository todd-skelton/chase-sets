# User Flows

Related: `docs/product/PRD.md`, `docs/domain/STATE_MACHINES.md`, `docs/api/openapi.yaml`

## Buyer Flow

1. Sign up or log in (password, social/SSO, MFA/passkey)
2. Search and filter listings
3. Place offer or buy now
4. Complete checkout
5. Track shipment and confirm receipt
6. Initiate support/dispute if needed

## Seller Flow

1. Create seller profile or organization
2. Create listing with condition grade and pricing
3. Receive match or accepted offer
4. Ship order and provide tracking
5. Receive payout when eligible

## Operations Flow

1. Review risk flags and fraud signals
2. Handle dispute queue
3. Monitor payout exceptions
4. Audit event history for incidents

## Notes

- Condition language must align with `.ai/GLOSSARY.md` scale.
- TODO(QUESTION): webhook consumers and operational integrations for these flows
