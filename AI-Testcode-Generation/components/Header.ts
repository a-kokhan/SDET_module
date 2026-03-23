import { Page } from '@playwright/test';

export class Header {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    cartBadge() {
        return this.page.locator('.cart-badge');
    }
}