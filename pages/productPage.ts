import { Locator, Page } from "@playwright/test";

export class ProductPage {
    page: Page;
    productPrice: Locator;
    productName: Locator;
    buttonAddToFavorites: Locator;
    buttonAddToCart: Locator;
    cartQuantity: Locator;
    productQuantity: Locator;
    buttonProceedToCheckout: Locator;
    alertMessage: Locator;
    alertLocator: Locator;
    navCartLink: Locator;
    constructor(page:Page) {
        this.page = page;
        this.productPrice = this.page.locator('[data-test="unit-price"]');
        this.buttonAddToFavorites = this.page.locator('[data-test="add-to-favorites"]');
        this.buttonAddToCart = this.page.locator('[data-test="add-to-cart"]');
        this.cartQuantity = this.page.locator('[data-test="cart-quantity"]');
        this.productQuantity = this.page.locator('[data-test="product-quantity"]');
        this.buttonProceedToCheckout = this.page.locator('[data-test="proceed-1"]');
        this.alertMessage = this.page.getByRole('alert', { name: 'Product added to shopping' });
        this.alertLocator = this.page.locator('#alert');
        this.navCartLink = page.locator('[data-test="nav-cart"]');
        this.productName = this.page.locator('[data-test="product-name"]')
    }

    checkPriceForProducts() {
        return this.productPrice;
    }

    async clickAddToFavorites() {
        await this.buttonAddToFavorites.waitFor({ state: 'visible' });
        await this.buttonAddToFavorites.click();
    }

    async clickAddToCart() {
        await this.buttonAddToCart.waitFor({ state: 'visible' });
        await this.buttonAddToCart.click();
    }


    async waitForAddToCartAlert() {
        await this.alertMessage.waitFor({ state: 'visible' });
        await this.alertLocator.waitFor({ state: 'hidden', timeout: 8000 });
    }

    getCartQuantityLocator(): Locator {
        return this.cartQuantity;
    }

    getProductQuantityLocator(): Locator {
        return this.productQuantity;
    }

    getProductInCheckout(name: string) {
        return this.page.getByRole('cell', { name, exact: true });
    }

    getProceedToCheckoutButton(): Locator {
        return this.buttonProceedToCheckout;
    }

    async goToCart(){
        await this.navCartLink.click();
    }

    async getFirstProductName() {
        return await this.productName.first().textContent();
    }

    async getFirstProductPrice() {
       return await this.productPrice.first().textContent();
    }
}