import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { ProductsFiltersFragment } from '../pages/ProductsFiltersFragment';

test('Verify sorting by Name (A - Z)', async ({ page }) => {
    const productsFiltersFragment = new ProductsFiltersFragment(page);
    await page.goto('/');

    await productsFiltersFragment.selectSortOption('name,asc');

    const names = await productsFiltersFragment.getProductNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sorted);
});

test('Verify sorting by Name (Z - A)', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
    await page.goto('/');

    await filters.selectSortOption('name,desc');

    const names = await filters.getProductNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));

    expect(names).toEqual(sorted);
});

test('Verify sorting by Price (Low - High)', async ({ page }) => {
    const productsFiltersFragment = new ProductsFiltersFragment(page);
    await page.goto('/');

    await productsFiltersFragment.selectSortOption('price,asc');

    const prices = await productsFiltersFragment.getProductPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
});

test('Verify sorting by Price (High - Low)', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
    await page.goto('/');

    await filters.selectSortOption('price,desc');

    const prices = await filters.getProductPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sorted);
});


test('Verify user can filter products by category: Sander', async ({ page }) => {
    const filters = new ProductsFiltersFragment(page);
    await page.goto('/');
    await filters.filterByCategory('Sander');
    const names = await filters.getProductNames();

    for (const name of names) {
        expect(name.toLowerCase()).toContain('sander');
    }
});
