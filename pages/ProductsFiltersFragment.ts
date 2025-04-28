import { expect, Locator, Page } from '@playwright/test';

export enum Category {
    Sander = 'Sander',
    HandTools = 'Hand Tools',
    PowerTools = 'Power Tools',
    Other = 'Other'
}

export class ProductsFiltersFragment {
    page: Page;
    sortDropdown: Locator;
    productTitles: Locator;
    productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortDropdown = page.getByTestId('sort');
        this.productTitles = page.getByTestId('product-name');
        this.productPrices = page.getByTestId('unit-price');
    }

    async selectSortOption(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getProductPrices(): Promise<number[]> {
        const texts = await this.productPrices.allInnerTexts();
        return texts.map((text) => parseFloat(text.replace('$', '').trim()));
    }

    async filterByCategory(categoryName: string): Promise<void> {
        const category = this.page.getByText(categoryName);
        await category.waitFor({state:'visible', timeout: 10000})
        await category.click();
        await this.page.waitForLoadState('networkidle');

    }

    async getProductNames(): Promise<string[]> {
        return this.productTitles.allInnerTexts();
    }

    async clickProductCardByName(productName: string) {
        await this.productTitles.filter({ hasText: productName }).click();
    }
}
