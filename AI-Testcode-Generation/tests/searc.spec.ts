import { test, expect, type Page } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ResultsPage } from '../pages/ResultsPage';
test.describe('Search flow', () => {
 test('should filter results by price', async ({ page }: { page: Page }) => {
   const search = new SearchPage(page);
   const results = new ResultsPage(page);

   // Initialization: open search page
   await search.open();

   // User actions: type "Laptop", apply filter "Price < $1000"
   await search.queryInput().fill('Laptop');
   await search.applyFilter('Price < $1000').click();
   
   // Verification: each result price < 1000
   const prices = await results.getAllPrices();
   expect(prices.every(price => price < 1000)).toBe(true);
 });
});