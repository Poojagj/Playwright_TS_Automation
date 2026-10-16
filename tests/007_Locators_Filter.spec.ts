import {test , expect} from '@playwright/test'

/* ======================================================
    Playwright Locator Filters 

    1.Verify "Add to cart" for Product 2   
    2.Count items not having "Out of stock"
    3.Find items with "In stock"
    4.Verify elements using data-testid
    5.Count all elements with test ids
    6.Find "Say goodbye" button for John
    7.Find "Say hello" button for Mary
    8.Find "Subscribe" buttons using multiple conditions
    9.Find "details" buttons for done tasks
    10.Verify stock status counts

======================================================*/


// Hooks - Runs before each test
// Open the practice page before every test
test.beforeEach(async({page})=>
{
await page.goto("https://sdetqa.vercel.app/filters_practice.html");
})


//Filter using hasText - filter by using text  - hasText
//1.Verify "Add to cart" for Product 2

test('1.Verify "Add to cart" for Product 2', async({page})=>
{
  const product2Button = await page
  .getByRole("listitem")
  .filter({hasText:'Product 2'})
  .getByRole("button", {name:'Add to cart'});

  await expect(product2Button).toBeVisible();

  //await product2Button.click(); // if clickable

})


//Filter using hasText - filter by using text  - hasNotText
 //2.Count items not having "Out of stock"
 test('2.Count items not having "Out of stock"',async({page})=>
 {
   const notOutofStockItems = await page.locator('.demo-list').nth(1).getByRole('listitem').filter({hasNotText:'Out of stock'});
   await expect(notOutofStockItems).toHaveCount(3);

 }
)

//3.Find items with "In stock"
test('3.Find items with "In stock"',async({page})=>
{
    const inStockItems = await page.getByRole('listitem').filter({hasText:'In stock'});
    await expect(inStockItems).toHaveCount(3);
})

//  getByTestId() usage
//4.Verify elements using data-testid

test('4.Verify elements using data-testid',async({page})=>
{
 //Locate Elements using data-testid
 const apple=page.getByTestId('apple')
 const banana = page.getByTestId('banana');
 const orange = page.getByTestId('orange');
 
 //Verify visibility
 await expect(apple).toBeVisible();
 await expect(banana).toBeVisible();
 await expect(orange).toBeVisible();

 //Verify full and partial text
 await expect(apple).toHaveText('🍏 apple');
 await expect(apple).toContainText('🍏 app');

 await expect(banana).toHaveText('🍌 banana');
 await expect(banana).toContainText('banana');

 await expect(orange).toHaveText('🍊 orange');
 await expect(orange).toContainText('🍊 ');


})

//  first(), last(), nth()
// 5.Count all elements with test ids
test('5.Count all elements with test ids',async({page})=>{

const data_testidElements=await page.locator('[data-testid]');
await expect(data_testidElements).toHaveCount(5);

//Access different positions
const firstelement=data_testidElements.first();
const lastelement=data_testidElements.last();
const fourthElement=data_testidElements.nth(3);

//print 
console.log("Fruits => ", await firstelement.innerText(), await lastelement.innerText(),await fourthElement.innerText());

})

//  Chaining filters
test('6.Find "Say goodbye" button for John', async ({ page }) => {

// Find "John" → then find "Say goodbye" button inside it   
    const goodbyeButton=page.getByRole('listitem')
    .filter({hasText:'John'})
    .getByRole('button', {name:'Say goodby'})


    await expect(goodbyeButton).toBeVisible();
    await expect(goodbyeButton).toHaveText('Say goodbye');

});


test('7.Find "Say hello" button for Mary', async ({ page }) => {

    const helloButton = page
        .getByRole('listitem')
        .filter({ hasText: 'Mary' })
        .getByRole('button', { name: 'Say hello' });

    await expect(helloButton).toBeVisible();
    await expect(helloButton).toHaveText('Say hello');
});


//Matching multiple locators using .and()
//Find "Subscribe" buttons using multiple conditions
// role="button" and have title "Subscribe"

