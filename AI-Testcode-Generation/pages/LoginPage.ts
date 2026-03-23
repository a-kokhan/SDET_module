import { Page } from '@playwright/test';
import { Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
  usernameInput: Locator;
  passwordInput: Locator;
  submitButton: Locator;
 constructor(page: Page) {
   this.page = page;
   this.usernameInput = page.getByTestId('username-input');
   this.passwordInput = page.getByTestId('password-input');
   this.submitButton = page.getByTestId('login-btn');
   this.errorMessage = page.getByTestId('error');
 }

 async open() {
   await this.page.goto('/login');
 }

 username() {
   return this.usernameInput;
 }

 password() {
   return this.passwordInput;
 }

 submit() {
   return this.submitButton;
 }

 errorMessage() {
   return this.errorMessage;
 }
 async login(user: string, pass: string) {
   await this.usernameInput.fill(user);
   await this.passwordInput.fill(pass);
   await this.submitButton.click();
 }
//  /
//   * Combined flow – open the page and submit credentials.
//   * This helper consolidates the common login sequence used
//   * across multiple spec files.
//   */
 async loginAs(user: string, pass: string) {
   await this.goto();
   await this.login(user, pass);
 }
 async getError() {
   return this.errorMessage.textContent();
 }
}

module.exports = { LoginPage };