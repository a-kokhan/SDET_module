import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Navigation Page Object for Playwright.dev
 * Encapsulates all navigation-related locators and methods
 * Follows Page Object Model pattern for maintainability and reusability
 */
export class NavigationPage extends BasePage {
  // Base URL constant
  readonly BASE_URL = 'https://playwright.dev/';
  readonly NAVIGATION_WAIT_TIMEOUT = 30000;

  // Navigation locators - header navigation
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly communityLink: Locator;

  // Navigation container locators
  readonly navigationContainer: Locator;
  readonly footerSection: Locator;

  constructor(page: Page) {
    super(page);

    // Define navigation container (main header navigation only - not footer)
    // Use specific role with name to avoid matching footer contentinfo in strict mode
    this.navigationContainer = this.page.getByRole('navigation', { name: 'Main' });
    this.footerSection = this.page.locator('footer');

    // Define specific navigation links with non-overlapping selectors
    // Using distinct patterns to avoid false matches
    this.docsLink = this.page.getByRole('link', { name: /getting\s*started/i });
    this.apiLink = this.page.getByRole('link', { name: /api\s*reference|api\s*docs|^api$/i });
    // Community links in footer - target Stack Overflow or Discord as community indicators
    this.communityLink = this.footerSection.getByRole('link', { name: /stack\s*overflow|discord/i });
  }

  /**
   * Navigate to Playwright.dev main page
   */
  async navigateToHome(): Promise<void> {
    await this.goto(this.BASE_URL);
  }

  /**
   * Wait for navigation to load (container visibility)
   * Prevents race conditions where navigation loads after initial page load
   */
  async waitForNavigationToLoad(): Promise<void> {
    await this.page.waitForLoadState('load');
    await this.navigationContainer.waitFor({ 
      state: 'visible', 
      timeout: this.NAVIGATION_WAIT_TIMEOUT 
    });
  }

  /**
   * Get the Docs/Getting Started link
   * @returns The docs link locator
   */
  getDocsLink(): Locator {
    return this.docsLink;
  }

  /**
   * Get the API link
   * @returns The API link locator
   */
  getApiLink(): Locator {
    return this.apiLink;
  }

  /**
   * Get the Community link
   * @returns The community link locator
   */
  getCommunityLink(): Locator {
    return this.communityLink;
  }

  /**
   * Verify Docs link is visible and enabled
   * @returns True if link is visible and enabled
   */
  async isDocsLinkVisible(): Promise<boolean> {
    return await this.docsLink.isVisible();
  }

  /**
   * Verify API link is visible and enabled
   * @returns True if link is visible and enabled
   */
  async isApiLinkVisible(): Promise<boolean> {
    const count = await this.apiLink.count();
    return count > 0 && (await this.apiLink.first().isVisible());
  }

  /**
   * Verify Community link is visible and enabled
   * @returns True if link is visible and enabled
   */
  async isCommunityLinkVisible(): Promise<boolean> {
    const count = await this.communityLink.count();
    return count > 0 && (await this.communityLink.first().isVisible());
  }

  /**
   * Get count of Docs links (should be > 0)
   * @returns Count of matching docs links
   */
  async getDocsLinkCount(): Promise<number> {
    return await this.docsLink.count();
  }

  /**
   * Get count of API links (should be > 0)
   * @returns Count of matching API links
   */
  async getApiLinkCount(): Promise<number> {
    return await this.apiLink.count();
  }

  /**
   * Get count of Community links (should be > 0)
   * @returns Count of matching community links
   */
  async getCommunityLinkCount(): Promise<number> {
    return await this.communityLink.count();
  }

  /**
   * Click Docs/Getting Started link
   */
  async clickDocsLink(): Promise<void> {
    await this.docsLink.click();
  }

  /**
   * Click Community link
   */
  async clickCommunityLink(): Promise<void> {
    await this.communityLink.first().click();
  }

  /**
   * Wait for URL to change after navigation
   * @param expectedUrlPattern - Pattern the URL should match
   * @param timeout - Maximum wait time in milliseconds
   */
  async waitForUrlChange(
    expectedUrlPattern: (url: URL) => boolean,
    timeout: number = 10000
  ): Promise<void> {
    await this.page.waitForURL(expectedUrlPattern, { timeout });
  }

  /**
   * Go back to previous page
   */
  async goBack(): Promise<void> {
    await this.page.goBack();
  }

  /**
   * Wait for page to return to home URL
   */
  async waitForHomeUrl(): Promise<void> {
    await this.page.waitForURL(this.BASE_URL, { timeout: 10000 });
  }

  /**
   * Get console errors from page
   * Should be called after setting up console listener
   */
  async getConsoleErrors(): Promise<string[]> {
    return (this.page as any).consoleErrors || [];
  }

  /**
   * Get currently focused element text
   * Used for keyboard navigation testing
   */
  async getFocusedElementText(): Promise<string> {
    return await this.page.evaluate(() => {
      const focused = document.activeElement as HTMLElement;
      return focused?.textContent || '';
    });
  }

  /**
   * Verify keyboard can reach navigation elements
   * @returns True if navigation elements are keyboard accessible
   */
  async verifyKeyboardNavigation(): Promise<boolean> {
    // Start from top of page
    await this.page.keyboard.press('Home');

    // Tab through elements to find navigation
    for (let i = 0; i < 20; i++) {
      await this.page.keyboard.press('Tab');
      const focusedText = await this.getFocusedElementText();

      // Check if we found navigation-related elements
      if (focusedText.match(/getting\s*started|docs|api|community/i)) {
        return true;
      }
    }

    return false;
  }

  /**
   * Monitor console for errors
   * Call this in beforeEach hook
   */
  monitorConsoleErrors(): void {
    const consoleErrors: string[] = [];
    
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Store errors on page object for retrieval
    (this.page as any).consoleErrors = consoleErrors;
  }

  /**
   * Get critical console errors (excluding known non-critical ones)
   * @returns Array of critical error messages
   */
  async getCriticalConsoleErrors(): Promise<string[]> {
    const errors = await this.getConsoleErrors();
    return errors.filter((err: string) => 
      !err.includes('favicon') && 
      !err.includes('Service Worker')
    );
  }
}
