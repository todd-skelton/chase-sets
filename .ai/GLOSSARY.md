# Glossary

Related: `docs/domain/DOMAIN_MODEL.md`, `docs/domain/STATE_MACHINES.md`

## Canonical Terms

- `Identity`: canonical authentication subject that owns credentials and sessions.
- `User`: human represented by an `Identity`.
- `Account`: platform profile linked to an `Identity`.
- `Organization`: multi-user seller entity with role-based access.
- `Listing`: seller-side intent to sell a specific collectible instance or lot.
- `Offer`: buyer-side intent to buy with price and constraints.
- `Match`: successful pairing of buyer and seller intent.
- `Checkout`: buyer purchase session that may produce multiple seller orders.
- `Order`: seller-scoped commercial commitment created from checkout.
- `Fulfillment`: process from packed shipment to delivered outcome.
- `Payout`: transfer of settled funds to seller.
- `Dispute`: post-payment issue including chargeback, claim, or complaint.
- `Event`: immutable domain fact appended to a stream.
- `Projection` (aka `Read Model`): query-optimized view derived from events.
- `Idempotency-Key`: client-supplied header used to deduplicate retrying writes.

## Synonyms (Normalize to Canonical)

- `auth` -> `authentication`
- `webauthn` -> `passkey authentication`
- `bid` -> `offer` (docs prose alias; legacy contracts may still use `Bid`)
