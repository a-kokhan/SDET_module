// path: src/pages/ProfilePage.ts
import { expect, Page } from '@playwright/test';

export class ProfilePage {
 private page: Page;
 constructor(page: Page) {
   this.page = page;
 }
 
 async open(): Promise<void> {
   await this.page.goto('/profile');
 }
//  /
//   * Selects a file via the labelled input and submits the form.
//   * @param imagePath - relative path to the avatar file
//   */
 async updateAvatar(imagePath: string): Promise<void> {
   await this.page.getByLabel('Upload avatar').setInputFiles(imagePath);
   await this.page.getByTestId('submit-btn').click();
 }
//  /
//   * Assert that the “update successful” indicator is visible.
//   */
 async verifyUpdateSuccess(): Promise<void> {
   await expect(this.page.locator('text=Profile updated')).toBeVisible();
 }
}