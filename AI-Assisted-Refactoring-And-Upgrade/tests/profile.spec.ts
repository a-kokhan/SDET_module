// path: tests/e2e/profile.spec.ts
import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';
import { ProfilePage } from '../../src/pages/ProfilePage';
import { users } from '../../src/fixtures/users';
test.describe('Profile avatar upload flow', () => {
 test.beforeEach(async ({ page }: { page: Page }) => {
   const login = new LoginPage(page);
   await login.loginAs(users.valid.username, users.valid.password);
 });
 test.skip('should allow the user to upload a new avatar', async ({ page }: { page: Page }) => {
   const profile: ProfilePage = new ProfilePage(page);
   await profile.open();
   await profile.updateAvatar('tests/fixtures/avatar.png');
   await profile.verifyUpdateSuccess();
 });
});