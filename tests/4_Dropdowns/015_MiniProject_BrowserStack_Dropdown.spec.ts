import {test,expect} from '@playwright/test'

/*
Lab: Verify Product Sorting and Information Retrieval 
Objective :Validate product sorting functionality and extract product details such as names and prices from the 
webpage. 
Application URL 
https://www.bstackdemo.com/ 
 
Test Steps 
1. Navigate to the Webpage 
• Open the browser 
• Navigate to the given URL 
Expected Result: 
• The webpage should load successfully 
 
2. Interact with the "Order by" Dropdown 
• Locate the "Order by" dropdown 
• Verify the dropdown is: 
o Visible 
o Enabled 
• Select the option "Lowest to highest" 
Expected Result: 
• Products should be sorted from lowest price to highest price 
 
3. Retrieve and Print Product Information 
• Capture all product price elements 
• Capture all product name elements 
• Verify: 
o Number of product names = Number of product prices 
• Print each product name with its corresponding price in the console 
Expected Result:  
• Product names and prices count should match 
• All product details should be printed correctly 
 
4. Identify and Print the Lowest Priced Product 
• Get the first product name 
• Get the first product price 
• Print both in the console 
Expected Result: 
• First product should be the lowest priced item 
 
5. Identify and Print the Highest Priced Product 
• Get the last product name 
• Get the last product price 
• Print both in the console 
Expected Result: 
• Last product should be the highest priced item
*/

test ('Verify Product Sorting and Information Retrieval', async({page})=>
{
//1. Navigate to the Webpage 
await page.goto('https://www.bstackdemo.com/');
await expect(page).toHaveURL('https://www.bstackdemo.com/');
const logo=await page.getByRole('img', { name: 'logo' });
await expect(logo).toBeVisible();

//2. Interact with the "Order by" Dropdown 
const OrderByDropdown=page.locator('div.sort>select');
await expect(OrderByDropdown).toBeVisible();
await expect(OrderByDropdown).toBeEnabled();

await OrderByDropdown.selectOption({ label: 'Lowest to highest' });

// Wait for sorting to reflect
await page.waitForTimeout(3000);

// Get all product price and name elements using CSS
  const priceElements = page.locator('div.val');
  const nameElements = page.locator('p.shelf-item__title');

  const prices = await priceElements.allInnerTexts();
  const names = await nameElements.allInnerTexts();

  expect(prices.length).toBe(names.length); // Assert that prices and names count are equal

  console.log('Printing Product Names along with their Prices.......');
  for (let i = 0; i < names.length; i++) {
    console.log(`${names[i]} : ${prices[i]}`);
  }

  console.log(`Lowest Priced Product: ${names[0]} : ${prices[0]}`);
  console.log(`Highest Priced Product: ${names[names.length - 1]} : ${prices[prices.length - 1]}`);

})