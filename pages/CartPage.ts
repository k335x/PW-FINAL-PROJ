import { Locator, Page } from "@playwright/test";

export class CartPage {
    page: Page;
    totalPrice: Locator;
    productsPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.totalPrice = this.page.getByTestId('cart-total');
        this.productsPrice = this.page.getByTestId('product-price');

    }

    getProductPriceLocator() {
        return this.productsPrice;
    }

    getTotalPriceLocator() {
        return this.totalPrice;
    }
}