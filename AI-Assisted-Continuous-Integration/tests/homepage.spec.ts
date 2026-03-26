import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

/**
 * Homepage Tests
 * Demonstrates Page Object Model pattern with web-first assertions
 * Tests use role-based locators and auto-retrying assertions
 */
test.describe('HomePage Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.navigateToHome();
  });

  test.skip('should verify page loads successfully', async () => {
    // Web-first assertion - auto-waits for condition
    const isLoaded = await homePage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test.skip('should display correct main heading text', async () => {
    // This uses Playwright's auto-retrying assertions
    const headingText = await homePage.getMainHeadingText();
    expect(headingText).toContain('Example Domain');
  });

  test.skip('should verify main heading is visible', async () => {
    // Auto-waiting assertion
    await expect(homePage.mainHeading).toBeVisible();
  });

  test.skip('should verify description text is present', async () => {
    // Using role-based locators and auto-wait
    const descriptionText = await homePage.getDescriptionText();
    expect(descriptionText.length).toBeGreaterThan(0);
    expect(descriptionText).toContain('documentation');
  });

  test.skip('should verify learn more link is clickable', async () => {
    // Verify link exists and is clickable
    await expect(homePage.learnMoreLink).toBeVisible();
    await expect(homePage.learnMoreLink).toBeEnabled();
  });

  test.skip('should verify page title', async () => {
    // Test page title
    const title = await homePage.getTitle();
    expect(title).toBe('Example Domain');
  });

  test.skip('should navigate to learn more when link clicked', async ({ page }) => {
    // Test link navigation
    await homePage.clickLearnMoreLink();
    
    // Wait for navigation to IANA domain
    await page.waitForLoadState('networkidle');
    
    // Verify we're on a different page
    const newUrl = page.url();
    expect(newUrl).toContain('iana.org');
  });
});
