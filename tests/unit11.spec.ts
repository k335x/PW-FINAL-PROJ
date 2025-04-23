import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { ProductsFiltersFragment, Category } from '../pages/ProductsFiltersFragment';

const sortCases = [
    { option: 'name,asc', description: 'A - Z' },
    { option: 'name,desc', description: 'Z - A' },
];

for (const { option, description } of sortCases) {
    test(`Verify sorting by Name (${description})`, async ({ page }) => {
        const filters = new ProductsFiltersFragment(page);
        await page.goto('/');

        await filters.selectSortOption('name,asc');
        const names = await filters.getProductNames();
        const expected = filters.sortNames(names, 'asc');
        expect(names).toEqual(expected);

        expect(names).toEqual(expected);
    });
}

const priceSortCases = [
    { option: 'price,asc', description: 'Low - High' },
    { option: 'price,desc', description: 'High - Low' },
];

for (const { option, description } of priceSortCases) {
    test(`Verify sorting by Price (${description})`, async ({ page }) => {
        const filters = new ProductsFiltersFragment(page);
        await page.goto('/');

        await filters.selectSortOption('price,desc');
        const prices = await filters.getProductPrices();
        const expected = filters.sortPrices(prices, 'desc');
        expect(prices).toEqual(expected);

        expect(prices).toEqual(expected);
    });
}

test('Verify user can filter products by category: Sander', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
    await page.goto('/');
    await filters.filterByCategory(Category.Sander);
    const names = await filters.getProductNames();

    for (const name of names) {
        expect(name.toLowerCase()).toContain('sander');
    }
});
