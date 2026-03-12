// path: tests/e2e/profile.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProfilePage } from '../../src/pages/ProfilePage';
import { users } from '../../src/fixtures/users';
test.describe('Profile avatar upload flow', () => {
 test.beforeEach(async ({ page }) => {
   const login = new LoginPage(page);
   await login.goto();
   await login.login(users.valid.username, users.valid.password);
 });
 test('should allow the user to upload a new avatar', async ({ page }) => {
   const profile = new ProfilePage(page);
   await profile.open();
   await profile.updateAvatar('tests/fixtures/avatar.png');
   await profile.verifyUpdateSuccess();
 });
});