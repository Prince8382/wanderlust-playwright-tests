# WanderLust Playwright Tests

End-to-end UI test automation framework for **WanderLust**, an Airbnb-inspired travel listing app, built with **Playwright** and **TypeScript** using the **Page Object Model**.

**App under test:** Node.js, Express.js, MongoDB, EJS, Passport.js
**Live app:** https://wanderlust-xog5.onrender.com/listings

## Tech Stack

| Area | Tool |
|------|------|
| Test framework | Playwright Test |
| Language | TypeScript |
| Runtime | Node.js |
| Config / secrets | dotenv (`.env`) |
| CI | GitHub Actions |
| Browser | Chromium |

## What Is Covered

| Area | Spec file | Page object | Scenarios |
|------|-----------|-------------|-----------|
| Login | `tests/auth/login.spec.ts` | `LoginPage` | Valid credentials redirect the user to the listings page. 
| Signup | `tests/auth/signup.spec.ts` | `SignupPage` |
| Create listing | `tests/listings/listing-create.spec.ts` | `NewListingPage` | 
| View listing | `tests/listings/listing-view.spec.ts` | `ListingsPage`, `ListingDetailsPage` | 
| Edit listing | `tests/listings/listing-edit.spec.ts` | `EditListingPage` |
| Delete listing | `tests/listings/listing-delete.spec.ts` | `ListingsPage` |
| Search listings | `tests/listings/listing-search.spec.ts` | `ListingsPage` | 
| Reviews | `tests/reviews/review.spec.ts` | `ListingDetailsPage` | 

## Project Structure

```
.
├── .github/workflows/playwright.yml   # CI workflow
├── fixtures/test-fixtures.ts          # Custom Playwright fixtures
├── pages/                             # Page Object Model classes
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── ListingsPage.ts
│   ├── ListingDetailsPage.ts
│   ├── NewListingPage.ts
│   └── EditListingPage.ts
├── tests/
│   ├── auth/                          # login, signup
│   ├── listings/                      # create, view, edit, delete, search
│   └── reviews/                       # review
├── test-assets/test-image.jpg         # Image used for upload tests
├── utils/test-data.ts                 # Test data helpers
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Framework Design

- **Page Object Model:** locators and page actions live in `pages/`, so specs stay short and readable
- **Fixtures:** shared setup in `fixtures/test-fixtures.ts`
- **Test data:** kept in `utils/test-data.ts`
- **Credentials from environment:** no secrets in code, they are read from `.env`
- **Failure artifacts:** screenshots on failure, video retained on failure, trace on first retry
- **Reporting:** HTML report generated after every run
- **CI settings:** 2 retries and 1 worker when running in CI

## Prerequisites

- Node.js 18 or later
- The WanderLust app running at `http://localhost:8080` (see below)

## Setup

```bash
git clone https://github.com/Prince8382/wanderlust-playwright-tests.git
cd wanderlust-playwright-tests
npm install
npx playwright install chromium
```

Create a `.env` file in the project root:

```
TEST_USERNAME=your_test_username
TEST_PASSWORD=your_test_password
```

The config starts the app automatically with `cd ../WanderLust && node app.js`, so clone the WanderLust app in a sibling folder named `WanderLust` (add app repo link) and set it up with its own `.env` and MongoDB connection.

## Running Tests

| Command | What it does |
|---------|--------------|
| `npm test` | Run all tests headless |
| `npm run test:headed` | Run with a visible browser |
| `npm run test:debug` | Run in debug mode |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:chromium` | Run only the Chromium project |
| `npm run report` | Open the last HTML report |

Run a single feature area:

```bash
npx playwright test tests/listings/listing-create.spec.ts
```

## CI

Tests run through GitHub Actions using `.github/workflows/playwright.yml`. describe what triggers it and how the app is started.

## Future Improvements

- Negative and validation scenarios for each feature
- API tests for the backend endpoints
- Cross-browser runs (Firefox, WebKit)

## Author

**Prince Chaudhary**, GitHub: [Prince8382](https://github.com/Prince8382)
