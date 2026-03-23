import { Page } from '@playwright/test';
export class CartPage {
 private page: Page;
 constructor(page: Page) {
   this.page = page;
 }
 items() {
   return this.page.locator('.cart-item');
 }
 proceedToCheckout() {
   return this.page.getByTestId('checkout-btn');
 }
}