import 'dotenv/config';
import { Category } from '../pages/ProductsFiltersFragment';
import { sortNames, sortPrices } from '../helpers/sortUtils';
import { test, expect } from '../helpers/fixtures';

const sortCases = [
    { option: 'name,asc', description: 'A - Z' },
    { option: 'name,desc', description: 'Z - A' },
];

for (const { option, description } of sortCases) {
    test(`Verify sorting by Name (${description})`, {tag: '@smoke'}, async ({ homePage }) => {

        await test.step('Navigate to main page', async () => {
            await homePage.navigateTo();
        });

        await test.step(`Select sort option "${description}"`, async () => {
            await homePage.filters.selectSortOption(option);
        });


        const names = await test.step('Get all product names', async () => {
            return await homePage.filters.getProductNames();
        });

        const expected = await test.step('Sort names locally for comparison', async () => {
            const order = option.split(',')[1] as 'asc' | 'desc';
            return sortNames(names, order);
        });

        await test.step('Compare UI names with expected sorted names', async () => {
            expect(names).toEqual(expected);
        });
    });
}

const priceSortCases = [
    { option: 'price,asc', description: 'Low - High' },
    { option: 'price,desc', description: 'High - Low' },
];

for (const { option, description } of priceSortCases) {
    test(`Verify sorting by Price (${description})`, {tag: '@smoke'}, async ({ homePage }) => {

        await test.step('Navigate to main page', async () => {
            await homePage.navigateTo();
        });

        await test.step(`Select sort option "${description}"`, async () => {
            await homePage.filters.selectSortOption(option);
        });

        const prices = await test.step('Get all product prices', async () => {
            return await homePage.filters.getProductPrices();
        });

        const expected = await test.step('Sort prices locally for comparison', async () => {
            const order = option.split(',')[1] as 'asc' | 'desc';
            return sortPrices(prices, order);
        });

        await test.step('Compare UI prices with expected sorted prices', async () => {
            expect(prices).toEqual(expected);
        });
    });
}

test('Verify user can filter products by category: Sander', {tag: '@smoke'}, async ({ homePage }) => {

    await test.step('Navigate to main page', async () => {
        await homePage.navigateTo();
    });

    await test.step('Filter products by category: Sander', async () => {
        await homePage.filters.filterByCategory(Category.Sander);
    });

    const names = await test.step('Get all product names after filtering', async () => {
        return await homePage.filters.getProductNames();
    });

    await test.step('Verify all names contain "sander"', async () => {
        for (const name of names) {
            expect(name.toLowerCase()).toContain('sander');
        }
    });
});