test('8.Find "Subscribe" buttons using multiple conditions', async ({ page }) => {

    //Find buttons that are both role="button" and have title "Subscribe"
    const subscribeButtons = page
        .getByRole('button')   // condition1
        .and(page.getByTitle('Subscribe', {exact:true}));     // condition 2

    console.log("Subscribe buttons count:", await subscribeButtons.count());

    await expect(subscribeButtons).toHaveCount(2);
    await expect(subscribeButtons.first()).toBeVisible();
    await expect(subscribeButtons.last()).toBeVisible();
});

//multiple conditions
test('9.Find "details" buttons for done tasks', async ({ page }) => {

    const doneTaskDetails = page
        .getByRole('listitem')
        .filter({ hasText: 'done' })
        .getByRole('button', { name: 'details' });

    //doneTaskDetails.first()  // first details button

    await expect(doneTaskDetails).toHaveCount(2);
});



test('10.Verify stock status counts', async ({ page }) => {

    const inStock = page
        .getByRole('listitem')
        .filter({ hasText: 'In stock' });

    const outOfStock = page
        .getByRole('listitem')
        .filter({ hasText: 'Out of stock' });

    await expect(inStock).toHaveCount(3);
    await expect(outOfStock).toHaveCount(2);
});


test('11.Count all buttons for John', async ({ page }) => {

    const johnButtons = page
        .getByRole('listitem')
        .filter({ hasText: 'John' })
        .getByRole('button');

    await expect(johnButtons).toHaveCount(2);
});


// ======================================================
// Matching multiple locators using .and()
// ======================================================

test('12.Find "Subscribe" buttons using multiple conditions', async ({ page }) =>{
  const subscribeBtn= page.getByRole('button').and(page.getByTitle('Subscribe',({exact:true})));
  await expect(subscribeBtn).toHaveCount(2);

  await expect(subscribeBtn.last()).toBeVisible();
  await expect(subscribeBtn.first()).toBeVisible();
})

test('13.Find "Unsubscribe" button using .and()', async ({ page }) => {
  const UnsubscribeBtn= page.getByRole('button').and(page.getByTitle('Unsubscribe',({exact:true})));
  await expect(UnsubscribeBtn).toHaveCount(1);
  await expect(UnsubscribeBtn).toHaveText('📭 Unsubscribe'); 
})

// ======================================================
// Combo Filters (Multiple Conditions)
// ======================================================

test('14.Find "details" buttons for done tasks', async ({ page }) => {

    const donetask= page.getByRole('listitem').filter({hasText:'done'}).getByRole('button',{name:'details'});
    await expect(donetask.first()).toBeVisible();
    await expect(donetask).toHaveCount(2);

})

test('15.Find "details" button for pending tasks', async ({ page }) => {

const pendingtask= page.getByRole('listitem').filter({hasText:'pending'}).getByRole('button',{name:'details'});
await expect(pendingtask.first()).toBeVisible();
await expect(pendingtask).toHaveCount(1);
})


test('16.Count tasks with "done" status', async ({ page }) => {
const donetask= page.getByRole('listitem').filter({hasText:'done'});
const count=await donetask.count();
console.log(count);
await expect(donetask).toHaveCount(2);

})

test('17.Find tasks not marked "done"', async ({ page }) => {

    const notDoneTask = page.locator('.card').nth(5).getByRole('listitem').filter({hasNotText:'done'});
    const count=await notDoneTask.count();
    console.log(count);
    await expect(notDoneTask).toHaveCount(2);

})

// ======================================================
// Combined Scenario
// ======================================================

test('18.Find specific product and verify its button', async ({ page }) => {

    const productBtn=page.getByRole('listitem').filter({hasText:'Product 2'}).getByRole('button',{name:'Add to cart'})
    await expect(productBtn).toBeVisible();
    await expect(productBtn).toHaveText('Add to cart');
})

test('19.Verify stock status counts', async ({ page }) => {

    const inStock = page
        .getByRole('listitem')
        .filter({ hasText: 'In stock' });

    const outOfStock = page
        .getByRole('listitem')
        .filter({ hasText: 'Out of stock' });

    await expect(inStock).toHaveCount(3);
    await expect(outOfStock).toHaveCount(2);

})

