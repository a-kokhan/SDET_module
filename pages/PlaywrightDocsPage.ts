import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Playwright Docs Page Object
 * Represents the Playwright documentation pages after navigation
 */
export class PlaywrightDocsPage extends BasePage {
  readonly docsUrl = 'https://playwright.dev/docs';

  // Locators for docs page
  readonly mainHeading: Locator;
  readonly docsSidebar: Locator;
  readonly introSection: Locator;

  constructor(page: Page) {
    super(page);
    this.mainHeading = this.page.getByRole('heading', { level: 1 });
    this.docsSidebar = this.page.locator('[class*="sidebar"], [class*="nav"]').first();
    this.introSection = this.page.getByText(/introduction|getting\s*started/i).first();
  }

  /**
   * Verify docs page is loaded
   * @returns True if main heading is visible
   */
  async isDocsPageLoaded(): Promise<boolean> {
    return await this.mainHeading.isVisible({ timeout: 5000 });
  }

  /**
   * Get the main heading text
   * @returns Heading text
   */
  async getMainHeadingText(): Promise<string> {
    return await this.mainHeading.textContent() || '';
  }

  /**
   * Verify sidebar navigation is visible
   * @returns True if sidebar is visible
   */
  async isSidebarVisible(): Promise<boolean> {
    return await this.docsSidebar.isVisible();
  }

  /**
   * Verify intro section exists
   * @returns True if intro section text is found
   */
  async hasIntroSection(): Promise<boolean> {
    return await this.introSection.isVisible().catch(() => false);
  }

  /**
   * Verify we're on docs page by checking URL
   * @returns True if URL contains /docs
   */
  isOnDocsPage(): boolean {
    return this.page.url().includes('/docs');
  }

  /**
   * Get current page URL
   * @returns Current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}
