import { test, expect, type Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import { HomePage } from '../pages/HomePage';

import { users } from '../fixtures/data';

test.describe('Login positive flows', () => {

  test.skip('should handle login positive flow', async ({ page }: { page: Page }) => {

    const login = new LoginPage(page);

    // Initialization: open login

    await login.open();

    // User actions: fill credentials, submit

    await login.username().fill(users.valid.username);

    await login.password().fill(users.valid.password);

    await login.submit().click();

  });

});
 