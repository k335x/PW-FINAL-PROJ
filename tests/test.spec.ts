import { test, expect } from '@playwright/test';
import 'dotenv/config';

test('[Test1] Verify login with valid credentials', async ({ page }) => {
    await page.goto('/auth/login');
    await page.locator('[data-test="email"]').click();
    await page.fill('#email', process.env.USER_EMAIL!);
    await page.locator('[data-test="password"]').click();
    await page.fill('#password', process.env.USER_PASSWORD!);
    await page.locator('[data-test="login-submit"]').click();
    await expect(page).toHaveURL('/auth/login');
    await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
    await expect(page.locator('[data-test="nav-menu"]')).toContainText(process.env.USER_NAME!);
});
test('[Test 2] Verify user can view product details', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', {name: 'Combination Pliers'}).click();
    await expect(page).toHaveURL(/.*product.*/);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
    await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
});
test('[Test 3] Verify user can add product to cart', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', {name: 'Slip Joint Pliers'}).click();
    await expect(page).toHaveURL(/.*product.*/);
    await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');

    await page.locator('[data-test="add-to-cart"]').click();
    await expect(page.getByRole('alert', { name: 'Product added to shopping' })).toBeVisible();
    await expect(page.locator('#alert')).toBeHidden({ timeout: 8000 });
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');

    await page.locator('[data-test="nav-cart"]').click();
    await expect(page).toHaveURL('/checkout');
    await expect(page.locator('[data-test="product-quantity"]')).toBeVisible();
    await expect(page.locator('tbody')).toContainText('1');
    await expect(page.getByRole('cell', { name: 'Slip Joint Pliers', exact: true })).toBeVisible();
    await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();
});