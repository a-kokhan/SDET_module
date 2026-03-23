import { Page } from '@playwright/test';

export class CheckoutPage {

  private page: Page;

  constructor(page: Page) {

    this.page = page;

  }

  total() {

    return this.page.getByTestId('cart-total');

  }

  placeOrder() {

    return this.page.getByTestId('placeOrder-button');

  }

}
 