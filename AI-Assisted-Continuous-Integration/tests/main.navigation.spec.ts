import { test, expect, type Page } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';
import { PlaywrightDocsPage } from '../pages/PlaywrightDocsPage';

/**
 * Main Page Navigation Tests using Page Object Model
 * 
 * Tests verify that Playwright.dev displays and provides functional navigation
 * 
 * Page Objects Used:
 * - NavigationPage: Encapsulates all navigation-related locators and methods
 * - PlaywrightDocsPage: Represents the docs pages after navigation
 * 
 * Refactoring Notes:
 * - Implemented Page Object Model pattern for maintainability
 * - Replaced overlapping regex patterns with distinct, non-overlapping selectors
 * - Removed networkidle waits in favor of element-based waits
 * - Added console error monitoring
 * - Improved locator specificity and clarity
 * - Added explicit element count verification
 * - Separated test concerns (visibility vs functionality)
 */

test.describe('Main Page Navigation', () => {
  let navigationPage: NavigationPage;
  let docsPage: PlaywrightDocsPage;

  /**
   * Hook to set up page objects and monitor console errors
   */
  test.beforeEach(async ({ page }) => {
    // Initialize page objects
    navigationPage = new NavigationPage(page);
    docsPage = new PlaywrightDocsPage(page);
    
    // Set up console error monitoring
    navigationPage.monitorConsoleErrors();
  });

  /**
   * Test 1: Verify all required navigation buttons are visible and enabled
   * 
   * Manual Test Alignment:
   * - Manual Test Step 3: "Locate 'Docs' navigation element"
   * - Manual Test Step 4: "Locate 'API' navigation element"
   * - Manual Test Step 5: "Locate 'Community' navigation element"
   * - Manual Test Step 6: "Verify all navigation buttons are clickable"
   */
  test.skip('should display navigation buttons: Docs, API, Community', async () => {
    // STEP 1: Navigate to main page
    await navigationPage.navigateToHome();

    // STEP 2: Wait for navigation to load
    await navigationPage.waitForNavigationToLoad();

    // STEP 3: Get element counts before assertions
    const docsCount = await navigationPage.getDocsLinkCount();
    const apiCount = await navigationPage.getApiLinkCount();
    const communityCount = await navigationPage.getCommunityLinkCount();

    // STEP 4: Assert element counts are correct
    expect(docsCount).toBeGreaterThan(0);
    expect(apiCount).toBeGreaterThan(0);
    expect(communityCount).toBeGreaterThan(0);

    // STEP 5: Assert Docs link is visible and enabled
    await expect(navigationPage.getDocsLink()).toBeVisible({ timeout: 5000 });
    await expect(navigationPage.getDocsLink()).toBeEnabled();

    // STEP 6: Assert API link is visible and enabled
    await expect(navigationPage.getApiLink().first()).toBeVisible({ timeout: 5000 });
    await expect(navigationPage.getApiLink().first()).toBeEnabled();

    // STEP 7: Assert Community link is visible and enabled
    await expect(navigationPage.getCommunityLink().first()).toBeVisible({ timeout: 5000 });
    await expect(navigationPage.getCommunityLink().first()).toBeEnabled();

    // STEP 8: Verify no critical console errors occurred
    const criticalErrors = await navigationPage.getCriticalConsoleErrors();
    expect(criticalErrors).toHaveLength(0);
  });

  /**
   * Test 2: Verify navigation links are functional and navigate correctly
   * 
   * Manual Test Alignment:
   * - Manual Test Step 1: "Click on 'Docs' or 'Getting Started' navigation link"
   * - Manual Test Step 2: "Verify Docs page loads correctly"
   * - Manual Test Step 3: "Navigate back to main page"
   * - Manual Test Step 4: "Verify Community section is accessible"
   */
  test.skip('should have working navigation links', async () => {
    // STEP 1: Navigate to main page
    await navigationPage.navigateToHome();

    // STEP 2: Wait for navigation to load
    await navigationPage.waitForNavigationToLoad();

    // STEP 3: Get and verify Docs link exists and is visible
    const docsCount = await navigationPage.getDocsLinkCount();
    expect(docsCount).toBeGreaterThan(0);
    await expect(navigationPage.getDocsLink()).toBeVisible({ timeout: 5000 });

    // STEP 4: Click Docs link
    await navigationPage.clickDocsLink();

    // STEP 5: Wait for navigation to docs section
    await navigationPage.waitForUrlChange(
      (url) => url.toString().includes('/docs/intro') || url.toString().includes('/docs'),
      10000
    );

    // STEP 6: Verify we're on docs page
    expect(docsPage.isOnDocsPage()).toBe(true);

    // STEP 7: Verify docs page loaded successfully
    const docsLoaded = await docsPage.isDocsPageLoaded();
    expect(docsLoaded).toBe(true);

    // STEP 8: Navigate back to main page
    await navigationPage.goBack();

    // STEP 9: Verify we're back on main page
    await navigationPage.waitForHomeUrl();
    expect(navigationPage.page.url()).toBe(navigationPage.BASE_URL);

    // STEP 10: Wait for navigation to reload
    await navigationPage.waitForNavigationToLoad();

    // STEP 11: Verify Community section is accessible
    const communityCount = await navigationPage.getCommunityLinkCount();
    expect(communityCount).toBeGreaterThan(0);
    await expect(navigationPage.getCommunityLink().first()).toBeVisible({ timeout: 5000 });
  });

  /**
   * Test 3: Verify navigation is keyboard accessible
   * 
   * Manual Test Alignment:
   * - Manual Test Note: "Navigation should be accessible via keyboard (Tab key)"
   */
  test.skip('should support keyboard navigation', async () => {
    // STEP 1: Navigate to main page
    await navigationPage.navigateToHome();

    // STEP 2: Wait for navigation to load
    await navigationPage.waitForNavigationToLoad();

    // STEP 3: Verify keyboard navigation works
    const keyboardAccessible = await navigationPage.verifyKeyboardNavigation();
    expect(keyboardAccessible).toBe(true);
  });
});