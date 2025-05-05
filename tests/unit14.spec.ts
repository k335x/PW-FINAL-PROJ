
import {HomePage} from "../pages/homePage";
import {ProductsFiltersFragment} from "../pages/ProductsFiltersFragment";
import { test, expect } from '../helpers/fixtures';


test('Mock test', async ({  homePage, page }) => {
    // const homePage = new HomePage(page);
    const productsFiltersFragment = new ProductsFiltersFragment(page);
    // const { homePage } = loggedInApp;
    await homePage.mockProductsResponse(20);
    await homePage.navigateTo();

    await expect(productsFiltersFragment.productTitles).toHaveCount(20);
});