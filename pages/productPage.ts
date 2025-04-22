import {expect, Locator, Page} from "@playwright/test";

export class ProductPage {
    page: Page;
    productPrice: Locator;
    buttonAddToFavorites: Locator;
    buttonAddToCart: Locator;
    cartQuantity: Locator;
    productQuantity: Locator;
    buttonProceedToCheckout: Locator;
    constructor(page:Page) {
        this.page = page;
        this.productPrice = this.page.locator('[data-test="unit-price"]');
        this.buttonAddToFavorites = this.page.locator('[data-test="add-to-favorites"]');
        this.buttonAddToCart = this.page.locator('[data-test="add-to-cart"]');
        this.cartQuantity = this.page.locator('[data-test="cart-quantity"]');
        this.productQuantity = this.page.locator('[data-test="product-quantity"]');
        this.buttonProceedToCheckout = this.page.locator('[data-test="proceed-1"]');
    }

    async checkPriceForCombinationPliers() {
        const expectedPrice = '14.15';
        await expect(this.productPrice).toContainText(expectedPrice);
    }

    async checkPriceForSlipJointPliers () {
        const expectedPrice = '9.17';
        await expect(this.productPrice).toContainText(expectedPrice);
    }

    async clickAddToFavorites () {
        await expect(this.buttonAddToFavorites).toBeVisible();
        await this.buttonAddToFavorites.click();
    }

    async clickAddToCart () {
        await expect(this.buttonAddToCart).toBeVisible();
        await this.buttonAddToCart.click();
    }

    async expectAddToCartAlert() {
        await expect(this.page.getByRole('alert', { name: 'Product added to shopping' })).toBeVisible();
        await expect(this.page.locator('#alert')).toBeHidden({ timeout: 8000 });
    }

    async checkCartQuantity() {
        const number = '1';
        await expect(this.cartQuantity).toContainText(number);
    }

    async checkProductQuantityInCheckout() {
        await expect(this.productQuantity).toBeVisible();
        await expect(this.productQuantity).toHaveValue('1');
    }

    async checkProductNameInCheckout() {
        await expect(this.page.getByRole('cell', { name: 'Slip Joint Pliers', exact: true })).toBeVisible();
    }

    async checkButtonProceedToCheckout() {
        await expect(this.buttonProceedToCheckout).toBeVisible();
    }
}