import { Page } from '@playwright/test';

export class ProductPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addToCart() {
        return this.page.getByRole('button', { name: 'Add to cart' });
    }

    title() {
        return this.page.locator('h1');
    }

    price() {
        return this.page.locator('.price');
    }
}