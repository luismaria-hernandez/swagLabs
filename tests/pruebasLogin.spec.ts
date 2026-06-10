import {request, test, expect} from '@playwright/test';
import { LoginPage } from '../SwagLabs/pages/loginPage';
import TestData from '../data/testData.json';

let loginPage: LoginPage;

test('TC-1 Login exitoso', async ({page}) => {
    await test.step('visitar la página de login', async () => {
        loginPage = new LoginPage(page);
        await loginPage.irPaginaLogin();
    });

    await test.step('Completar el formulario de login y hacer click en el botón de Login', async () => {
        loginPage = new LoginPage(page);
        let nombre = TestData.Usuarios.userName;
        let password = TestData.Usuarios.password
        
        await loginPage.completarElFormulario(nombre,password);
        await loginPage.hacerClickBotonLogin();
    });
});

test('TC-2 Login no exitoso', async ({page}) => {
    await test.step('Visitar la página de Login', async () => {
        loginPage = new LoginPage(page);
        await loginPage.irPaginaLogin();
    });

    await test.step('Llenar el formulario con datos incorrectos', async () => {
        loginPage = new LoginPage(page);
        let nombre = TestData.Usuario_erroneo.userName;
        let password = TestData.Usuario_erroneo.password;

        await loginPage.completarElFormulario(nombre,password);
        await loginPage.hacerClickBotonLogin();
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible;
    });
});

test('TC-3 Login con errores en el nombre de usuario', async ({page}) => {
    await test.step('Visitar la página de Login', async () => {
        loginPage = new LoginPage(page);
        await loginPage.irPaginaLogin();
    });

    await test.step('Llenar el formulario y hacer click en el botón de login', async () => {
        loginPage = new LoginPage(page);
        let nombre = TestData.errores_usuario.userName;
        let password = TestData.errores_usuario.password;

        await loginPage.completarElFormulario(nombre,password);
        await loginPage.hacerClickBotonLogin();
        await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    });
});

