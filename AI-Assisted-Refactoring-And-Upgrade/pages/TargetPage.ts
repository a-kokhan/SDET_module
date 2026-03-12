import { Page } from '@playwright/test';

// * TargetPage encapsulates operations on a row/item that exposes a
// * dropdown menu with several actions. Originally there were three
// * almost‑identical helpers (`clickDropdownDelete`, `clickDropdownEdit`,
// * `clickDropdownArchive`). Those have been consolidated into a single
// * parameterised method to reduce duplication.

export class TargetPage {
 private page: Page;
 constructor(page: Page) {
   this.page = page;
 }

//   * Opens the page that contains the target item.
//   */

 async open(): Promise<void> {
   await this.page.goto('/items');
 }
 /**
  * Clicks the dropdown trigger for the given item and selects an
  * option whose visible text matches the supplied name.
  * @param option - label of the dropdown entry (e.g. 'Delete', 'Edit')
  */
 async clickDropdownByName(option: string): Promise<void> {
   // assumes each row has a button with data-testid="dropdown"
   await this.page.getByTestId('dropdown').click();
   await this.page.getByRole('menuitem', { name: option }).click();
 }
}