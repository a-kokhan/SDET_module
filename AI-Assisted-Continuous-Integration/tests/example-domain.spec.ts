import { test, expect } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage';

/**
 * Example Domain Tests
 * Tests demonstrating various assertion patterns and page object methods
 * All tests run on Chromium only (configured in playwright.config.ts)
 */
test.describe('Example Domain Tests', () => {
  let examplePage: ExamplePage;

  test.beforeEach(async ({ page }) => {
    examplePage = new ExamplePage(page);
    await examplePage.navigateToExampleDomain();
  });

  test.skip('should verify page title is correct', async () => {
    // Web-first assertion with auto-retry
    const isCorrect = await examplePage.verifyPageTitle('Example Domain');
    expect(isCorrect).toBeTruthy();
  });

  test.skip('should find headings on the page', async () => {
    // Get all headings and verify count
    const headings = await examplePage.getAllHeadings();
    expect(headings.length).toBeGreaterThan(0);
    expect(headings[0]).toBe('Example Domain');
  });

  test.skip('should count links on the page', async () => {
    // Verify there is at least one link
    const linkCount = await examplePage.getLinkCount();
    expect(linkCount).toBeGreaterThan(0);
  });

  test.skip('should verify page contains specific text', async () => {
    // Test that page contains documentation text
    const containsText = await examplePage.pageContainsText('documentation');
    expect(containsText).toBeTruthy();
  });

  test.skip('should have correct page structure', async ({ page }) => {
    // Verify essential elements exist using role-based locators
    const heading = page.getByRole('heading', { level: 1 });
    const links = page.getByRole('link');
    
    // Auto-waiting assertions
    await expect(heading).toBeVisible();
    await expect(links.first()).toBeVisible();
  });

  test.skip('should verify no console errors on page load', async ({ page }) => {
    // Collect any console errors that occurred
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Trigger page navigation again to capture any errors
    await examplePage.navigateToExampleDomain();
    
    // Verify no critical errors (Example Domain may have some warnings)
    const criticalErrors = errors.filter(err => 
      !err.includes('favicon') && 
      !err.includes('Service Worker')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test.skip('should have accessible page title', async ({ page }) => {
    // Verify accessibility: page should have a title
    const title = await page.title();
    expect(title).not.toBe('');
    expect(title.length).toBeGreaterThan(0);
  });
});
