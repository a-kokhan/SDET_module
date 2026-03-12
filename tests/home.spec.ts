import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/LoginPage';
import { log } from '../utils/credentials';

test.describe('Home page', () => {
  test('should load and have correct title', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    const title = await home.title();
    log(`Page title is ${title}`);
    expect(title).toContain('Example Domain');
  });
});
