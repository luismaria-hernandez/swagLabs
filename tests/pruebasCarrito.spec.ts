import {expect, test,Page} from '@playwright/test'
import { CarritoCompras } from '../SwagLabs/pages/carritoCompras';
import { Productos } from '../SwagLabs/pages/productos';
import { LoginPage } from '../SwagLabs/pages/loginPage';
import { YourInformation } from '../SwagLabs/pages/yourInformation';
import { Overview } from '../SwagLabs/pages/overview';
import { Complete } from '../SwagLabs/pages/complete';
import TestData from '../data/testData.json';

let carrito: CarritoCompras;
let producto: Productos;
let page: Page;
let loginPage: LoginPage;
let info: YourInformation;
let overview: Overview;
let complete: Complete;


test.beforeEach(async ({page}) => {

    loginPage = new LoginPage(page);
    producto = new Productos(page);
    carrito = new CarritoCompras(page);
    info = new YourInformation(page);
    overview = new Overview(page);
    complete = new Complete(page);

    let userName = TestData.Usuarios.userName;
    let password = TestData.Usuarios.password;
    
    await loginPage.irPaginaLogin();
    await loginPage.completarElFormulario(userName,password);
    await loginPage.hacerClickBotonLogin();
    await expect(producto.BTNBagPack).toBeVisible();
    }
);

test('TC-8 Validar la vuelta a la página de productos', async ({page}) => {
    await test.step('Seleccionar la bolsa de la lista de productos', async () => {
        await expect(producto.BTNCart).toBeVisible();
        await producto.agregarBagPack();
    });
    await test.step('Validar que el elemento haya sido agregado al carrito', async () => {
        await producto.BTNCart.click();
        await expect(carrito.cartPageTitle).toBeVisible();
        await expect(carrito.cartPageTitle).toHaveText('Your Cart');
        //await expect(carrito.bagPackTitle).toBeVisible();
        await expect(carrito.bagPackTitle).toHaveText('Sauce Labs Backpack');
    });

    await test.step('Validar la vuelta a la pagina de items', async () => {
        await carrito.BTNConShop.click();
        await expect(producto.pageTitle).toBeVisible();
        await expect(producto.pageTitle).toHaveText('Products');
        await expect(producto.BTNBagPack02).toBeVisible();
        await expect(producto.BTNBagPack02).toHaveText('Remove')
    });
});

test("TC-9 Probar el flujo end to end de la compra del bag pack", async ({page}) => {
    await test.step('Seleccionar la bolsa de la lista de productos', async () => {
        //await expect(producto.BTNCart).toBeVisible();
        await producto.agregarBagPack();
    });

    await test.step('Validar que el elemento haya sido agregado al carrito', async () => {
        await producto.verCarritoCompras();
        await expect(carrito.cartPageTitle).toHaveText('Your Cart');

    });
    await test.step('Avanzar a la pagina de datos de envío', async () => {
        await carrito.datosFormulario();
        await expect(info.pageTitle).toHaveText('Checkout: Your Information');
    });

    await test.step('Proceder a llenar el formulario con la información', async () => {
        await expect(info.pageTitle).toHaveText('Checkout: Your Information');
        
        let name = TestData.datos_envio.nombre;
        let lastName = TestData.datos_envio.apellido;
        let zipCode = TestData.datos_envio.zipCode;
        
        await info.llenarFormulario(name,lastName,zipCode);
        await info.BTNContinue.click();
    });
    await test.step('Validar la información de la compra', async () => {

        await expect(overview.pageTitle).toHaveText('Checkout: Overview');
        await expect(overview.paymentInfo).toHaveText('SauceCard #31337');
        await expect(overview.shippingInfo).toHaveText('Free Pony Express Delivery!');
        await expect(overview.priceTotal).toContainText('32.39');
    });

    await test.step('Avanzar hacia la pagina final', async () => {
        await overview.BTNFinish.click();
        await expect(complete.pageTitle).toHaveText('Checkout: Complete!');
        await expect(complete.completeHeader).toHaveText('Thank you for your order!')
        await expect(complete.completeMessage).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        
    });

});