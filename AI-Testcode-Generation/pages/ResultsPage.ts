import { Page } from '@playwright/test';

export class ResultsPage {
 private page: Page;

 constructor(page: Page) {
   this.page = page;
 }

 items() {
   return this.page.getByTestId('result-item');
 }

 titleOf(index: number) {
   return this.items().nth(index).locator('.title');
 }

 priceOf(index: number) {
   return this.items().nth(index).locator('.price');
 }
 
 async getAllPrices(): Promise<number[]> {
   const prices: number[] = [];
   const count = await this.items().count();
   for (let i = 0; i < count; i++) {
     const priceText = await this.priceOf(i).textContent();
     const price = parseFloat(priceText!.replace('$', ''));
     prices.push(price);
   }
   return prices;
 }
}