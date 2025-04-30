import { Locator, Page } from "@playwright/test";

export class CartPage {
    page: Page;
    totalPrice: Locator;
    productsPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.totalPrice = this.page.locator('[data-test="cart-total"]');
        this.productsPrice = this.page.locator('[data-test="product-price"]');

    }

    checkPriceForProducts() {
        return this.productsPrice;
    }

    checkTotalPriceForProducts() {
        return this.totalPrice;
    }
}