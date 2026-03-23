import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import creds from '../utils/credentials';
import { testData } from '../fixtures/testData';
// simple helper that assumes an app running on baseURL with /login
test.describe('Login flow basics', () => {
 let login: LoginPage;
 let page: Page;
 test.beforeEach(async ({ page: p }: { page: Page }) => {
   page = p;
   login = new LoginPage(page);
   await login.goto();
 });
 // negative scenarios
 test('rejects login with wrong password', async () => {
   await login.login(creds.valid.username, 'incorrect');
   await expect(login.errorMessage).toContainText('Invalid');
 });
 test('rejects login with unknown username', async () => {
   await login.login('unknown', creds.valid.password);
   await expect(login.errorMessage).toContainText('not found');
 });
 test('shows validation when username empty', async () => {
   await login.login('', creds.valid.password);
   await expect(login.errorMessage).toContainText('required');
 });
 test('shows validation when password empty', async () => {
   await login.login(creds.valid.username, '');
   await expect(login.errorMessage).toContainText('required');
 });
 test('rejects SQL injection attempt', async () => {
   await login.login("' OR '1'='1", "' OR '1'='1");
   await expect(login.errorMessage).toContainText('Invalid');
 });
 test('shows error message on invalid login', async () => {
   await login.open();
   await login.username().fill(testData.invalid.username);
   await login.password().fill(testData.invalid.password);
   await login.submit().click();
   await expect(login.errorMessage()).toBeVisible();
 });
});