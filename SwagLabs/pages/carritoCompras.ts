import {Locator, Page} from "@playwright/test";

export class CarritoCompras {

    readonly page: Page;
    readonly cartPageTitle: Locator;
    readonly bagPackTitle: Locator;
    readonly bikeTitle: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartPageTitle = page.getByText('Swag Labs');
        this.bagPackTitle = page.getByText('Sauce Labs Backpack');
        this.bikeTitle = page.getByText('Sauce Labs Bike Light');
    }
}
