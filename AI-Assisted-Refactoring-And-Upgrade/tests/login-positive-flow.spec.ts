import { test, expect, type Page } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';

import creds from '../utils/credentials';

// simple helper that assumes an app running on baseURL with /login

test.describe('Login flow basics', () => {

  let login: LoginPage;

  let page: Page;

  test.beforeEach(async ({ page: p }: { page: Page }) => {

    page = p;

    login = new LoginPage(page);

    await login.goto();

  });

  // positive scenarios

  test('should log in with valid credentials', async () => {

    await login.login(creds.valid.username, creds.valid.password);

    // assume success redirects to the dashboard

    await expect(page).toHaveURL(/dashboard/);

  });

  test('should retain username after failed attempt', async () => {

    await login.login('wrong', 'wrong');

    await expect(login.usernameInput).toHaveValue('wrong');

  });

  test('password field should mask input', async () => {

    await login.passwordInput.fill('sensitive');

    expect(await login.passwordInput.getAttribute('type')).toBe('password');

  });

  test('submit button disabled until fields filled', async () => {

    await expect(login.submitButton).toBeDisabled();

    await login.usernameInput.fill('a');

    await login.passwordInput.fill('b');

    await expect(login.submitButton).toBeEnabled();

  });

  test('error message disappears on typing', async () => {

    await login.login('bad', 'bad');

    await expect(login.errorMessage).toBeVisible();

    await login.usernameInput.fill('');

    await expect(login.errorMessage).toBeHidden();

  });
});
