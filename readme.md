# SauceDemo Playwright Automation Test Suite

## 1. Overview

This repository contains a **professional, maintainable Playwright automation test suite** for the SauceDemo e-commerce website:

> https://www.saucedemo.com/

The purpose of this project is to demonstrate:
- Requirement-driven test design
- Clean Playwright + TypeScript architecture
- Page Object Model (POM) best practices
- Reliable, non-coincidental assertions
- Readability and scalability suitable for a real production codebase

---

## 2. Tech Stack

- **Playwright** – End-to-end automation framework
- **TypeScript** – Strong typing and maintainability
- **Node.js** – Runtime environment

---

## 3. Project Structure

```text
project-root/
├── .auth/                     # Stored authentication states (generated)
│   └── standard-user.json
├── playwright.config.ts
├── tests/
│   ├── setup/
│   │   └── auth.setup.ts       # Login once & save storageState
│   ├── auth/
│   │   └── login.spec.ts       # verify login page
│   ├── inventory/
│   │   └── inventory.spec.ts
│   │   └── sorting.spec.ts
│   ├── cat/
│   │   └── checkout.spec.ts
│   └── baseTest.ts             # Authenticated base fixtures
│   └── email.spec.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginPage.ts            # Used ONLY in auth tests
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── components/
│   └── CartItem.ts
│   └── InventoryItem.ts
├── data/
│   ├── users.ts
│   └── customerBuilder.ts
├── types/
│   └── Customer.ts
│   └── SortOption.ts
└── README.md
```

### Key Design Principles

- **Tests describe user behavior**
- **Pages describe UI structure**
- **Components describe repeatable UI blocks**
- **Data & types are separated from UI logic**

---

## 4. Installation

### Prerequisites

- Node.js >= 25.0.1
- npm or yarn

### Install dependencies

```bash
npm install
```

### Install Playwright browsers

```bash
npx playwright install
```

---

## 5. Running the Tests

### Run all tests (headless)

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/cart/checkout.spec.ts
```

### View HTML report

```bash
npx playwright show-report
```

---

## 6. Configuration

### Base URL

The base URL is configured in `playwright.config.ts`:

```ts
baseURL: process.env.BASE_URL || 'https://www.saucedemo.com'
```

This allows easy switching between environments (local / CI).

### Authentication Strategy (Storage State)

This test suite uses **Playwright storage state** to reuse authenticated sessions for post-login tests.

**Approach:**
- Authentication is validated in dedicated login tests
- A logged-in browser state is saved once per user role
- Feature tests (Inventory, Cart, Checkout) reuse this state instead of repeating UI login

**Benefits:**
- Faster execution
- Reduced flakiness
- Clear separation between authentication and business-flow tests

The authenticated state is stored at:

```
playwright/.auth/standard-user.json
```

---

## 7. Locator Strategy

The SauceDemo application uses the attribute `data-test`, not Playwright’s default `data-testid`.

### Chosen strategy

A small helper method `getByDataTest()` is provided in `BasePage` and used consistently across all Page Objects.

```ts
protected getByDataTest(id: string) {
  return this.page.locator(`[data-test="${id}"]`);
}
```

### Why this approach

**1. Aligns with the application’s reality**  
The test suite adapts to the actual DOM contract exposed by the application instead of forcing Playwright defaults.

**2. Avoids overriding Playwright core APIs**  
`getByTestId()` is intentionally not overridden to prevent confusion, reduce upgrade risk, and preserve framework semantics.

**3. Improves readability and intent**  
Selectors express intent clearly (`getByDataTest('login-button')`) instead of repeating raw CSS selectors.

**4. Centralizes selector strategy**  
If the application changes its test attributes in the future, only a single helper method needs updating.

**5. Enforces consistency across the suite**  
All Page Objects follow the same locator convention, making the codebase easier to review, maintain, and scale.

**6. Scales well for larger test suites**  
This approach provides flexibility without over-abstraction and works well in enterprise-sized automation projects.

This strategy balances **explicitness, maintainability, and framework correctness**, which are key goals of this test suite.

---