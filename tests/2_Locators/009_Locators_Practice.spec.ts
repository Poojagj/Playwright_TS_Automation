import {test,expect} from '@playwright/test'

/* App URL : https://demowebshop.tricentis.com/

Test 1: Open Application
Test 2: Verify Logo Visibility
Test 3: Find Products Containing "computer"
Test 4: Print Product Details - first, nth & last
Test 5: Find Products Starting with "/build"
Test 6: Verify Register Link visible
Test 7: Verify Last Social Media Link - should be 'Google+'
Test 8: Verify Second Social Media Link - should be 'Twitter'
*/

const baseURL='https://demowebshop.tricentis.com/';

test.beforeEach(async({page})=>
{
await page.goto(baseURL);
})


test('Test 1: Open Application', async({page})=>
{
await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
})

test('Test 2: Verify Logo Visibility', async({page})=>
{
    const pageLogo=await page.locator('img[alt="Tricentis Demo Web Shop"]');
    await expect(pageLogo).toBeVisible();
})

test('Test 3: Find Products Containing "computer"', async({page})=>
{
    const products = page.locator('h2 > a[href*="computer"]');
    const count: number = await products.count();
    
    expect(count).toBeGreaterThan(0);
      
})

// Test 4: Print Product Details(Text)
  test('Test 4: Print Product Details', async ({ page }) => {
    const products = page.locator('h2 > a[href*="computer"]');
    console.log("First Product:", await products.first().textContent());
    console.log("Second Product:", await products.nth(2).textContent());
    console.log("First Product:", await products.last().textContent());
  });

  //Test 5: Find Products Starting with "/build"
  test('Test 5: Find Products Starting with "/build"',async ({page})=>
  {
    const buildingProducts=await page.locator('h2 > a[href^="/build"]')
    const count:Number =await buildingProducts.count();
    await expect(count).toBeGreaterThan(0);

  })

  // Test 6: Verify Register Link
    test('Test 6: Verify Register Link', async ({ page }) => {
      const registerLink = page.locator('a[href="/register"]');
      await expect(registerLink).toBeVisible();
    });
  
    // Test 7: Verify Last Social Media Link
    test('Test 7: Verify Last Social Media Link', async ({ page }) => {
      const lastLinkText: string = await page
        .locator('.follow-us ul li:last-child')
        .innerText();
  
      expect(lastLinkText).toBe('Google+');
    });
  
    // Test 8: Verify Second Social Media Link
    test('Test 8: Verify Second Social Media Link', async ({ page }) => {
      const twitterText: string = await page
        .locator('.follow-us ul li:nth-child(2)')
        .innerText();
  
      expect(twitterText).toBe('Twitter');
    });
