import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('Site Navigation & Docs Access', () => {
  let navigationPage: NavigationPage;

  test.beforeEach(async ({ page }) => {
    navigationPage = new NavigationPage(page);
    navigationPage.monitorConsoleErrors();
  });

  test.afterEach(async () => {
    if (!navigationPage) return;
    const criticalErrors = await navigationPage.getCriticalConsoleErrors();
    expect(
      criticalErrors,
      'No critical console errors should occur during navigation'
    ).toHaveLength(0);
  });

  test('TC-NAV-002-DOCS: User can navigate to docs from homepage', async () => {
    await navigationPage.navigateToHome();
    await navigationPage.waitForNavigationToLoad();
    const docsLink = await navigationPage.getDocsLink();
    await docsLink.click();

    await expect(
      navigationPage.page,
      'Navigation should redirect to docs page after clicking docs link'
    ).toHaveURL(/\/docs|getting-started/);

    const docsMain = navigationPage.page.locator('main, article, .sidebar');
    await expect(
      docsMain,
      'Documentation content area should be visible and loaded'
    ).toBeVisible();
  });
});