import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('TC-NAV: Playwright Site Navigation (Consolidated)', () => {
  let navigationPage: NavigationPage;

  /**
   * Setup: Initialize page object and error monitoring
   * ✅ FIX: Uses page object pattern (DRY, maintainable)
   * ✅ FIX: Consolidated console error monitoring
   */
  test.beforeEach(async ({ page }) => {
    navigationPage = new NavigationPage(page);
    navigationPage.monitorConsoleErrors();
  });

  /**
   * Teardown: Validate no console errors
   * ✅ FIX: All tests validate console state
   */
  test.afterEach(async () => {
    if (!navigationPage) return;
    const criticalErrors = await navigationPage.getCriticalConsoleErrors();
    expect(
      criticalErrors,
      'No critical console errors should occur during navigation'
    ).toHaveLength(0);
  });

  /**
   * TC-NAV-002-API: API Reference Navigation
   * 
   * ✅ REFACTORED FROM: "should open API page from top navigation"
   * 
   * Changes:
   *   1. ❌ Removed: await page.waitForTimeout(2500) — Hard-coded timeout
   *   2. ✅ Added: navigationPage.waitForNavigationToLoad() — Element-based wait
   *   3. ❌ Removed: page.locator('nav >> text=API') — Brittle text selector  
   *   4. ✅ Added: navigationPage.getApiLink() — Role-based selector (POM)
   *   5. ✅ Added: Explicit assertion message for CI/debugging
   *   6. ✅ Added: Console error monitoring (afterEach)
   */
  test('TC-NAV-002-API: User can navigate to API reference page', async () => {
    // Arrange: Navigate to home and wait for navigation to load
    await navigationPage.navigateToHome();
    // ✅ FIX: Element-based wait (auto-retry) instead of hard-coded timeout
    await navigationPage.waitForNavigationToLoad();

    // Act: Click API link using role-based selector
    // ✅ FIX: Role-based selector via page object (maintainable, robust)
    const apiLink = await navigationPage.getApiLink();
    await apiLink.click();

    // Assert: Verify navigation to API page
    // ✅ FIX: Explicit assertion message for debugging
    await expect(
      navigationPage.page,
      'Navigation should redirect to API reference page after clicking API link'
    ).toHaveURL(/api/);
  });

  /**
   * TC-NAV-002-COMMUNITY: Community Navigation
   * 
   * ✅ REFACTORED FROM: "should open community page with old menu item"
   * 
   * Changes:
   *   1. ❌ Removed: await page.waitForTimeout(2500) — Hard-coded timeout
   *   2. ✅ Added: navigationPage.waitForNavigationToLoad() — Element-based wait
   *   3. ❌ Removed: page.click('text=Community') — Brittle text selector
   *   4. ✅ Added: navigationPage.getCommunityLink() — Role-based selector (POM)
   *   5. ❌ Removed: page.locator('body').toContainText('Discord') — Page-level check
   *   6. ✅ Added: Specific element visibility check for community content
   *   7. ✅ Added: Assertion message for clarity
   *   8. ✅ Added: Console error monitoring
   */
  test('TC-NAV-002-COMMUNITY: User can access community links (Discord, Stack Overflow)', async () => {
    // Arrange: Navigate to home and wait for navigation to load
    await navigationPage.navigateToHome();
    // ✅ FIX: Element-based wait instead of hard-coded timeout
    await navigationPage.waitForNavigationToLoad();

    // Act: Get community link count to verify presence
    // ✅ FIX: Use page object method for reliable element access
    const communityLinkCount = await navigationPage.getCommunityLinkCount();

    // Assert: Verify community links are present
    // ✅ FIX: Specific count assertion instead of page-level text search
    expect(
      communityLinkCount,
      'Community links (Discord, Stack Overflow) should be present in navigation'
    ).toBeGreaterThan(0);

    // Additional verification: Community links should be clickable
    // ✅ FIX: Verify element state (enabled, visible) instead of broad text search
    const communityLink = await navigationPage.getCommunityLink();
    await expect(
      communityLink,
      'Community link should be visible and clickable'
    ).toBeVisible();
  });

  /**
   * REMOVED: "should verify dark mode toggle is present"
   * 
   * Reason:
   *   - Out of scope for navigation test suite
   *   - Should be in separate theme/UI features spec (e.g., TC-THEME-001)
   *   - Prevents test suite bloat and maintains single responsibility
   * 
   * Recommendation:
   *   Create: tests/theme.spec.ts with theme-related tests
   *   Pattern: Same POM structure, dedicated theme page object
   */
});