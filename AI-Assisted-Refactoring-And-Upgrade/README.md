# Playwright TypeScript Framework

This repository holds a simple Playwright framework using TypeScript and page objects.

## Structure

- `pages/` - contains Page Object classes.
- `tests/` - contains test files using the page objects.
- `utils/` - helper utilities (loggers, common functions).
- `playwright.config.ts` - Playwright configuration.
- `tsconfig.json` - TypeScript settings.

## Setup

1. Install dependencies:
   ```bash
   npm install
   npx playwright install
   ```
2. Run tests:
   ```bash
   npm test
   ```

## Adding new pages and tests

- Create a new class under `pages/` that accepts a Playwright `Page` in the constructor.
- Add methods for interactions and assertions.
- Write tests in `tests/` importing the page objects.

This minimal example demonstrates the page-object pattern and can be extended as needed.