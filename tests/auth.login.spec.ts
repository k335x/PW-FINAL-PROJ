import { test as test, expect } from '../helpers/fixtures';

test('Login', {tag: '@smoke'}, async ({ homePage, loginPage, page}) => {
    await test.step('Navigate to login page', async () => {
        await loginPage.navigateToLoginPage();
    });

    await test.step('Login with credentials', async () => {
        await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    });

    await test.step('Check if redirected to /account', async () => {
        await expect(page).toHaveURL('/account');
    });

    await test.step('Check user info is displayed', async () => {
        await expect(homePage.getPageTitleLocator()).toContainText('My account');
        await expect(homePage.getNameInMenuLocator()).toContainText(process.env.USER_NAME!);
    });

    await test.step('Save auth information', async () => {
        await page.context().storageState({path: 'auth/user.json'});
    });
});