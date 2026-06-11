import {Locator, Page} from "@playwright/test";

export class CarritoCompras {

    readonly page: Page;
    readonly cartPageTitle: Locator;
    readonly bagPackTitle: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartPageTitle = page.getByText('Swag Labs');
        this.bagPackTitle = page.getByText('Sauce Labs Backpack');
    }
}
