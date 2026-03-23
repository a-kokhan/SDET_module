import { Page } from '@playwright/test'

export class HomePage {
 private page: Page;

 constructor(page: Page) {
   this.page = page;
   this.avatar = page.getByTestId('avatar');
 }

 avatar() {
   return this.avatar;
 }
};

module.exports = { LoginPage }