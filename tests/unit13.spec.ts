import { loggedInTest as test, expect } from '../helpers/fixtures';
import 'dotenv/config';

test('Product purchase verification', {tag: '@smoke'}, async ({ loggedInApp, productPage, cartPage, checkoutPage, paymentPage}) => {
        const { homePage } = loggedInApp;

        let name;
        let  price;

        await test.step('Navigate to main page', async () => {
                await homePage.navigateTo();
        });

        await test.step('Click on "Combination Pliers" product card', async () => {
                await homePage.filters.clickProductCardByName('Combination Pliers');
        });

        await test.step('Getting the product name and price', async () => {
                name = await productPage.getFirstProductName();
                price = await productPage.getFirstProductPrice();
        });

        await test.step('Add product to cart', async () => {
                await productPage.clickAddToCart();
        });

        await test.step('Navigate to cart', async () => {
                await productPage.goToCart();
        });

        await test.step('Checking the information in the cart', async () => {
                await expect(productPage.getProductInCheckout(name!)).toBeVisible();
                await expect(cartPage.getProductPriceLocator()).toContainText(price!);
                await expect(cartPage.getTotalPriceLocator()).toContainText(price!);
        });

        await test.step('Go to the next page', async () => {
                await productPage.getProceedToCheckoutButton().click();
        });

        await test.step('Check if the user is authorized', async () => {
                await expect(checkoutPage.getUserAlreadyLoggedInMessage()).toContainText(`Hello ${process.env.USER_NAME!}, you are already logged in. You can proceed to checkout.`);
        });

        await test.step('Go to the next page', async () => {
                await checkoutPage.clickToTheButtonProceed();
        });

        await test.step('Filling in the billing address', async () => {
                await checkoutPage.fillBillingAddress(process.env.BILLING_ADDRESS_STATE!, process.env.BILLING_ADDRESS_POSTCODE!);
        });

        await test.step('Filling in the credit cart form', async () => {
                await paymentPage.fillCreditCardForm(process.env.CREDIT_CARD_NUMBER!, process.env.EXPIRATION_DATE!, process.env.CVV!, process.env.CARD_HOLDER_NAME!);
        });

        await test.step('Verification or successful payment', async () => {
                await expect(paymentPage.checkThatThePaymentSuccessful()).toContainText('Payment was successful');
        });
    });