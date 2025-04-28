import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { ProductsFiltersFragment, Category } from '../pages/ProductsFiltersFragment';
import { sortNames, sortPrices } from '../helpers/sortUtils';
import {HomePage} from "../pages/homePage";

const sortCases = [
    { option: 'name,asc', description: 'A - Z' },
    { option: 'name,desc', description: 'Z - A' },
];

for (const { option, description } of sortCases) {
    test(`Verify sorting by Name (${description})`, async ({ page }) => {
        const homePage = new HomePage(page);
        await page.goto('/');
        await homePage.filters.selectSortOption(option);

        const names = await homePage.filters.getProductNames();

        const order = option.split(',')[1] as 'asc' | 'desc';
        const expected = sortNames(names, order);

        expect(names).toEqual(expected);
    });
}

const priceSortCases = [
    { option: 'price,asc', description: 'Low - High' },
    { option: 'price,desc', description: 'High - Low' },
];

for (const { option, description } of priceSortCases) {
    test(`Verify sorting by Price (${description})`, async ({ page }) => {
        const homePage = new HomePage(page);
        await page.goto('/');

        await homePage.filters.selectSortOption(option);
        const prices = await homePage.filters.getProductPrices();
        const expected = sortPrices(prices, 'desc');


        expect(prices).toEqual(expected);
    });
}

test('Verify user can filter products by category: Sander', async ({ page }) => {
    const homePage = new HomePage(page);
    await page.goto('/');
    await homePage.filters.filterByCategory(Category.Sander);
    const names = await homePage.filters.getProductNames();

    for (const name of names) {
        expect(name.toLowerCase()).toContain('sander');
    }
});
