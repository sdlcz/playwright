import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput = 'Username';
    private passwordInput = 'Password';
    private loginButton = 'Login';
    private errorMaessage = 'Epic sadface: Username and password do not match any user in this service';

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    
}