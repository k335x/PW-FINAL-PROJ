import 'dotenv/config';
import { test, expect } from '../helpers/fixtures';

test('[Test 1] Verify user can view product details', async ({ page, homePage, productPage }) => {
    await homePage.navigateTo();

    await homePage.filters.clickProductCardByName('Combination Pliers');
    await expect(page).toHaveURL(/.*product.*/);

    await expect(productPage.checkPriceForProducts()).toContainText('14.15')
    await productPage.clickAddToFavorites();
    await productPage.clickAddToCart();
});
test('[Test 2] Verify user can add product to cart', async ({ page, homePage, productPage }) => {
    await homePage.navigateTo();

    await homePage.filters.clickProductCardByName('Slip Joint Pliers');
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