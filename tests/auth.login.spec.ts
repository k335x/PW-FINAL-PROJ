import {test, expect} from "../helpers/fixtures";
import {LoginPage} from "../pages/loginPage";
import {HomePage} from "../pages/homePage";

test('Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    const  homePage = new HomePage(page);

    await page.goto('/auth/login');
    await loginPage.login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL('/account');
    await expect(homePage.getPageTitleLocator()).toContainText('My account');
    await expect(homePage.getNameInMenuLocator()).toContainText(process.env.USER_NAME!);

    await page.context().storageState({path: 'auth/user.json'});
});