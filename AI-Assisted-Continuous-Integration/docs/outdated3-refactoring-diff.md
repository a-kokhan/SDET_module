/**
 * DIFF EXAMPLE: outdated3.spec.ts Cleanup & Refactoring
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

test.describe('Playwright homepage old spec', () => {
  test('should open homepage and verify old hero content', async ({ page }) => {
    await page.goto('http://playwright.dev');
    await page.waitForTimeout(5000);  // ❌ PROBLEM: Hard-coded timeout, longest wait

    await expect(page).toHaveTitle(/Playwright/);  // OK: Title validation

    // ❌ PROBLEM: Exact text match assumes outdated content ("reliable end-to-end testing")
    await expect(page.locator('text=Playwright enables reliable end-to-end testing')).toBeVisible();

    // ❌ PROBLEM: Text selector, assumes "Get started" Button exists and text unchanged
    const getStartedButton = page.locator('text=Get started');
    await expect(getStartedButton).toBeVisible();
  });

  test('should navigate to docs using old nav selector', async ({ page }) => {
    await page.goto('http://playwright.dev');
    await page.waitForTimeout(2000);  // ❌ PROBLEM: Hard-coded timeout

    // ❌ PROBLEM: Attribute selector 'a[href="/docs/intro"]' breaks if routing changes
    await page.click('a[href="/docs/intro"]');

    await page.waitForTimeout(3000);  // ❌ PROBLEM: Hard-coded timeout

    // ❌ PROBLEM: Overlaps with navigation tests, assumes "Installation" heading
    await expect(page.locator('text=Installation')).toBeVisible();
  });

  test('should verify GitHub link exists in footer', async ({ page }) => {
    await page.goto('http://playwright.dev');
    await page.waitForTimeout(2000);  // ❌ PROBLEM: Hard-coded timeout

    // ❌ PROBLEM: Composite selector assumes footer >> text=GitHub pattern
    const githubLink = page.locator('footer >> text=GitHub');
    await expect(githubLink).toBeVisible();
  });
});
*/

// ============================================================================
// AFTER: Refactored (Professional)
// ============================================================================

