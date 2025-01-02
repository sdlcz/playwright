import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

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
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Login button with incorrect credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('John', 'testpassword');
  const error = await loginPage.getErrorMessage();
  expect(error).toContain('Epic sadface: Username and password do not match any user in this service');
});

test('Login button with correct credentials', async ({ page }) => { 
  const loginPage = new LoginPage(page);
  await loginPage.login(acceptedUsernames[0], acceptedPassword);
  const pageTitle = page.locator('//*[@id="header_container"]/div[2]/span');
  await expect(pageTitle).toBeVisible();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});


