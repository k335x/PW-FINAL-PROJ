import {expect, Locator, Page} from "@playwright/test";

export class HomePage {
    page: Page;
    productCardName: Locator;
    constructor(page:Page) {
        this.page = page;
        this.productCardName = this.page.locator('[data-test="product-name"]');
    }

    async clickProductCardCombinationPliers () {
        const productName = 'Combination Pliers';
        await this.productCardName.filter({ hasText: productName }).click();

    }

    async clickProductCardSlipJointPliers () {
        const productName = 'Slip Joint Pliers';
        await this.productCardName.filter({ hasText: productName }).click();
    }
}