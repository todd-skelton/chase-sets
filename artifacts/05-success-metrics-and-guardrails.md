# 1.3 Success Metrics & Guardrails

## North-star metric

- Weekly active collectors buying and selling on the platform.

## Leading indicators

- New buyers/sellers completing first transaction within 7 days.
- Liquidity indicators (offers/listings created per week; acceptance rate).
- Search-to-intent conversion (search → item view → offer/list/buy/sell action).
- Payment-rail mix (share of purchases via balance and ACH).
- Price gap + liquidity signals per SKU market (best offer vs lowest listing gap; time-to-fill).

## Quality / correctness guardrails

- Data accuracy: Item identity and version correctness (wrong item == trust loss).
- Search/lookup quality: users can reliably find the exact form they want (single vs sealed vs graded + grade/condition).

## Constraints

- Latency (initial targets): search P95 <= 500ms; item details P95 <= 400ms; checkout submission P95 <= 1,200ms.
- Cost (initial posture): set an explicit monthly spend cap before launch; enforce unit-economics guardrails (e.g., embedding calls, label purchases, refunds) via budgets + alerts.
- Availability (initial target): 99.9% monthly for core API surfaces.
- Security: payment and customer information must never be leaked.

---

## Questions to answer

## Open questions

1. What is a “successful session” definition (e.g., search + 1 marketplace action, or completed transaction)?
2. What are acceptable P95 latencies for: search results, item detail, checkout?
3. What are cost constraints (monthly budget; acceptable take rate/fees)?
4. What additional unacceptable failures besides data leak (lost order state, double-charging, wrong payouts)?
5. What is the target balance/ACH adoption rate to consider the fee model successful?
