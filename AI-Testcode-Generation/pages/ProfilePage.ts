
import { Page, expect } from '@playwright/test';

export class ProfilePage {
 private page: Page;
 constructor(page: Page) {
   this.page = page;
 }

 async open(): Promise<void> {
   await this.page.goto('/profile');
 }

 async updateAvatar(imagePath: string): Promise<void> {
   await this.page.getByLabel('Upload avatar').setInputFiles(imagePath);
   await this.page.getByTestId('submit-btn').click();
 }

 async verifyUpdateSuccess(): Promise<void> {
   await expect(this.page.locator('text=Profile updated')).toBeVisible();
 }
}