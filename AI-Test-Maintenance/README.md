# AI Test Maintenance - Playwright E2E Testing

This project demonstrates Playwright E2E testing using the Page Object Model (POM) pattern.

## Project Structure

```
ai.test.maintenance/
├── package.json                 # Project dependencies and scripts
├── playwright.config.ts         # Playwright configuration (Chromium only)
├── .gitignore                   # Git ignore configuration
├── pages/                       # Page Object Model classes
│   ├── BasePage.ts             # Base page class with common methods
│   ├── HomePage.ts             # Home page object
│   └── ExamplePage.ts          # Example domain page object
└── tests/                       # Test specifications
    ├── homepage.spec.ts        # Home page tests
    └── example-domain.spec.ts  # Example domain tests
```

## Technologies & Versions

- **Playwright**: v1.48.2 (latest)
- **Browser**: Chromium only (configured in `playwright.config.ts`)
- **Language**: TypeScript
- **Test Framework**: @playwright/test

## Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Install Playwright browsers:**
   ```bash
   npx playwright install chromium
   ```

## Running Tests

### Basic Commands

```bash
# Run all tests (headless)
npm test

# Run tests in headed mode (see browser window)
npm run test:headed

# Run tests in debug mode (step through)
npm run test:debug

# Run tests in UI mode (interactive watch mode)
npm run test:ui

# Open HTML report after test run
npm run test:report

# Run specific test file
npx playwright test tests/homepage.spec.ts

# Run tests with specific project (Chromium)
npx playwright test --project=chromium

# Run single test by name
npx playwright test -g "should verify page loads successfully"
```

## Page Object Model (POM) Pattern

The project follows the POM pattern for maintainability and reusability:

### BasePage Class
- Common methods shared across all pages
- Navigation methods
- Utilities for page interaction

### HomePage Class
- Extends BasePage
- Defines locators using role-based selectors (Playwright best practice)
- Encapsulates HomePage-specific actions
- Methods:
  - `navigateToHome()`
  - `getMainHeadingText()`
  - `isMainHeadingVisible()`
  - `clickLearnMoreLink()`
  - `getDescriptionText()`
  - `isPageLoaded()`

### ExamplePage Class
- Demonstrates alternative page structure
- Methods for content verification
- Methods:
  - `navigateToExampleDomain()`
  - `getAllHeadings()`
  - `getLinkCount()`
  - `pageContainsText()`
  - `verifyPageTitle()`

## Test Files

### homepage.spec.ts (7 tests)
- Verifies page loads successfully
- Checks main heading text
- Validates heading visibility
- Tests description text content
- Verifies link is clickable
- Validates page title
- Tests link navigation

### example-domain.spec.ts (7 tests)
- Verifies page title correctness
- Finds and validates headings
- Counts page links
- Checks for specific text content
- Validates page structure
- Verifies no console errors
- Tests page accessibility

## Configuration Details

### playwright.config.ts Settings
- **Test Directory**: `./tests`
- **Test Match Pattern**: `**/*.spec.ts`
- **Parallel Execution**: Enabled
- **Retries**: 0 (locally), 2 (CI only)
- **Reporter**: HTML
- **Screenshot**: Captured on failure only
- **Trace**: Captured on first retry
- **Base URL**: `https://example.com`
- **Browsers**: Chromium only

## Best Practices Implemented

✅ **Role-based Locators**: All selectors use Playwright's role-based approach  
✅ **Auto-waiting Assertions**: Web-first assertions that auto-retry  
✅ **No Fixed Timeouts**: Uses Playwright's intelligent waits  
✅ **Page Object Model**: Encapsulation and reusability  
✅ **Descriptive Test Titles**: Clear test names for easy identification  
✅ **Isolated Test Setup**: Each test has its own page setup  
✅ **Error Handling**: Console errors are monitored  
✅ **Accessibility Testing**: Includes accessibility checks  

## Environment Variables

Set these in `.env` file if needed:
```env
# Test configuration
CI=false
```

## Troubleshooting

### Browsers not installed
```bash
npx playwright install
```

### Permission denied errors
```bash
npx playwright install-deps
```

### Clear test artifacts
```bash
rm -rf test-results playwright-report
```

## Additional Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Test Configuration Guide](https://playwright.dev/docs/test-configuration)
- [Writing Tests Guide](https://playwright.dev/docs/writing-tests)
- [Best Practices](https://playwright.dev/docs/best-practices)

## Next Steps

1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. View reports: `npm run test:report`
4. Extend with more page objects and tests as needed

--- 

Created following the Playwright Getting Started Guide - https://playwright.dev/docs/intro
