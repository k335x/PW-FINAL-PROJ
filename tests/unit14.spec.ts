import {expect, test} from "playwright/test";
import {HomePage} from "../pages/homePage";


test('Mock test', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.mockProductsResponse(20);
    await homePage.navigateTo();

    await expect(homePage.productCards).toHaveCount(20);
});