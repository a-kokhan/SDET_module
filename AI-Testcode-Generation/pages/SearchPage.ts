import { Page } from '@playwright/test';
export class SearchPage {
 productResult(name: string) {
   throw new Error('Method not implemented.');
 }
 private page: Page;
 constructor(page: Page) {
   this.page = page;
 }
 async open() {
   await this.page.goto('/search');
 }
 queryInput() {
   return this.page.locator('input[name="query"]');
 }
 submit() {
   return this.page.locator('button[type="submit"]');
 }
 applyFilter(filterName: string) {
   return this.page.getByRole('button', { name: filterName });
 }
}