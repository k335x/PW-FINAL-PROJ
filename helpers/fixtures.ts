import {Page, test as base} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from  '../pages/PaymentPage';
import 'dotenv/config';

type Fixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    loggedInApp: {
        page: Page;
        homePage: HomePage;
    }
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage;
};

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },

    loggedInApp: async ({ browser }, use) => {
        const context = await browser.newContext({ storageState: 'auth/user.json' });
        const page = await context.newPage();
        const homePage = new HomePage(page);
        await use({ page, homePage });
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    paymentPage: async ({ page }, use) => {
        await  use(new PaymentPage(page));
    }
});

export { expect } from '@playwright/test';
