import { expect } from '@playwright/test';
import { Page, Locator } from '@playwright/test';

class DashboardPage {
  private page: Page;
  private avatar: Locator;
  
 constructor(page: Page) {
   this.page = page;
   this.avatar = page.getByTestId('avatar');
 }

 expectedURL() {
   return '/dashboard';
 }
 async expectDashboardVisible() {
   await expect(this.page).toHaveURL(/\/dashboard/);
   await expect(this.avatar).toBeVisible();
 }
}
module.exports = { DashboardPage };