# TEST PLAN

## 1. Scope

This test plan covers **core user journeys** of the SauceDemo site:

- Authentication
- Inventory display & sorting
- Cart management
- Checkout & order completion
- Utility email validation logic (pure TypeScript)

---

## 2. Test Scenarios Covered

### A. Login & Inventory Validation

| ID | Scenario |
|---|---|
| A1 | Login with invalid credentials shows correct error |
| A2 | Login with valid credentials (standard_user) |
| A3 | Persist authenticated session using Playwright storage state |
| A4 | Access inventory page using reused authenticated state |
| A5 | Inventory list loads successfully |
| A6 | Inventory item contains name, image, price, and Add-to-Cart button |

---

### B. Sorting Functionality

| ID | Scenario |
|---|---|
| B1 | Sort products by Name (A → Z) |
| B2 | Sort products by Name (Z → A) |
| B3 | Sort products by Price (Low → High) |
| B4 | Sort products by Price (High → Low) |

**All sorting assertions are deterministic and cannot pass coincidentally.**

---

### C. Cart & Checkout Flow

| ID | Scenario |
|---|---|
| C1 | Add two different products to cart |
| C2 | Navigate to cart |
| C3 | Validate product names and prices in cart |
| C4 | Remove one product |
| C5 | Complete checkout with customer info |
| C6 | Validate subtotal, tax, and total mathematically |
| C7 | Verify order confirmation page |

---

### D. Email Validation (Utility Logic)

| ID | Scenario |
|---|---|
| D1 | Validate email format using RegExp |
| D2 | Reject uppercase characters |
| D3 | Reject spaces |
| D4 | Detect duplicate emails |

---

## 3. Test Data

- **User credentials** are centralized in `data/users.ts`
- **Customer data** is generated via a builder (`customerBuilder.ts`)
- **Type safety** is enforced using shared interfaces in `types/`

---

## 4. Risks & Flaky Areas

| Risk | Mitigation |
|---|---|
| UI timing issues | Explicit waits + Playwright auto-wait |
| Coincidental sort results | Pre-sort comparison + reverse checks |
| Hard-coded totals | Dynamic calculation (subtotal + tax) |

---

## 5. Assumptions

- SauceDemo test data is static
- `data-test` attributes remain stable
- No authentication throttling or CAPTCHA

---

## 6. Out of Scope (Future Enhancements)

If more time were available, the following would be added:

- Visual regression testing for inventory cards
- API-assisted validation for pricing
- Performance assertions (inventory load time)
- CI pipeline (GitHub Actions)

---

## 7. Quality Criteria

This suite prioritizes:

- **Readability over cleverness**
- **Deterministic assertions**
- **Maintainable architecture**
- **Clear traceability from requirements to tests**

---