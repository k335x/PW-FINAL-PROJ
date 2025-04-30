import 'dotenv/config';
import { test, expect } from '../helpers/fixtures';

test('[Test1] Verify login with valid credentials', async ({ loggedInPage }) => {
    const { page, homePage} = loggedInPage;

    await expect(page).toHaveURL('/account');
    await expect(homePage.getPageTitleLocator()).toContainText('My account');
    await expect(homePage.getNameInMenuLocator()).toContainText(process.env.USER_NAME!);
});
test('[Test 2] Verify user can view product details', async ({ page, homePage, productPage }) => {
    await page.goto('/');

    await homePage.filters.clickProductCardByName('Combination Pliers');
    await expect(page).toHaveURL(/.*product.*/);

    await expect(productPage.checkPriceForProducts()).toContainText('14.15')
    await productPage.clickAddToFavorites();
    await productPage.clickAddToCart();
});
test('[Test 3] Verify user can add product to cart', async ({ page, homePage, productPage }) => {
    await page.goto('/');

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