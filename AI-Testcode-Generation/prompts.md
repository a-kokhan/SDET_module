You are a Senior QA Automation Engineer. Task: Extend the existing LoginPage class (import from pages/LoginPage.ts).Do not create a new LoginPage file.  Add a new method: - rememberMeCheckbox() → returns locator for the "Remember me" checkbox (data-testid="remember-me"). Update tests/e2e/login.spec.ts to:1) Open login page2) Fill email and password3) Click "Remember me" checkbox4) Submit5) Verify dashboard URL and avatar visibleRules: - Import LoginPage, do not recreate it. Create DashboardPage with locators for URL and avatar - Use the same Page Object pattern already applied in the project. - Use data-testid selectors only. - Follow project conventions: locators inside page classes, no raw selectors in tests. - Output with file headers.

Project & framework: - Stack: Playwright, TS

- Structure:   

- tests/login-positive-flows.spec.ts

- pages/LoginPage.ts - don't create a new one, import the existing one

- pages/HomePage.ts 

- fixtures/testData.ts 

Optional DOM context (outerHTML):
<form>
<label for="username">Username</label>
<input id="username" data-testid="username-input" />
<label for="password">Password</label>
<input id="password" data-testid="password-input" type="password" />
<button type="submit" data-testid="login-btn">Sign in</button>
</form> 

Task: 

1) AuthPage:    

- open()    

- username()    

- password()    

- submit()    

- errorMessage()    

- login(user, pass) 

2) HomePage:    

- avatar() 

3) Test (tests/login-positive-flows.spec.ts):    

- // Initialization: open login    

- // User actions: fill credentials, submit    

- // Verification: successful login → avatar visible    

- // User actions: invalid login    

- // Verification: error message visible


Project & framework:- Stack: {Playwright with TS

- Structure:

- tests/checkout.spec.ts

- pages/SearchPage.ts, 

-pages/ProductPage.ts, 

-pages/CartPage.ts, 

-pages/CheckoutPage.ts

-components/Header.ts

-fixtures/testData.ts

Optional DOM context (outerHTML):
<div data-testid="cart-summary">
<span data-testid="cart-total">$100</span>
<button data-testid="checkout-btn">Checkout</button>
</div>

Task:

1) SearchPage: queryInput(), submit(), productResult(name)

2) ProductPage: addToCart(), title(), price()

3) CartPage: items(), proceedToCheckout()

4) CheckoutPage: total(), placeOrder()

5) Header: cartBadge()

6) Test (checkout.spec):

- // Initialization: open search page

- // User actions: search, select product, add to cart

- // Verification: cart badge increments

- // User actions: proceed to checkout

- // Verification: total matches expected

Don't recreate already existing files, import them. 


Project & framework: 

- Stack: Playwright + TS

- Structure:   

- tests/search.spec.ts

- pages/SearchPage.ts 

-pages/ResultsPage.ts

Optional DOM context (outerHTML):<div role="list" data-testid="results"><div data-testid="result-item"><span class="title">Laptop</span><span class="price">$999</span></div></div> 

Task: 

1) SearchPage: queryInput(), submit(), applyFilter(filterName) 

2) ResultsPage: items(), titleOf(index), priceOf(index) 

3) Test (search.spec):    

- // Initialization: open search page    

- // User actions: type "Laptop", apply filter "Price < $1000"    

- // Verification: each result price < 1000


File to fix: // path: pages/CheckoutPage.ts 

placeOrder locator

Problem: Locator is outdated. The element now has data-testid="placeOrder-button". Our convention is to use stable selectors in Page Objects. 

Fix: - Replace locator with data-testid equivalent. - Keep class & method signatures unchanged.- Output corrected code only.
 