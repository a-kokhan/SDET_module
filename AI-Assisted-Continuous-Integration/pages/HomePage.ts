import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page object for example.com
 * Demonstrates Page Object Model pattern with role-based locators
 */
export class HomePage extends BasePage {
  // Locators using role-based approach (Playwright best practice)
  readonly mainHeading: Locator;
  readonly learnMoreLink: Locator;
  readonly description: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = this.page.getByRole('heading', { level: 1 });
    this.learnMoreLink = this.page.getByRole('link', { name: 'Learn more' });
    this.description = this.page.locator('p').first();
  }

  /**
   * Navigate to the home page
   */
  async navigateToHome(): Promise<void> {
    await this.goto('https://example.com');
  }

  /**
   * Get the text of the main heading
   * @returns The heading text
   */
  async getMainHeadingText(): Promise<string> {
    return await this.mainHeading.textContent() || '';
  }

  /**
   * Verify the heading is visible
   * @returns True if heading is visible
   */
  async isMainHeadingVisible(): Promise<boolean> {
    return await this.mainHeading.isVisible();
  }

  /**
   * Click the "Learn more" link
   */
  async clickLearnMoreLink(): Promise<void> {
    await this.learnMoreLink.click();
  }

  /**
   * Get the description text
   * @returns The description text
   */
  async getDescriptionText(): Promise<string> {
    return await this.description.textContent() || '';
  }

  /**
   * Verify the page is loaded with expected content
   * @returns True if page is properly loaded
   */
  async isPageLoaded(): Promise<boolean> {
    await this.page.waitForLoadState('networkidle');
    return await this.mainHeading.isVisible();
  }
}
