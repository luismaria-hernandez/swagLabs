import {Page, Locator} from "@playwright/test";

export class YourInformation {

    readonly page: Page;
    readonly pageTitle: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly BTNCancel: Locator;
    readonly BTNContinue: Locator;

    constructor (page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.BTNCancel = page.locator('[data-test="cancel"]');
        this.BTNContinue = page.locator('[data-test="continue"]');
    }

    async llenarFormulario(name: string, lastName: string, zipCode: string) {
        await this.firstName.fill(name);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(zipCode);
    }
}