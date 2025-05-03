import {expect, test} from "playwright/test";
import {HomePage} from "../pages/homePage";


test('Mock test', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.mockProductsResponse(20);
    await homePage.navigateTo();

    const actualCount = await homePage.getProductCardCount();
    expect(actualCount).toBe(20);
});