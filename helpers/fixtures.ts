import {Page, test as base} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from '../pages/PaymentPage';
import path from 'node:path';
import 'dotenv/config';
import {ProductsFiltersFragment} from "../pages/ProductsFiltersFragment";

type Fixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    paymentPage: PaymentPage;
    productsFiltersFragment: ProductsFiltersFragment;
};

type LoggedInFixtures = Fixtures & {
    loggedInApp: {
        page: Page;
        homePage: HomePage;
    };
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

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    paymentPage: async ({ page }, use) => {
        await use(new PaymentPage(page));
    },

    productsFiltersFragment: async ({ page }, use) => {
        await use(new ProductsFiltersFragment(page));
    },
});

export const loggedInTest = base.extend<LoggedInFixtures>({
    loggedInApp: async ({ browser }, use) => {
        const context = await browser.newContext({storageState: path.join(process.cwd(), 'auth', 'user.json'),});
        const page = await context.newPage();
        const homePage = new HomePage(page);
        await use({ page, homePage });
        await context.close();
    },

    loginPage: async ({ loggedInApp }, use) => {
        await use(new LoginPage(loggedInApp.page));
    },

    homePage: async ({ loggedInApp }, use) => {
        await use(new HomePage(loggedInApp.page));
    },

    productPage: async ({ loggedInApp }, use) => {
        await use(new ProductPage(loggedInApp.page));
    },

    cartPage: async ({ loggedInApp }, use) => {
        await use(new CartPage(loggedInApp.page));
    },

    checkoutPage: async ({ loggedInApp }, use) => {
        await use(new CheckoutPage(loggedInApp.page));
    },

    paymentPage: async ({ loggedInApp }, use) => {
        await use(new PaymentPage(loggedInApp.page));
    },
});

export { expect } from '@playwright/test';
