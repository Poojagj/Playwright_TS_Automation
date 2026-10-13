import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');
  await expect(page.locator('.title').first()).toBeVisible();
  await expect(page.locator('body')).toContainText('Register');
  await expect(page.locator('body')).toContainText('Log in');
});