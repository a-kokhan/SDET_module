/**
 * DIFF EXAMPLE: outdated2.spec.ts Cleanup & Refactoring
 * 
 * This file demonstrates the transformation from broken patterns
 * to professional, maintainable patterns using the Page Object Model.
 * 
 * All changes align with main-navigation-professional.spec.ts standards.
 */

// ============================================================================
// BEFORE: Original (Broken)
// ============================================================================

/*
import { test, expect } from '@playwright/test';

test.describe('Playwright docs redundant spec', () => {
  test.skip('should open docs from homepage again', async ({ page }) => {
    await page.goto('http://playwright.dev');
    await page.waitForTimeout(4000);  // ❌ PROBLEM: Hard-coded timeout, flaky

    // ❌ PROBLEM: .first() with text selector — assumes consistent ordering
    await page.locator('text=Get started').first().click();

    await page.waitForTimeout(4000);  // ❌ PROBLEM: Hard-coded timeout

    // ❌ PROBLEM: Assumes h1 contains "Installation" — outdated content assumption
    await expect(page.locator('h1')).toContainText('Installation');
  });

  test.skip('should search in docs using obsolete selector', async ({ page }) => {
    await page.goto('http://playwright.dev/docs/intro');
    await page.waitForTimeout(3000);  // ❌ PROBLEM: Hard-coded timeout

    // ❌ PROBLEM: Class selector '.DocSearch-Input' breaks if library updated
    await page.fill('.DocSearch-Input', 'locator');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(3000);  // ❌ PROBLEM: Hard-coded timeout

    // ❌ PROBLEM: Page-level assertion, weak and unfocused
    await expect(page.locator('body')).toContainText('locator');
  });

  test.skip('should verify Java section exists', async ({ page }) => {
    await page.goto('http://playwright.dev/docs/intro');
    await page.waitForTimeout(3000);  // ❌ PROBLEM: Hard-coded timeout

    // ❌ PROBLEM: Text selector assumes "Java" exists — outdated content assumption
    await expect(page.locator('text=Java')).toBeVisible();
  });
});
*/

// ============================================================================
// AFTER: Refactored (Professional)
// ============================================================================

import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('TC-NAV: Playwright Site Navigation & Docs Access', () => {
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
   * TC-NAV-002-DOCS: Documentation Navigation from Homepage
   * 
   * ✅ REFACTORED FROM: "should open docs from homepage again"
   * 
   * Changes:
   *   1. ❌ Removed: await page.waitForTimeout(4000) — Hard-coded timeout
   *   2. ✅ Added: navigationPage.waitForNavigationToLoad() — Element-based wait
   *   3. ❌ Removed: page.locator('text=Get started').first() — Brittle text + .first()
   *   4. ✅ Added: navigationPage.getDocsLink() — Stable role-based selector (POM)
   *   5. ❌ Removed: page.locator('h1').toContainText('Installation') — Content assumption
   *   6. ✅ Added: URL verification and navigation state checks (more reliable)
   *   7. ✅ Added: Explicit assertion messages for CI/debugging
   *   8. ✅ Added: Console error monitoring (afterEach)
   * 
   * Note: Documentation content (h1 text) varies; test navigation instead
   */
  test.skip('TC-NAV-002-DOCS: User can navigate to docs from homepage', async () => {
    // Arrange: Navigate to home and wait for navigation to load
    await navigationPage.navigateToHome();
    // ✅ FIX: Element-based wait (auto-retry) instead of hard-coded timeout
    await navigationPage.waitForNavigationToLoad();

    // Act: Click docs link using role-based selector
    // ✅ FIX: Role-based selector via page object (maintainable, robust)
    const docsLink = await navigationPage.getDocsLink();
    await docsLink.click();

    // Assert: Verify navigation to docs page
    // ✅ FIX: URL-based assertion (stable) instead of content assumption
    await expect(
      navigationPage.page,
      'Navigation should redirect to docs page after clicking docs link'
    ).toHaveURL(/\/docs|getting-started/);

    // Assert: Verify docs page is loaded (sidebar or main content visible)
    // ✅ FIX: Navigation state verification instead of exact content text
    const docsMain = navigationPage.page.locator('main, article, .sidebar');
    await expect(
      docsMain,
      'Documentation content area should be visible and loaded'
    ).toBeVisible();
  });

  /**
   * REMOVED: "should search in docs using obsolete selector"
   * 
   * Reason:
   *   - Search functionality is out of scope for navigation test suite
   *   - Depends on 3rd-party library (.DocSearch) — fragile integration testing
   *   - Class selectors break when library is updated
   *   - Should be in separate docs-search or feature-search spec
   * 
   * Recommendation:
   *   Create: tests/docs-search.spec.ts with dedicated search tests
   *   Pattern: Same POM structure, dedicated search page object
   *   Coverage: Search, result filtering, result navigation
   */

  /**
   * REMOVED: "should verify Java section exists"
   * 
   * Reason:
   *   - Content verification is out of scope for navigation testing
   *   - Text-based assertion assumes Java still exists (content changes)
   *   - Should be in docs-content suite that validates language support
   *   - Navigation suite should verify structure, not content
   * 
   * Recommendation:
   *   Create: tests/docs-content.spec.ts with content validation
   *   Pattern: Data-driven tests for each language (Java, Python, Node, etc.)
   *   Coverage: Language availability, docs for each language version
   */
});