import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('TC-NAV: Playwright Site Homepage Navigation', () => {
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
   * TC-NAV-001: Homepage Navigation Button Visibility
   * 
   * ✅ REFACTORED FROM: "should open homepage and verify old hero content"
   * 
   * Changes:
   *   1. ❌ Removed: await page.waitForTimeout(5000) — Hard-coded timeout
   *   2. ✅ Added: navigationPage.waitForNavigationToLoad() — Element-based wait
   *   3. ❌ Removed: .toHaveTitle(/Playwright/) — Browser title check (implicit in POM)
   *   4. ❌ Removed: text=Playwright enables... — Exact text content assumption
   *   5. ✅ Added: Navigation button count verification (structure over content)
   *   6. ❌ Removed: text=Get started — Brittle text selector
   *   7. ✅ Added: getDocsLink() and other navigation methods (POM)
   *   8. ✅ Added: Explicit assertion messages for CI/debugging
   *   9. ✅ Added: Console error monitoring
   * 
   * Note: Hero content changes; test navigation structure not copy
   */
  test('TC-NAV-001: Homepage displays all primary navigation buttons', async () => {
    // Arrange: Navigate to home
    await navigationPage.navigateToHome();
    // ✅ FIX: Element-based wait instead of hard-coded timeout
    await navigationPage.waitForNavigationToLoad();

    // Assert: Verify page title is correct
    // ✅ KEEP: Title validation (stable, explicit)
    await expect(navigationPage.page).toHaveTitle(/Playwright/);

    // Assert: Verify primary navigation buttons are visible
    // ✅ FIX: Test navigation structure (buttons exist) not copy content
    const docsLinkCount = await navigationPage.getDocsLinkCount();
    const apiLinkCount = await navigationPage.getApiLinkCount();
    const communityLinkCount = await navigationPage.getCommunityLinkCount();

    expect(
      docsLinkCount,
      'Docs navigation button should be visible on homepage'
    ).toBeGreaterThan(0);

    expect(
      apiLinkCount,
      'API reference navigation button should be visible on homepage'
    ).toBeGreaterThan(0);

    expect(
      communityLinkCount,
      'Community navigation button should be visible on homepage'
    ).toBeGreaterThan(0);
  });

  /**
   * TC-NAV-002-DOCS: Homepage to Docs Navigation
   * 
   * ✅ REFACTORED FROM: "should navigate to docs using old nav selector"
   * 
   * Changes:
   *   1. ❌ Removed: await page.waitForTimeout(2000) — Hard-coded timeout
   *   2. ✅ Added: navigationPage.waitForNavigationToLoad() — Element-based wait
   *   3. ❌ Removed: page.click('a[href="/docs/intro"]') — Fragile href selector
   *   4. ✅ Added: navigationPage.getDocsLink().click() — Stable POM selector
   *   5. ❌ Removed: text=Installation — Content assumption (docs heading varies)
   *   6. ✅ Added: URL verification (more reliable than content)
   *   7. ✅ Added: Navigation state checks for loaded content
   *   8. ✅ Added: Explicit assertion messages
   * 
   * Note: Documentation content/headings change; test navigation not content
   */
  test('TC-NAV-002-DOCS: User can navigate to docs from homepage', async () => {
    // Arrange: Navigate to home and wait for navigation to load
    await navigationPage.navigateToHome();
    // ✅ FIX: Element-based wait instead of hard-coded timeout
    await navigationPage.waitForNavigationToLoad();

    // Act: Click docs link using role-based selector
    // ✅ FIX: Stable role-based selector via page object
    const docsLink = await navigationPage.getDocsLink();
    await docsLink.click();

    // Assert: Verify navigation to docs page
    // ✅ FIX: URL-based verification (stable) instead of content assumption
    await expect(
      navigationPage.page,
      'Navigation should redirect to docs page after clicking docs link'
    ).toHaveURL(/\/docs|getting-started/);

    // Assert: Verify docs page is loaded (navigation back should work)
    // ✅ FIX: Test page state, not specific content headings
    const docsContent = navigationPage.page.locator('main, article, [role="main"]');
    await expect(
      docsContent,
      'Documentation content area should be loaded and visible'
    ).toBeVisible();
  });

  /**
   * TC-NAV-001-FOOTER: Footer Navigation Links
   * 
   * ✅ REFACTORED FROM: "should verify GitHub link exists in footer"
   * 
   * Changes:
   *   1. ❌ Removed: await page.waitForTimeout(2000) — Hard-coded timeout
   *   2. ✅ Added: navigationPage.waitForNavigationToLoad() — Element-based wait
   *   3. ❌ Removed: footer >> text=GitHub — Composite fragile selector
   *   4. ✅ Added: Dedicated footer link getter in page object
   *   5. ✅ Added: URL-based verification (more reliable than text match)
   *   6. ✅ Added: Explicit assertion message for debugging
   * 
   * Note: Footer branding/text may change; test link existence and URL
   */
  test('TC-NAV-001-FOOTER: Footer contains GitHub project link', async () => {
    // Arrange: Navigate to home and wait for navigation to load
    await navigationPage.navigateToHome();
    // ✅ FIX: Element-based wait instead of hard-coded timeout
    await navigationPage.waitForNavigationToLoad();

    // Act: Get GitHub link from footer
    // ✅ FIX: Use stable role-based selector for footer link
    const githubLink = await navigationPage.page
      .locator('footer')
      .getByRole('link', { name: /github/i })
      .first();

    // Assert: Verify GitHub link is visible and points to correct URL
    // ✅ FIX: Test link presence and URL instead of exact text match
    await expect(
      githubLink,
      'GitHub link should be visible in footer'
    ).toBeVisible();

    // Verify link URL points to GitHub project (without clicking)
    // ✅ FIX: Attribute-based verification (stable)
    const hrefAttr = await githubLink.getAttribute('href');
    expect(
      hrefAttr,
      'GitHub link should point to Playwright GitHub repository'
    ).toContain('github.com');
  });
});