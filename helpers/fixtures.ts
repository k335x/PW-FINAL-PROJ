import {Page, test as base} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { HomePage } from '../pages/homePage';
import { ProductPage } from '../pages/productPage';
import { ProductsFiltersFragment } from '../pages/ProductsFiltersFragment';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PaymentPage } from  '../pages/PaymentPage';
import 'dotenv/config';

type Fixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    productsFiltersFragment: ProductsFiltersFragment;
    loggedInPage: {
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

    productsFiltersFragment: async ({ page }, use) => {
        await use(new ProductsFiltersFragment(page));
    },

    loggedInPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);

        await page.goto('/auth/login');
        await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

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
