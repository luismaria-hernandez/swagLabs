import {test, expect} from "@playwright/test";
import { Productos } from "../SwagLabs/pages/productos";
import { LoginPage } from "../SwagLabs/pages/loginPage";
import { CarritoCompras } from "../SwagLabs/pages/carritoCompras";
import TestData from "../data/testData.json";

let producto: Productos;
let loginPage: LoginPage;
let carritoCompras: CarritoCompras;

test.beforeEach(async ({page})=> {
    loginPage = new LoginPage(page);
    producto = new Productos(page);
    carritoCompras = new CarritoCompras(page);

    let userName = TestData.Usuarios.userName;
    let password = TestData.Usuarios.password;
    
    await loginPage.irPaginaLogin();
    await loginPage.completarElFormulario(userName,password);
    await loginPage.hacerClickBotonLogin();
});

test('TC-4 Validar que el bagpack ha sido seleccionado', async ({page}) => {
    await producto.agregarBagPack();
    await expect(producto.BTNBagPack02).toBeVisible();
    await expect(producto.BTNBagPack02).toContainText('Remove')
});

test('TC-5 Validar que el bagpack se haya agregado al carrito de compras', async ({page}) => {
    await producto.agregarBagPack();
    await expect(producto.BTNCart).toBeVisible();
    await producto.verCarritoCompras();
    await expect(carritoCompras.cartPageTitle).toBeVisible();
    await expect(carritoCompras.bagPackTitle).toBeVisible();
});