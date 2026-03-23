import { Page, expect } from '@playwright/test';


class LoginPage {
 private page: Page;
 constructor(page: Page) {
   this.page = page;
   this.usernameInput = page.locator('#username');
   this.passwordInput = page.locator('#password');
   this.submitButton = page.locator('button[type=submit]');
   this.errorMessage = page.locator('.error');
 }
//  /
//   * Navigate to the login screen.
//   */
 async goto() {
   await this.page.goto('/login');
 }
 async login(user, pass) {
   await this.usernameInput.fill(user);
   await this.passwordInput.fill(pass);
   await this.submitButton.click();
 }
 /**
  * Combined flow – open the page and submit credentials.
  * This helper consolidates the common login sequence used
  * across multiple spec files.
  */
 async loginAs(user, pass) {
   await this.goto();
   await this.login(user, pass);
 }
 async getError() {
   return this.errorMessage.textContent();
 }
}
module.exports = { LoginPage }