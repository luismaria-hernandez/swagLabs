import {expect, Locator, Page} from "@playwright/test";

export class Productos {

    readonly page: Page;
    readonly pageTitle: Locator
    readonly BTNBagPack: Locator;
    readonly BTNBagPack02: Locator;
    readonly BTNBike: Locator;
    readonly BTNTshirt: Locator;
    readonly BTNJacket: Locator;
    readonly BTNOnesie: Locator;
    readonly BTNRedTshirt: Locator;
    readonly BTNCart: Locator;
    readonly itemCounter: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.BTNBagPack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.BTNBagPack02 = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.BTNBike = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.BTNTshirt = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
        this.BTNJacket = page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
        this.BTNOnesie = page.locator('[data-test="add-to-cart-sauce-labs-onesie"]');
        this.BTNRedTshirt = page.locator('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
        this.BTNCart = page.locator('[data-test="shopping-cart-link"]');
        this.itemCounter = page.locator('[data-test="shopping-cart-badge"]');
    }

    async agregarBagPack() {
        await this.BTNBagPack.click();
    }

    async agregarBike() {
        await this.BTNBike.click();
    }

    async agregarTshirt() {
        await this.BTNTshirt.click();
    }

    async agregarJacket() {
        await this.BTNJacket.click();
    }

    async agregarOnsesie() {
        await this.BTNOnesie.click();
    }

    async verCarritoCompras() {
        await this.BTNCart.click();
    }

    async agregarTodosItems() {
        await this.BTNBagPack.click();
        await this.BTNBike.click();
        await this.BTNTshirt.click();
        await this.BTNJacket.click();
        await this.BTNOnesie.click();
    }
}