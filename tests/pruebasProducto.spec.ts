import {test, expect, request} from "@playwright/test";
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
    await expect(producto.BTNBagPack).toBeVisible();
});

test('TC-4 Validar que el bagpack ha sido seleccionado', async ({page}) => {
    await producto.agregarBagPack();
    await expect(producto.BTNBagPack02).toBeVisible();
    await expect(producto.BTNBagPack02).toContainText('Remove')
});

test('TC-5 Validar que el bagpack se haya agregado al carrito de compras', async ({page}) => {
    test.step('Agregar el item al carrito de compras', async () => {
        await producto.agregarBagPack();    
    });
    test.step('Validar que el contador sea "1"', async () => {
        await expect(producto.BTNCart).toBeVisible();
        await expect(producto.itemCounter).toHaveText('1');
    });
    test.step('Validar que el producto esté en el carrito de compras', async () => {
        await producto.verCarritoCompras();
        await expect(carritoCompras.cartPageTitle).toBeVisible();
        await expect(carritoCompras.bagPackTitle).toBeVisible();
    });
});

test('TC-6 Validar el la bike se hay agregado al carrito de compras', async ({page}) => {
    test.step('Agregar el item al carrito de compras', async () => {
        await producto.agregarBike();
    });
    test.step('Validar que el contador sea "1"', async () => {
        await expect(producto.BTNCart).toBeVisible();
        await expect(producto.itemCounter).toHaveText('1');
    });
    test.step('Validar que el producto esté en el carrito de compras', async () => {
        await producto.verCarritoCompras();
        await expect(carritoCompras.cartPageTitle).toBeVisible();
        await expect(carritoCompras.bikeTitle).toBeVisible();
    });
});

test('TC-7 Validar que el contador solo permita un máximo de 2 items', async ({page}) => {
    const respuestaPromesa = page.waitForResponse(response => 
        response.url().includes('events.backtrace.io/api/unique-events/submit') && response.status() === 401,
        { timeout: 30000 }
    );

    await test.step('Agregar dos items', async () => {
        await producto.agregarJacket();
        await producto.agregarTshirt();
    });

    await test.step('Validar que el contador solo agrega 2 items', async () => {
        await expect(producto.BTNCart).toBeVisible();
        await expect(producto.itemCounter).toHaveText('2');
    });

    await test.step('Validar que la respuesta de la API es 401 luego de agregar 2 items', async () => {
        const respuestaApi = await respuestaPromesa;
        await expect(respuestaApi.status()).toBe(401);
    });
});