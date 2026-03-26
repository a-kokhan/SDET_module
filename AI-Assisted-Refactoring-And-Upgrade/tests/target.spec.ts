const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/loginPage');

const creds = require('../utils/credentials');

// simple helper that assumes an app running on baseURL with /login

test.describe('Login flow basics', () => {

  test.beforeEach(async ({ page }) => {

    const login = new LoginPage(page);

    await login.goto();

  });

  // positive scenarios

  test.skip('should log in with valid credentials', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login(creds.valid.username, creds.valid.password);

    // assume success redirects to the dashboard

    await expect(page).toHaveURL(/dashboard/);

  });

  test.skip('should retain username after failed attempt', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login('wrong', 'wrong');

    await expect(login.usernameInput).toHaveValue('wrong');

  });

  test.skip('password field should mask input', async ({ page }) => {

    const login = new LoginPage(page);

    await login.passwordInput.fill('sensitive');

    expect(await login.passwordInput.getAttribute('type')).toBe('password');

  });

  test.skip('submit button disabled until fields filled', async ({ page }) => {

    const login = new LoginPage(page);

    await expect(login.submitButton).toBeDisabled();

    await login.usernameInput.fill('a');

    await login.passwordInput.fill('b');

    await expect(login.submitButton).toBeEnabled();

  });

  test.skip('error message disappears on typing', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login('bad', 'bad');

    await expect(login.errorMessage).toBeVisible();

    await login.usernameInput.fill('');

    await expect(login.errorMessage).toBeHidden();

  });

  // negative scenarios

  test.skip('rejects login with wrong password', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login(creds.valid.username, 'incorrect');

    await expect(login.errorMessage).toContainText('Invalid');

  });

  test.skip('rejects login with unknown username', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login('unknown', creds.valid.password);

    await expect(login.errorMessage).toContainText('not found');

  });

  test.skip('shows validation when username empty', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login('', creds.valid.password);

    await expect(login.errorMessage).toContainText('required');

  });

  test.skip('shows validation when password empty', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login(creds.valid.username, '');

    await expect(login.errorMessage).toContainText('required');

  });

  test.skip('rejects SQL injection attempt', async ({ page }) => {

    const login = new LoginPage(page);

    await login.login("' OR '1'='1", "' OR '1'='1");

    await expect(login.errorMessage).toContainText('Invalid');

  });

});
 