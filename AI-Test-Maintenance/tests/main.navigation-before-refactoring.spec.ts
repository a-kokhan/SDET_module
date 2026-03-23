import { test, expect, type Page } from '@playwright/test';

/**
 * Original Navigation Tests (BEFORE Refactoring)
 * 
 * ⚠️ DEPRECATED VERSION - Contains 13 known issues:
 * - Fragile selectors with overlapping regex patterns (#1, #2, #3)
 * - Unreliable networkidle waits (#4, #5, #6)
 * - Logic issues with .first() and inconsistent selectors (#7, #8, #9)
 * - Missing coverage for console errors and accessibility (#10, #11, #12, #13)
 * 
 * This version is kept for comparison purposes.
 * Use main-navigation-refactored.spec.ts instead.
 */

test.describe('Main Page Navigation - BEFORE REFACTORING', () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    // Create new page for each test
    page = await browser.newPage();
    
    // Issue #3: No stable selectors defined
    // Using inline regex patterns throughout
  });

  test.afterEach(async () => {
    await page.close();
  });

  /**
   * Test 1: Verify navigation buttons are visible
   * 
   * Issues in this test:
   * - Issue #1: Overlapping regex patterns (apiLink includes "docs")
   * - Issue #2: Too-broad community selector (matches 4 different things)
   * - Issue #3: No stable selectors / test attributes
   * - Issue #4: Uses networkidle wait (TWICE - flaky on slow networks)
   * - Issue #5: No wait for elements before getting them
   * - Issue #7: Uses .first() without count verification
   * - Issue #10: No count verification of navigation elements
   * - Issue #11: No console error monitoring
   */
  test('should display navigation buttons: Docs, API, Community', async () => {
    // SETUP
    await page.goto('https://playwright.dev/');
    
    // Issue #4: First networkidle call - FLAKY ON SLOW NETWORKS
    await page.waitForLoadState('networkidle');

    // Issue #1: Overlapping regex - /docs|getting\s*started/ vs /api|docs/
    const docsLink = page.getByRole('link', { name: /docs|getting\s*started/i });
    
    // Issue #1: The apiLink regex includes "docs" - overlaps with docsLink!
    const apiLink = page.getByRole('link', { name: /api|docs/i });
    
    // Issue #2: Too-broad selector - matches Community, Discord, Stack Overflow, Twitter
    const communityLink = page.getByRole('link', { 
      name: /community|discord|stack\s*overflow|twitter/i 
    });

    // Issue #7: Multiple .first() calls hide element count problems
    // Issue #10: No verification of exact element count
    await expect(docsLink.first()).toBeVisible();
    await expect(apiLink.first()).toBeVisible();
    await expect(communityLink.first()).toBeVisible();

    // Issue #4: Second networkidle call - FLAKY ON SLOW NETWORKS
    await page.waitForLoadState('networkidle');

    // Issue #7 & #10: No count assertions - could have 10 links, test still passes
    const docsLinkCount = await docsLink.count();
    const apiLinkCount = await apiLink.count();
    const communityLinkCount = await communityLink.count();

    // Just log the counts - don't assert they're exactly 1
    console.log(`Found ${docsLinkCount} docs links, ${apiLinkCount} api links, ${communityLinkCount} community links`);
  });

  /**
   * Test 2: Verify navigation links work
   * 
   * Issues in this test:
   * - Issue #3: Hardcoded text selectors (no stable attributes)
   * - Issue #6: Hard-coded 5 second timeout on waitForURL
   * - Issue #8: Inconsistent element retrieval (different pattern than Test 1)
   * - Issue #9: Implicitly depends on test 1 (assumes navigation exists)
   * - Issue #5: Waits for load, then immediately gets element without checking
   */
  test('should have working navigation links', async () => {
    // SETUP
    await page.goto('https://playwright.dev/');
    
    // Issue #5: Wait for load, but no explicit wait for elements
    await page.waitForLoadState('networkidle');

    // Issue #8: Different selector pattern than Test 1
    // Test 1 uses /docs|getting\s*started/, Test 2 uses only /getting\s*started/
    const gettingStartedLink = page.getByRole('link', { name: /getting\s*started/i }).first();

    // Get link without explicit wait - relies on previous waitForLoadState
    // Issue #5: What if navigation loads AFTER networkidle?
    const isVisible = await gettingStartedLink.isVisible();
    if (isVisible) {
      // Click link without waiting for it to be ready
      await gettingStartedLink.click();

      // Issue #6: Hard-coded 5 second timeout - FLAKY ON SLOW NETWORKS
      await page.waitForURL(/.*docs\/intro.*/, { timeout: 5000 });

      // Verify we're on docs page
      const currentUrl = page.url();
      expect(currentUrl).toContain('/docs');
    }
  });

  /**
   * Test 3: Keyboard navigation
   * 
   * Issues in this test:
   * - Issue #13: No keyboard navigation accessibility testing
   * Note: This test is actually MISSING from original - left out for demo
   */
  test('MISSING: should support keyboard navigation', async () => {
    // Issue #13: Original tests don't include keyboard accessibility
    // This would need to be added as a new test
    test.skip();
  });
});

/**
 * Summary of Issues Found in Original Tests:
 * 
 * 🔴 CRITICAL (5 issues):
 *   - #1: Overlapping regex patterns (docs/api)
 *   - #2: Broad community selector
 *   - #3: No stable selectors/test attributes
 *   - #4: Flaky networkidle waits
 *   - Missing keyboard accessibility test (#13)
 * 
 * 🟡 HIGH (5 issues):
 *   - #5: No element wait before retrieval
 *   - #6: Hard-coded timeout
 *   - #7: .first() hides element count
 *   - #8: Inconsistent selectors
 *   - #9: Test dependencies
 * 
 * 🟠 MEDIUM (3 issues):
 *   - #10: No count verification
 *   - #11: No console error monitoring
 *   - #12: No viewport/responsive testing
 * 
 * All of these issues caused:
 * - Test flakiness in CI environments
 * - Unpredictable failures on slow networks
 * - High maintenance burden
 * - False positives/negatives
 * - Brittle, hard-to-debug test failures
 * 
 * See legacy-test-analysis.md for detailed analysis.
 */
