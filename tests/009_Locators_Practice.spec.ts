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

// test.afterAll(async({page})=>{
// await page.close();
// })


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
    
})