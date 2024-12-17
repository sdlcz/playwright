import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Login button with incorrect credentials', async ({ page }) => {

  await page.getByPlaceholder('Username').fill('John');

  await page.getByPlaceholder('Password').fill('testpassword');
  
  await page.getByRole('button', { name: 'Login' }).click();

});

test('Login button with correct credentials', async ({ page }) => { 

  await page.getByPlaceholder('Username').fill('standard_user');

  await page.getByPlaceholder('Password').fill('secret_sauce');
  
  await page.getByRole('button', { name: 'Login' }).click();
});
