import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
});

const acceptedUsernames = [
'standard_user', 
'locked_out_user',
'problem_user',
'performance_glitch_user',
'error_user',
'visual_user',
] 

const acceptedPassword = 'secret_sauce';

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Login button with incorrect credentials', async ({ page }) => {
  await page.getByPlaceholder('Username').fill('John');
  await page.getByPlaceholder('Password').fill('testpassword');
  await page.getByRole('button', { name: 'Login' }).click();

  const invalidCredentialsError = page.locator('//*[@id="login_button_container"]/div/form/div[3]/h3');
  await expect(invalidCredentialsError).toBeVisible();
  await expect(invalidCredentialsError).toContainText('Epic sadface: Username and password do not match any user in this service');
});

test('Login button with correct credentials', async ({ page }) => { 
  await page.getByPlaceholder('Username').fill(acceptedUsernames[0]);
  await page.getByPlaceholder('Password').fill(acceptedPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  const pageTitle = page.locator('//*[@id="header_container"]/div[2]/span');
  await expect(pageTitle).toBeVisible();
});


