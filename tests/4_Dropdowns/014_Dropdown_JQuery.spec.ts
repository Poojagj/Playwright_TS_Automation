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


test('Single Select Dropdown (Country)',async({page})=>
{
    //2.Locate Country dropdown Dropdown should be visible
    const countryDD= await page.locator('#country');
    await expect(countryDD).toBeVisible();

    //3. Get default selected value -->Default should be India (india)
    await expect(countryDD).toHaveValue('india');

    //4.Select option using label "USA" --> Value should change to usa
    await countryDD.selectOption({label:'USA'}); 
    // await countryDD.selectOption('USA'); //alternatively we can provide label value directly too
    await expect(countryDD).toHaveValue('usa');

    //5.Select option using value "uk" -->Value should change to uk
     await countryDD.selectOption({value:'uk'});
    await expect(countryDD).toHaveValue('uk');

    //6.Select option using index (3) : Value should be germany
    await countryDD.selectOption({index:3});
    await expect(countryDD).toHaveValue('germany');

    //7.Select option using value + label (France) : Value should be france
    await countryDD.selectOption([{label:'france'} , {value:'france'}]);
    await expect(countryDD).toHaveValue('france');

    //8.Count total dropdown options :Count should be 5
    const count=await countryDD.locator('option').count();
    await expect(count).toBe(5);

    //9.Get all option texts : List should contain "Germany"
    const countryDDText= await page.locator('#country option').allInnerTexts();
    console.log(countryDDText);
    await expect(countryDDText).toContain("Germany");

    //10.Print dropdown options : All options should be displayed in console
    console.log('Options in the dropdown:',countryDDText);

    //Alternative 
    const countryDDOptions= await page.locator('#country option');
    const optionTexts = await countryDDOptions.allTextContents();
    console.log('Options in the dropdown:');
    for (const option of optionTexts) {
      console.log(option)
    }

})


//B.Test Cases – Multi Select Dropdown (Colors)
//11.Locate Colors dropdown : Dropdown should be visible
test('Locate Colors dropdown : Dropdown should be visible',async({page})=>
{
    const colorsDD= await page.locator('#colors');
    await expect(colorsDD).toBeVisible();
})

//12. Get default selected value : Default should be blue
test('Get default selected value : Default should be blue',async({page})=>
{
    const colorsDD= await page.locator('#colors');
    await expect(colorsDD).toHaveValue('blue');

})
//13. Select multiple options using labels (Red, Green, Yellow) :All should be selected
test('Select multiple options using labels (Red, Green, Yellow) :All should be selected',async({page})=>
{
    const colorsDD= await page.locator('#colors');

    // Select multiple options by labels
    await colorsDD.selectOption([{ label: 'Red' }, { label: 'Green' }, { label: 'Yellow' }]);
    await colorsDD.selectOption(['Red','Green','Yellow']);
    
    await expect(colorsDD).toHaveValues(['red', 'green', 'yellow']);

    
})

//14. Select multiple options using values (red, green, yellow) :All should be selected
test('Select multiple options using values (red, green, yellow) :All should be selected',async({page})=>
{
    const colorsDD= await page.locator('#colors');

    // Select multiple options by values
    await colorsDD.selectOption([{ value: 'red' }, { value: 'green' }, { value: 'yellow' }]); 

     await expect(colorsDD).toHaveValues(['red', 'green', 'yellow']);
})

//15. Select multiple options using index (0,2,3) :Correct options should be selected
test('Select multiple options using index (0,2,3) :Correct options should be selected',async({page})=>
{
    const colorsDD= await page.locator('#colors');

    // Select multiple options by index
    await colorsDD.selectOption([{ index: 0 }, { index: 2 }, { index: 3 }]);

     await expect(colorsDD).toHaveValues(['red', 'green', 'yellow']);

})

//16. Verify multiple selections :Selected values should match input
test('Verify multiple selections :Selected values should match input',async({page})=>
{
    const colorsDD= await page.locator('#colors');
     await expect(colorsDD).toHaveValues(['red', 'green', 'yellow']);
})


//B.Test Cases – Sorted Dropdown Validation
// 17. Locate sorted dropdown options :Options should be visible
test('Locate sorted dropdown options :Options should be visible',async({page})=>
{
    const sortedDD=await page.locator('#sorted');
    await expect(sortedDD).toBeVisible();
})

// 18 .Get all dropdown option texts :Should return list of values
test('Get all dropdown option texts :Should return list of values',async({page})=>
{
    const sortedDD=await page.locator('#sorted');
    const sortedDDText=await sortedDD.locator('option').allInnerTexts();
    const expectedOptionsTexts=[ 'Apple', 'Banana', 'Mango', 'Orange' ]
    await expect(sortedDDText).toEqual(expectedOptionsTexts);
})

// 19 .Store original list :Original order should be preserved
test('Store original list: Original order should be preserved',async({page})=>
{
    const sortedDDOptions=await page.locator('#sorted option');
    const OptionsText=await sortedDDOptions.allTextContents(); // Returns array of all the text values of the options in the dropdown
    const originalList=OptionsText;

    // 20 .Create sorted copy of list :New sorted list should be created
    // const sortedList= OptionsText.sort();//This is wrong because it sorts the original array and hence both originalList and sortedList will be same (sorted) 
    const sortedList = [...OptionsText].sort(); //(spread operator) → creates a new copy of the array

    console.log(originalList);
    console.log(sortedList);

    // 21 .Compare original vs sorted list :Both should be equal (sorted)
    await expect(originalList).toEqual(sortedList);
    
})

})


