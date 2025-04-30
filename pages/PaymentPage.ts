import { Locator, Page } from '@playwright/test';


export class PaymentPage {
    page: Page;
    cardNumberInput: Locator;
    expirationDateInput: Locator;
    cvvInput: Locator;
    cardHolderInput: Locator;
    confirmButton: Locator;
    paymentMethodDropdown: Locator;
    paymentMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentMethodDropdown = this.page.locator('[data-test="payment-method"]');
        this.cardNumberInput = this.page.locator('[data-test="credit_card_number"]');
        this.expirationDateInput = this.page.locator('[data-test="expiration_date"]');
        this.cvvInput = this.page.locator('[data-test="cvv"]');
        this.cardHolderInput = this.page.locator('[data-test="card_holder_name"]');
        this.confirmButton = this.page.locator('[data-test="finish"]');
        this.paymentMessage = this.page.locator('[data-test="payment-success-message"]');
    }

    async fillCreditCardForm(
        cardNumber: string,
        expirationDate: string,
        cvv: string,
        holderName: string
    ): Promise<void> {
        await this.paymentMethodDropdown.selectOption('credit-card');
        await this.cardNumberInput.fill(cardNumber);
        await this.expirationDateInput.fill(expirationDate);
        await this.cvvInput.fill(cvv);
        await this.cardHolderInput.fill(holderName);
        await this.confirmButton.click();
    }

    checkThatThePaymentSuccessful() {
        return this.paymentMessage;
    }
}
