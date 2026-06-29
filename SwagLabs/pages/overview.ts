import {Locator, Page} from "@playwright/test";

export class Overview {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly paymentInfo: Locator;
    readonly shippingInfo: Locator;
    readonly priceTotal: Locator;
    readonly BTNCancel: Locator;
    readonly BTNFinish: Locator;

    constructor (page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]')
        this.paymentInfo = page.locator('[data-test="payment-info-value"]');
        this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
        this.priceTotal = page.locator('[data-test="total-label"]');
        this.BTNCancel = page.locator('[data-test="cancel"]');
        this.BTNFinish = page.locator('[data-test="finish"]');
        
    } 

}