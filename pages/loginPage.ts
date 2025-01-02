import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private usernameInput = 'Username';
    private passwordInput = 'Password';
    private loginButton = 'Login';
    private errorMessage = 'Epic sadface: Username and password do not match any user in this service';

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }

    async getErrorMessage() {
        return this.page.textContent(this.errorMessage);
    }
}