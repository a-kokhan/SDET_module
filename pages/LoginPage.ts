class LoginPage {


  constructor(page) {

    this.page = page;

    this.usernameInput = page.locator('#username');

    this.passwordInput = page.locator('#password');

    this.submitButton = page.locator('button[type=submit]');

    this.errorMessage = page.locator('.error');

  }

  async goto() {

    await this.page.goto('/login');

  }

  async login(user, pass) {

    await this.usernameInput.fill(user);

    await this.passwordInput.fill(pass);

    await this.submitButton.click();

  }

  async getError() {

    return this.errorMessage.textContent();

  }
}

module.exports = { LoginPage };
