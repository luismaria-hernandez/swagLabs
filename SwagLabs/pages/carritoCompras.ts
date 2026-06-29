import {Locator, Page} from "@playwright/test";

export class CarritoCompras {

    readonly page: Page;
    readonly cartPageTitle: Locator;
    readonly bagPackTitle: Locator;
    readonly bikeTitle: Locator;
    readonly BTNConShop: Locator;
    readonly BTNCheckout: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartPageTitle = page.getByText('Your Cart');
        this.bagPackTitle = page.getByText('Sauce Labs Backpack');
        this.bikeTitle = page.getByText('Sauce Labs Bike Light');
        this.BTNConShop = page.locator('[data-test=continue-shopping]');
        this.BTNCheckout = page.locator('[data-test="checkout"]');
    }

    async datosFormulario () {
        await this.BTNCheckout.click();
    } 
}

