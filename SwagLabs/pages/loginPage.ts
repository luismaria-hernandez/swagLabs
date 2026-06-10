import {expect, Locator,Page} from '@playwright/test'

export class LoginPage {

    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly btnLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('input[name="user-name"]');
        this.password = page.locator('input[name="password"]');
        this.btnLogin = page.locator('#login-button');
    }

    async irPaginaLogin () {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async completarElFormulario(userName: string, password: string) {
        await this.userName.fill(userName);
        await this.password.fill(password);
    }

    async hacerClickBotonLogin(){
        await expect(this.btnLogin).toBeVisible();
        await this.btnLogin.click();
    }
}