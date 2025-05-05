import { test as test, expect } from '../helpers/fixtures';

test('Login', async ({ homePage, loginPage, page}) => {

    await page.goto('/auth/login');
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL('/account');
    await expect(homePage.getPageTitleLocator()).toContainText('My account');
    await expect(homePage.getNameInMenuLocator()).toContainText(process.env.USER_NAME!);

    await page.context().storageState({path: 'auth/user.json'});
});