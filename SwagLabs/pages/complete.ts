import {Locator, Page} from "@playwright/test";

export class Complete {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly completeHeader: Locator;
    readonly completeMessage: Locator;
    readonly BTNBackHome : Locator;

    constructor (page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.completeHeader = page.locator('[data-test="complete-header"]');
        this.completeMessage = page.locator('[data-test="complete-text"]');
        this.BTNBackHome = page.locator('[data-test="back-to-products"]');
    }

}