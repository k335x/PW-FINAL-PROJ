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
        this.sortDropdown = page.locator('[data-test="sort"]');
        this.productTitles = page.locator('[data-test="product-name"]');
        this.productPrices = page.locator('[data-test="unit-price"]');
    }

    async selectSortOption(option: string) {
        await this.sortDropdown.selectOption(option);
    }

    async getProductPrices(): Promise<number[]> {
        const texts = await this.page.locator('[data-test="unit-price"]').allInnerTexts();
        return texts.map((text) => parseFloat(text.replace('$', '').trim()));
    }

    async filterByCategory(categoryName: string): Promise<void> {
        const category = this.page.getByText(categoryName);
        await category.waitFor({state:'visible', timeout: 10000})
        await category.click();
        await this.page.waitForLoadState('networkidle');

    }

    async getProductNames(): Promise<string[]> {
        return this.page.locator('[data-test="product-name"]').allInnerTexts();
    }

    sortNames(values: string[], order: 'asc' | 'desc'): string[] {
        const sorted = [...values];
        return order === 'asc'
            ? sorted.sort((a, b) => a.localeCompare(b))
            : sorted.sort((a, b) => b.localeCompare(a));
    }

    sortPrices(values: number[], order: 'asc' | 'desc'): number[] {
        const sorted = [...values];
        return order === 'asc'
            ? sorted.sort((a, b) => a - b)
            : sorted.sort((a, b) => b - a);
    }
}
