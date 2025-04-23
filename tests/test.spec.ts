import { test, expect } from '@playwright/test';
import 'dotenv/config';
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {ProductPage} from "../pages/productPage";
import { ProductsFiltersFragment } from '../pages/ProductsFiltersFragment';

test('[Test1] Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto('/auth/login');
    await loginPage.login( process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page).toHaveURL('/account');
    await expect(homePage.getPageTitleLocator()).toContainText('My account');
    await expect(homePage.getNameInMenuLocator()).toContainText(process.env.USER_NAME!);
});
test('[Test 2] Verify user can view product details', async ({ page }) => {
    const productPage = new ProductPage(page);
    const productsFiltersFragment = new ProductsFiltersFragment(page);

    await page.goto('/');

    await productsFiltersFragment.clickProductCardByName('Combination Pliers');
    await expect(page).toHaveURL(/.*product.*/);

    await expect(productPage.checkPriceForProducts()).toContainText('14.15')
    await productPage.clickAddToFavorites();
    await productPage.clickAddToCart();
});
test('[Test 3] Verify user can add product to cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    const productsFiltersFragment = new ProductsFiltersFragment(page);

    await page.goto('/');
    await productsFiltersFragment.clickProductCardByName('Slip Joint Pliers');
    await expect(page).toHaveURL(/.*product.*/);
    await expect(productPage.checkPriceForProducts()).toContainText('9.17');
    await productPage.clickAddToCart();
    await productPage.waitForAddToCartAlert();

    await expect(productPage.getCartQuantityLocator()).toContainText('1');

    await productPage.goToCart();
    await expect(page).toHaveURL(/.*checkout.*/);

    await expect(productPage.getProductQuantityLocator()).toHaveValue('1');

    await expect(productPage.getProductInCheckout('Slip Joint Pliers')).toBeVisible();
    await expect(productPage.getProceedToCheckoutButton()).toBeVisible();
});