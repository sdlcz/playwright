import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  const acceptedUsername = 'standard_user';
  const acceptedPassword = 'secret_sauce';
  await page.getByPlaceholder('Username').fill(acceptedUsername);
  await page.getByPlaceholder('Password').fill(acceptedPassword);
  await page.getByRole('button', { name: 'Login' }).click();

});

test('View product details', async ({ page }) => {
  await page.locator('//*[@id="item_4_title_link"]/div').click();

  const productTitle = page.locator('//*[@id="inventory_item_container"]/div/div/div[2]/div[1]');
  await expect(productTitle).toBeVisible();
});

