import {test,expect} from '@playwright/test'
/*
CSS (Cascading Style Sheets) 
===========================================

A web page is built using:
  HTML (Structure)
  CSS (Styling)
  JavaScript (Behavior)

Types of CSS Locators
-------------------------------------------
1) Absolute CSS Locator  (Not commonly used)
2) Relative CSS Locator  (Most commonly used)


Absolute CSS (Never prefer):
html > body > div:nth-of-type(4) > div > div > div:nth-of-type(3) > form > input[id="small-searchterms"]


Common CSS Selector Patterns
-------------------------------------------

tag with id
   tag#id    OR    #id

tag with class
   tag.class   OR   .class

tag with attribute
   tag[attribute=value]   OR   [attribute=value]

tag with class + attribute
   tag.class[attribute=value]   OR   .class[attribute=value]

In Playwright Syntax:
page.locator("css_selector")

Some more Advanced CSS:
---------
Contains    *
Starts-with ^
Ends with  $
Child Selector (parent > child)
Descendant Selector (parent child)


-------------------------------------------
*/
const URL = "https://demowebshop.tricentis.com/";
const productName = '14.1-inch Laptop';

test.describe('CSS Selector',()=>
{

test.beforeEach(async({page})=>
{
 await page.goto(URL);
})

test.afterEach(async({page})=>
{
 await page.locator('.button-1[value="Search"]').click();
 await expect(page.locator('.product-title a')).toHaveText(productName);

 await page.close();
})


test('CSS Selector with id', async({page})=>
{ 

// tag with id    or   id
// const searchbox_with_id= page.locator("input#small-searchterms")    
const searchbox_with_id= page.locator('#small-searchterms');
await searchbox_with_id.fill(productName);
})

test('CSS Selector with class', async({page})=>
{ 
const searchbox_with_class= page.locator('.search-box-text');
await searchbox_with_class.fill(productName);
})

test('CSS Selector with attribute', async({page})=>
{ 
// single attribute :   [name="q"]  
// multiple attributes:   //[name="q"][value="Search store"]
const searchbox_with_attribute= page.locator('[value="Search store"]');
await searchbox_with_attribute.fill(productName);
})

test('CSS Selector with class+attribute', async({page})=>
{ 
const searchbox_with_classAttribute= page.locator('.search-box-text[value="Search store"]');
await searchbox_with_classAttribute.fill(productName);
})


// ================
//Advanced:
// ==================

// [attribute*='partial']  -> Selects elements where attribute contains a partial value.

test('Contians using "*" ', async ({ page }) => 
{
const searchbox_with_partialValue= page.locator('[id*="searchterms"]');
await searchbox_with_partialValue.fill(productName);

})

//[attribute^='start']  -> Selects elements where attribute starts with a value. 
test('Starts With usig ^', async ({ page }) => 
{
const searchbox_with_startsWith= page.locator('[id^="small"]');
await searchbox_with_startsWith.fill(productName);

})

//[attribute$='end']   -> Selects elements where attribute ends with a value.
test('Ends With usig $', async ({ page }) => 
{
const searchbox_with_endsWith= page.locator('[id$="terms"]')  //id value ends with 'terms'
await searchbox_with_endsWith.fill(productName);

})

//Child Selector (parent > child)
// Element is a direct child

test('Child selector using > ', async ({ page }) => 
{
const searchbox_using_child = page.locator('form>input').nth(0)  //Returns 2 elements (search box & button), need to select 1st one
await searchbox_using_child.fill(productName);
})

 //Descendant Selector (parent child)
//Element can be anywhere inside parent

test('Descendant Selector using SPACE ', async ({ page }) =>
 {
const searchbox_with_descendant = page.locator('form input').nth(0)  //Returns 2 elements (search box & button), need to select 1st  one
searchbox_with_descendant.fill(productName);
 })
})