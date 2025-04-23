import { test, expect } from '@playwright/test';
import 'dotenv/config';
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";
import {ProductPage} from "../pages/productPage";

test('[Test1] Verify login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await page.goto('/auth/login');
    await loginPage.login( process.env.USER_EMAIL!, process.env.USER_PASSWORD!);

    await expect(page).toHaveURL('/account');
    await homePage.checkPageTitle('My account');
    await homePage.checkNameInMenu(process.env.USER_NAME!);
});
test('[Test 2] Verify user can view product details', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await page.goto('/');

    await homePage.clickProductCardCombinationPliers('Combination Pliers');
    await expect(page).toHaveURL(/.*product.*/);

    await productPage.checkPriceForCombinationPliers('14.15');
    await productPage.clickAddToFavorites();
    await productPage.clickAddToCart();
});
test('[Test 3] Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await page.goto('https://practicesoftwaretesting.com');
    await homePage.clickProductCardSlipJointPliers('Slip Joint Pliers');
    await expect(page).toHaveURL(/.*product.*/);
    await productPage.checkPriceForSlipJointPliers('9.17');
    await productPage.clickAddToCart();
    await productPage.expectAddToCartAlert();

    await productPage.checkCartQuantity('1');

    await page.locator('[data-test="nav-cart"]').click();
    await expect(page).toHaveURL(/.*checkout.*/);

    await productPage.checkProductQuantityInCheckout('1');

    await expect(productPage.checkProductNameInCheckout('Slip Joint Pliers')).toBeVisible();
    await productPage.checkButtonProceedToCheckout();
});