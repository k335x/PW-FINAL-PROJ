import {ProductsFiltersFragment} from "../pages/ProductsFiltersFragment";
import { test, expect } from '../helpers/fixtures';


test('Mock test', async ({  homePage, page }) => {
    const productsFiltersFragment = new ProductsFiltersFragment(page);

    await test.step('Mock API response', async () => {
        await homePage.mockProductsResponse(20);
    });

    await test.step('Navigate to main page', async () => {
        await homePage.navigateTo();
    });

    await test.step('Verify that 20 product titles are rendered', async () => {
        await expect(productsFiltersFragment.productTitles).toHaveCount(20);
    });
});