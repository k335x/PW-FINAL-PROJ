import {expect, Locator, Page} from "@playwright/test";

export class HomePage {
    page: Page;
    productCardName: Locator;
    pageTitleName: Locator;
    nameInMenu: Locator;
    constructor(page:Page) {
        this.page = page;
        this.productCardName = this.page.locator('[data-test="product-name"]');
        this.pageTitleName =  this.page.locator('[data-test="page-title"]');
        this.nameInMenu =  this.page.locator('[data-test="nav-menu"]');
    }

    async clickProductCardCombinationPliers (productName: string) {
        await this.productCardName.filter({ hasText: productName }).click();

    }

    async clickProductCardSlipJointPliers (productName: string) {
        await this.productCardName.filter({ hasText: productName }).click();
    }

    async checkPageTitle(title:string) {
        await expect(this.pageTitleName).toContainText(title);
    }

    async checkNameInMenu(name: string) {
        await expect(this.nameInMenu).toContainText(name);
    }
}