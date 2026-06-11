import {expect, Locator, Page} from "@playwright/test";

export class Productos {

    readonly page: Page;
    readonly BTNBagPack: Locator;
    readonly BTNBagPack02: Locator;
    readonly BTNCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.BTNBagPack = page.locator('#add-to-cart-sauce-labs-backpack');
        this.BTNBagPack02 = page.locator('#remove-sauce-labs-backpack');
        this.BTNCart = page.locator('[data-test="shopping-cart-link"]');
    }

    async agregarBagPack() {
        await this.BTNBagPack.click();
    }

    async verCarritoCompras() {
        await this.BTNCart.click();
    }
}