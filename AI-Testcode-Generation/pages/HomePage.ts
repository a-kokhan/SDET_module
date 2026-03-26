import { Locator, Page } from '@playwright/test'
import { LoginPage } from './LoginPage';

export class HomePage {
 private page: Page;
 avatar: Locator;

 constructor(page: Page) {
   this.page = page;
   this.avatar = page.getByTestId('avatar');
 }

 getAvatar() {
   return this.avatar;
 }
};

module.exports = { LoginPage }