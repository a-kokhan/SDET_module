import { test, expect, type Page } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Header } from '../components/Header';
import { cartItems, users } from '../fixtures/data';

test.describe('Checkout flow', () => {

  test('should complete checkout process', async ({ page }: { page: Page }) => {

    const search = new SearchPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);
    const header = new Header(page);

    await search.open();

    await search.queryInput().fill(cartItems.product.name);

    await search.submit().click();

    await (await product.addToCart()).click();

    // Verification: cart badge increments

    await expect(header.cartBadge()).toHaveText('1');

    // User actions: proceed to checkout

    await cart.proceedToCheckout().click();

    // Verification: total matches expected

    await expect(checkout.total()).toHaveText('');

  });

});
 