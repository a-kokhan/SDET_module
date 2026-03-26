import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/NavigationPage';

test.describe('Site Homepage Navigation', () => {
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

  test.skip('Homepage displays all primary navigation buttons', async () => {
   
    await navigationPage.navigateToHome();
    
    await navigationPage.waitForNavigationToLoad();

    await expect(navigationPage.page).toHaveTitle(/Playwright/);

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

  test.skip('User can navigate to docs from homepage', async () => {
    
    await navigationPage.navigateToHome();
    await navigationPage.waitForNavigationToLoad();
    const docsLink = await navigationPage.getDocsLink();
    await docsLink.click();

    await expect(
      navigationPage.page,
      'Navigation should redirect to docs page after clicking docs link'
    ).toHaveURL(/\/docs|getting-started/);

    
    const docsContent = navigationPage.page.locator('main, article, [role="main"]');
    await expect(
      docsContent,
      'Documentation content area should be loaded and visible'
    ).toBeVisible();
  });

  test.skip('Footer contains GitHub project link', async () => {
    
    await navigationPage.navigateToHome();
    await navigationPage.waitForNavigationToLoad();
    const githubLink = await navigationPage.page
      .locator('footer')
      .getByRole('link', { name: /github/i })
      .first();

    await expect( githubLink,
      'GitHub link should be visible in footer'
    ).toBeVisible();

    const hrefAttr = await githubLink.getAttribute('href');
    expect(
      hrefAttr,
      'GitHub link should point to Playwright GitHub repository'
    ).toContain('github.com');
  });
});