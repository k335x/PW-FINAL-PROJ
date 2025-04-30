import { test, expect } from '../helpers/fixtures';
import 'dotenv/config';

    test('Product purchase verification', async ({ loggedInPage, productPage, cartPage, checkoutPage, paymentPage }) => {
        const {page, homePage} = loggedInPage;

        await page.waitForTimeout(1000);

        await page.goto('/');
        await homePage.filters.clickProductCardByName('Combination Pliers');

        const name = await productPage.getFirstProductName();
        const price = await productPage.getFirstProductPrice();

        await productPage.clickAddToCart();
        await productPage.goToCart();

        await expect(productPage.getProductInCheckout(name!)).toBeVisible();

        await expect(cartPage.checkPriceForProducts()).toContainText(price!);
        await expect(cartPage.checkTotalPriceForProducts()).toContainText('$14.15');

        await productPage.getProceedToCheckoutButton().click();

        await expect(checkoutPage.checkUserAlreadyLoggedIn()).toContainText(`Hello ${process.env.USER_NAME!}, you are already logged in. You can proceed to checkout.`);

        await checkoutPage.clickToTheButtonProceed().click();

        await checkoutPage.fillBillingAddress(process.env.BILLING_ADDRESS_STATE!, process.env.BILLING_ADDRESS_POSTCODE!);

        await paymentPage.fillCreditCardForm(process.env.CREDIT_CARD_NUMBER!, process.env.EXPIRATION_DATE!, process.env.CVV!, process.env.CARD_HOLDER_NAME!);
        await expect(paymentPage.checkThatThePaymentSuccessful()).toContainText('Payment was successful');
    });