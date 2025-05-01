import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    page: Page;
    buttonProceed: Locator;
    stateInput: Locator;
    postalCodeInput: Locator;
    proceedButton: Locator;
    alreadyLoggedInMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.buttonProceed = this.page.locator('[data-test="proceed-2"]');
        this.stateInput = this.page.locator('[data-test="state"]');
        this.postalCodeInput = this.page.locator('[data-test="postal_code"]');
        this.proceedButton = this.page.locator('[data-test="proceed-3"]');
        this.alreadyLoggedInMessage = this.page.locator('app-login');
    }

    clickToTheButtonProceed() {
        return this.buttonProceed.click();
    }


    async fillBillingAddress(state: string, postalCode: string): Promise<void> {
        await this.stateInput.click();
        await this.stateInput.fill(state);

        await this.postalCodeInput.click();
        await this.postalCodeInput.fill(postalCode);

        await this.proceedButton.click();
    }

    getUserAlreadyLoggedInMessage() {
        return this.alreadyLoggedInMessage;
    }
}