import 'dotenv/config';
import { test, expect } from '../helpers/fixtures';

test('[Test 1] Verify user can view product details', async ({ page, homePage, productPage }) => {

    await test.step('Navigate to main page', async () => {
        await homePage.navigateTo();
    });

    await test.step('Click on "Combination Pliers" product card', async () => {
        await homePage.filters.clickProductCardByName('Combination Pliers');
    });

    await test.step('Verify product page and price', async () => {
        await expect(page).toHaveURL(/.*product.*/);
        await expect(productPage.checkPriceForProducts()).toContainText('14.15')
    });

    await test.step('Add product to favorites', async () => {
        await productPage.clickAddToFavorites();
    });

    await test.step('Add product to cart', async () => {
        await productPage.clickAddToCart();
    });
});
test('[Test 2] Verify user can add product to cart', async ({ page, homePage, productPage }) => {

    await test.step('Navigate to main page', async () => {
        await homePage.navigateTo();
    });

    await test.step('Click on "Slip Joint Pliers" product card', async () => {
        await homePage.filters.clickProductCardByName('Slip Joint Pliers');
    });

    await test.step('Verify product page and price', async () => {
        await expect(page).toHaveURL(/.*product.*/);
        await expect(productPage.checkPriceForProducts()).toContainText('9.17');
    });

    await test.step('Add product to cart', async () => {
        await productPage.clickAddToCart();
    });

    await test.step('Check alert after adding to cart', async () => {
        await productPage.waitForAddToCartAlert();
    });

    await test.step('Checking product quantity', async () => {
        await expect(productPage.getCartQuantityLocator()).toContainText('1');
    });

    await test.step('Navigate to card page', async () => {
        await productPage.goToCart();
    });

    await test.step('Checking cart ', async () => {
        await expect(page).toHaveURL(/.*checkout.*/);
        await expect(productPage.getProductQuantityLocator()).toHaveValue('1');
        await expect(productPage.getProductInCheckout('Slip Joint Pliers')).toBeVisible();
        await expect(productPage.getProceedToCheckoutButton()).toBeVisible();
    });
});