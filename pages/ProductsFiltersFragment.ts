import { expect, Locator, Page } from '@playwright/test';

export enum Category {
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
        this.sortDropdown = page.locator('[data-test="sort"]');
        this.productTitles = page.locator('[data-test="product-name"]');
        this.productPrices = page.locator('[data-test="unit-price"]');
    }

    async selectSortOption(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getProductNames(): Promise<string[]> {
        return await this.productTitles.allInnerTexts();
    }

    async getProductPrices(): Promise<number[]> {
        const texts = await this.productPrices.allInnerTexts();
        return texts.map(t => parseFloat(t.replace('$', '')));
    }

    async filterByCategory(categoryName: string): Promise<void> {
        const category = this.page.getByText(categoryName);
        await expect(category).toBeVisible({ timeout: 10000 });
        await category.click();
        await this.page.waitForLoadState('networkidle');

    }
}
