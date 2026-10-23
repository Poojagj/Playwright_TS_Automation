import {test,expect} from '@playwright/test'

const pageURL='https://sdetqa.vercel.app/autoplay';

//A. Test Cases – Single Select Dropdown (Country)
test.describe('Dropdowns Validation',()=>
{
test.beforeEach(async({page})=>
{
    //1.Launch the URL -->Page should load successfully
    await page.goto(pageURL);
    const pageLogo=  page.getByText('AutoPlay',{exact : true});
    await expect(pageLogo).toBeVisible();
})

//2.Locate Country dropdown Dropdown should be visible
test('Locate Country dropdown:Dropdown should be visible',async({page})=>
{
    const countryDD= await page.locator('#country');
    await expect(countryDD).toBeVisible();
    
})

//3. Get default selected value -->Default should be India (india)
test('Get default selected value -->Default should be India (india)',async({page})=>
{
    const countryDD= await page.locator('#country');  
    await expect(countryDD).toHaveValue('india');

})

//4.Select option using label "USA" --> Value should change to usa
test('Select option using label "USA":Value should change to usa',async({page})=>
{
    const countryDD= await page.locator('#country');
    await countryDD.selectOption({label:'USA'}); 
    // await countryDD.selectOption('USA'); //alternatively we can provide label value directly too
    await expect(countryDD).toHaveValue('usa');

})

//5.Select option using value "uk" -->Value should change to uk
test('Select option using value "uk":Value should change to uk',async({page})=>  
{
    const countryDD= await page.locator('#country');
    await countryDD.selectOption({value:'uk'});
    await expect(countryDD).toHaveValue('uk');
})

//6.Select option using index (3) : Value should be germany
test('Select option using index (3) : Value should be germany',async({page})=>
{
   const countryDD= await page.locator('#country');
   await countryDD.selectOption({index:3});
   await expect(countryDD).toHaveValue('germany');
})
     
//7.Select option using value + label (France) : Value should be france
test('Select option using value + label (France) : Value should be france', async({page})=>
{
   const countryDD= await page.locator('#country');
   await countryDD.selectOption([{label:'france'} , {value:'france'}]);
   await expect(countryDD).toHaveValue('france');
})

//8.Count total dropdown options :Count should be 5
test('Count total dropdown options:Count should be 5',async({page})=>
{
    const countryDD= await page.locator('#country option');
    const count=await countryDD.count();
    await expect(count).toBe(5);
})

//9.Get all option texts : List should contain "Germany"
test('Get all option texts : List should contain "Germany"', async({page})=>
{
    const countryDDText= await page.locator('#country option').allInnerTexts();
    console.log(countryDDText);
    await expect(countryDDText).toContain("Germany");
})

//10.Print dropdown options : All options should be displayed in console
test('Print dropdown options : All options should be displayed in console',async({page})=>
{
    const countryDDText= await page.locator('#country option').allInnerTexts();
    console.log('Options in the dropdown:',countryDDText);

    //Alternative 
    const countryDD= await page.locator('#country option');
    const optionTexts = await countryDD.allTextContents();
    console.log('Options in the dropdown:');
    for (const option of optionTexts) {
      console.log(option)
    }
})



})


