import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Example Page object demonstrating POM pattern
 * This shows how to structure page objects for maintainability
 */
export class ExamplePage extends BasePage {
  // Locators defined as properties
  readonly heading: Locator;
  readonly content: Locator;
  readonly links: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = this.page.getByRole('heading');
    this.content = this.page.locator('body');
    this.links = this.page.getByRole('link');
  }

  /**
   * Navigate to the Example Domain
   */
  async navigateToExampleDomain(): Promise<void> {
    await this.goto('https://example.com');
  }

  /**
   * Get all heading texts on the page
   * @returns Array of heading texts
   */
  async getAllHeadings(): Promise<string[]> {
    const headings = await this.heading.all();
    const texts: string[] = [];
    
    for (const heading of headings) {
      const text = await heading.textContent();
      if (text) {
        texts.push(text.trim());
      }
    }
    
    return texts;
  }

  /**
   * Get the count of links on the page
   * @returns Number of links
   */
  async getLinkCount(): Promise<number> {
    return await this.links.count();
  }

  /**
   * Check if page contains specific text
   * @param text - Text to search for
   * @returns True if text is found
   */
  async pageContainsText(text: string): Promise<boolean> {
    return await this.content.locator(`text="${text}"`).isVisible();
  }

  /**
   * Verify page title matches expected value
   * @param expectedTitle - Expected page title
   * @returns True if title matches
   */
  async verifyPageTitle(expectedTitle: string): Promise<boolean> {
    const title = await this.getTitle();
    return title === expectedTitle;
  }
}
